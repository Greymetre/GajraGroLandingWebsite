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
