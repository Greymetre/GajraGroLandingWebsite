import axiosInstance from "./axiosInstance";
import { DISTRIBUTOR_API_BASE_URL } from "./environment";

export const getAllProducts = (payload) => {
  return axiosInstance.post("user/products/all", payload);
};

export const getProductById = (id) => {
  return axiosInstance.get(`user/products/${id}`);
};


// ✅ Get States
export const getStates = async () => {
  try {
    const response = await axiosInstance.post(
      "/user/address/getStates",
      {} // empty body
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

// ✅ Get Cities by State
export const getStateCities = async (state) => {
  try {
    const response = await axiosInstance.post(
      "/user/city/getStateCities",
      { state }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const getCustomers = (payload, token) => {
  return axiosInstance.post(
    "/user/customers/all",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDistributors = async (params) => {
  console.log(params, "params");

  // 🔥 params → query string
  const queryString = new URLSearchParams(params).toString();

  const res = await fetch(
    `${DISTRIBUTOR_API_BASE_URL}/getRetailersList?${queryString}`
  );

  // ✅ JSON parse
  const data = await res.json();

  // 🔥 stringify (agar tujhe string chahiye)
  

  return data; // object return karna better hai
};

// export const getStateList = async () => {
//   try {
//     const res = await fetch("http://127.0.0.1:8000/api/getStateList");
//     const data = await res.json();

//     console.log("States:", data);
//     return data;
//   } catch (error) {
//     console.error("State API Error:", error);
//   }
// };

// export const getCityList = async (state_id) => {
//   try {
//     const query = new URLSearchParams({ state_id }).toString();

//     const res = await fetch(
//       `http://127.0.0.1:8000/api/getCityList?${query}`
//     );

//     const data = await res.json();

//     console.log("Cities:", data);
//     return data;
//   } catch (error) {
//     console.error("City API Error:", error);
//   }
// };


// export const getPincodeList = async (city_id) => {
//   try {
//     const query = new URLSearchParams({ city_id }).toString();

//     const res = await fetch(
//       `http://127.0.0.1:8000/api/getPincodeList?${query}`
//     );

//     const data = await res.json();

//     console.log("Pincodes:", data);
//     return data;
//   } catch (error) {
//     console.error("Pincode API Error:", error);
//   }
// };


export const getDistributorStates = async () => {
  const res = await fetch(`${DISTRIBUTOR_API_BASE_URL}/getStateList`);
  return await res.json();
};

export const getDistributorCities = async (state_id) => {
  const res = await fetch(
    `${DISTRIBUTOR_API_BASE_URL}/getCityList?state_id=${state_id}`
  );
  return await res.json();
};

export const getDistributorPincodes = async (city_id = '') => {
  const res = await fetch(
    `${DISTRIBUTOR_API_BASE_URL}/getPincodeList?city_id=${city_id}`
  );
  return await res.json();
};

export const getYoutubeShorts = async ()=>{
  try {
    const response = await axiosInstance.get(
      "/user/setting/youtube-shorts"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching shorts:", error);
    throw error;
  }
}

// The retailer API has no radius filter, so nearby search pulls the whole list
// for one customer type and filters it in the browser. Page size is the largest
// the API honours, which keeps this to 1 request for distributors and 2 for
// retailers.
const NEARBY_PAGE_SIZE = 5000;
const NEARBY_MAX_PAGES = 5;

export const getAllCustomersByType = async (customerType, onProgress) => {
  const collected = [];
  let page = 1;
  let lastPage = 1;

  do {
    const query = new URLSearchParams({
      customer_type: customerType,
      pageSize: NEARBY_PAGE_SIZE,
      page,
    }).toString();

    const res = await fetch(`${DISTRIBUTOR_API_BASE_URL}/getRetailersList?${query}`);

    if (!res.ok) {
      throw new Error(`Retailer list request failed with ${res.status}`);
    }

    const data = await res.json();

    collected.push(...(data?.data || []));
    lastPage = Math.min(data?.pagination?.last_page || 1, NEARBY_MAX_PAGES);

    onProgress?.(page, lastPage);
    page += 1;
  } while (page <= lastPage);

  return collected;
};
