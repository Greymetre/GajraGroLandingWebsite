const removeTrailingSlash = (value) => value.replace(/\/+$/, "");

export const API_BASE_URL = removeTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || "https://apis.fieldkonnect.io/api",
);

export const DISTRIBUTOR_API_BASE_URL = removeTrailingSlash(
  import.meta.env.VITE_DISTRIBUTOR_API_BASE_URL ||
    "https://gajragears.fieldkonnect.io/api",
);

export const ASSET_BASE_URL = removeTrailingSlash(
  import.meta.env.VITE_ASSET_BASE_URL ||
    "https://s3.ap-south-1.amazonaws.com/gajragro2.fieldkonnect.io",
);
