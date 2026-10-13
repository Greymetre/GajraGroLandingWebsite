const removeTrailingSlash = (value) => value.replace(/\/+$/, "");

// Gajra Gear SFA backend: products, YouTube shorts, dealer locator, state/city/pincode
export const DISTRIBUTOR_API_BASE_URL = removeTrailingSlash(
  import.meta.env.VITE_DISTRIBUTOR_API_BASE_URL ||
    "https://gajragears.fieldkonnect.io/api",
);

export const ASSET_BASE_URL = removeTrailingSlash(
  import.meta.env.VITE_ASSET_BASE_URL ||
    "https://gajragro.fieldkonnect.io",
);

// The SFA API returns full image URLs; relative paths still get the asset base.
export const assetUrl = (path) =>
  /^https?:\/\//i.test(path) ? path : `${ASSET_BASE_URL}/${path}`;
