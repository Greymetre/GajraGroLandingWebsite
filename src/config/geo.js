const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees) => (degrees * Math.PI) / 180;

// Great-circle distance between two {lat, lng} points, in kilometres.
export const getDistanceInKm = (from, to) => {
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a)));
};

// The API returns latitude/longitude as strings and leaves them blank for a
// large slice of the records, so every value has to be validated first.
export const parseCoordinates = (record) => {
  const lat = Number.parseFloat(record?.latitude);
  const lng = Number.parseFloat(record?.longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat === 0 && lng === 0) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
};

export const formatDistance = (km) =>
  km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

// ── Coordinate sanity ────────────────────────────────────────────────────────
// A slice of the CRM records carry coordinates captured at an onboarding desk
// rather than at the shop, so a store listed in Assam can sit on a point in
// Indore and hijack the top of a nearby search. There is no geocoder here, so
// each record is checked against the median position of its own city (and, when
// the city has too few geocoded records to trust, its own state). Both limits
// are far wider than any real city or state, so only gross mismatches fall out.
const CITY_MIN_SAMPLES = 4;
const CITY_MAX_DEVIATION_KM = 100;
const STATE_MIN_SAMPLES = 20;
const STATE_MAX_DEVIATION_KM = 600;

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};

const buildMedianIndex = (records, key, minSamples) => {
  const groups = new Map();

  records.forEach((record) => {
    const point = parseCoordinates(record);
    const groupKey = record?.[key];
    if (!point || groupKey === undefined || groupKey === null) return;

    const bucket = groups.get(groupKey);
    bucket ? bucket.push(point) : groups.set(groupKey, [point]);
  });

  const index = new Map();

  groups.forEach((points, groupKey) => {
    if (points.length < minSamples) return;

    index.set(groupKey, {
      lat: median(points.map((p) => p.lat)),
      lng: median(points.map((p) => p.lng)),
    });
  });

  return index;
};

export const buildCoordinateSanityIndex = (records) => ({
  city: buildMedianIndex(records, "city_id", CITY_MIN_SAMPLES),
  state: buildMedianIndex(records, "state_id", STATE_MIN_SAMPLES),
});

export const hasPlausibleCoordinates = (record, point, index) => {
  if (!index) return true;

  const cityMedian = index.city.get(record?.city_id);
  if (cityMedian) {
    return getDistanceInKm(point, cityMedian) <= CITY_MAX_DEVIATION_KM;
  }

  const stateMedian = index.state.get(record?.state_id);
  if (stateMedian) {
    return getDistanceInKm(point, stateMedian) <= STATE_MAX_DEVIATION_KM;
  }

  return true;
};
