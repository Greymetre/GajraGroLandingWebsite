import axiosInstance from "./axiosInstance";

// The product API filters one field per request and ANDs whatever it is given,
// so a single box can never OR across fields — and its `search` param does not
// look at partNo or brand at all, which is why part numbers returned nothing.
// The whole catalogue is ~1400 rows (78 KB gzipped), so it is pulled once and
// every field is matched in the browser instead.
const CATALOGUE_PAGE_SIZE = 5000;

// Ordered by how strongly a hit on the field should rank a product.
const SEARCHABLE_FIELDS = [
  { key: "partNo", label: "Part No.", weight: 3 },
  { key: "productNo", label: "GG No.", weight: 3 },
  { key: "model", label: "Model", weight: 2.5 },
  { key: "name", label: "Name", weight: 2 },
  { key: "specification", label: "Specification", weight: 1.5 },
  { key: "brand", label: "Brand", weight: 1.5 },
  { key: "description", label: "Description", weight: 1.2 },
  { key: "subcategoryName", label: "Sub Category", weight: 1.2 },
  { key: "categoryName", label: "Category", weight: 1 },
  { key: "size", label: "Size", weight: 1 },
  { key: "weight", label: "Weight", weight: 1 },
  { key: "pcs", label: "Pcs", weight: 1 },
  { key: "mrp", label: "MRP", weight: 1 },
  { key: "price", label: "Price", weight: 1 },
];

// "0703 DAD 09850 N", "0703-dad-09850n" and "0703dad09850" are the same part.
const squash = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

const wordify = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// Values live both on the product and on its productDetail rows; a part number
// is often only on the detail row, so both are collected.
const collectValues = (product, key) => {
  const values = [product?.[key]];

  (product?.productDetail || []).forEach((detail) => {
    values.push(detail?.[key]);
  });

  return values
    .map((value) => String(value ?? "").trim())
    .filter((value) => value && value !== "." && value !== "-");
};

export const indexProduct = (product) => {
  const fields = [];

  SEARCHABLE_FIELDS.forEach(({ key, label, weight }) => {
    const text = Array.from(new Set(collectValues(product, key))).join(" | ");
    if (!text) return;

    fields.push({
      key,
      label,
      weight,
      words: ` ${wordify(text)} `,
      squashed: squash(text),
    });
  });

  return { product, fields };
};

let cataloguePromise = null;

export const loadCatalogue = () => {
  if (!cataloguePromise) {
    cataloguePromise = axiosInstance
      .post("user/products/all", {
        currentPage: 1,
        recordPerPage: CATALOGUE_PAGE_SIZE,
      })
      .then((res) => (res?.data?.data?.docs || []).map(indexProduct))
      .catch((error) => {
        cataloguePromise = null; // let the next search retry instead of caching the failure
        throw error;
      });
  }

  return cataloguePromise;
};

const scoreField = (field, token) => {
  if (field.squashed === token) return 100;
  if (field.squashed.startsWith(token)) return 60;
  if (field.words.includes(` ${token} `)) return 45;
  if (field.words.includes(` ${token}`)) return 35;
  if (field.squashed.includes(token)) return 20;
  return 0;
};

// Every token must hit some field (AND across tokens, OR across fields), so
// "tata counter shaft" narrows down rather than returning every TATA part.
const scoreEntry = (entry, tokens) => {
  let total = 0;
  const matchedKeys = new Set();

  for (const token of tokens) {
    let best = 0;
    let bestField = null;

    for (const field of entry.fields) {
      const score = scoreField(field, token) * field.weight;
      if (score > best) {
        best = score;
        bestField = field;
      }
    }

    if (!best) return null; // this token matched nothing — product is out

    total += best;
    matchedKeys.add(bestField.key);
  }

  const matchedIn = SEARCHABLE_FIELDS.filter(({ key }) =>
    matchedKeys.has(key),
  ).map(({ label }) => label);

  return { product: entry.product, score: total, matchedIn };
};

export const tokenizeQuery = (query) =>
  wordify(query).split(" ").filter(Boolean);

export const searchCatalogue = (catalogue, query) => {
  const tokens = tokenizeQuery(query);
  if (!tokens.length) return [];

  const results = [];

  for (const entry of catalogue) {
    const result = scoreEntry(entry, tokens);
    if (result) results.push(result);
  }

  results.sort(
    (a, b) =>
      b.score - a.score ||
      String(a.product?.name || "").localeCompare(String(b.product?.name || "")),
  );

  return results;
};

// Convenience wrapper for callers that just want matches for a term.
export const searchProducts = async (query) => {
  const catalogue = await loadCatalogue();
  return searchCatalogue(catalogue, query);
};
