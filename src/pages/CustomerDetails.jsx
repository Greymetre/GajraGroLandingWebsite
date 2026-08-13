import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Navigation, Home, Copy, Check } from "lucide-react";
import gearHero from "../assets/CD-img.png";
import logo from "../assets/nobg-logo .png";
import Footer from "../layout/Footer";
import CustomDropdown from "../components/utilities/CustomDropdown";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getDistributors,
  getDistributorCities,
  getDistributorPincodes,
  getDistributorStates,
} from "../config/api";

const StoreCard = ({ store, type }) => {
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const generateMapLink = () => {
    if (store.mapLink && store.mapLink.trim() !== "") {
      return store.mapLink.startsWith("http")
        ? store.mapLink
        : `https://${store.mapLink}`;
    }
    const searchQuery = encodeURIComponent(
      `${store.name} ${store.address1} ${store.city_name}`,
    );

    return `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
  };

  const handleCopy = (text, setSetter) => {
    navigator.clipboard.writeText(text);
    setSetter(true);
    setTimeout(() => setSetter(false), 2000);
  };



  return (
    <div className="bg-[#F6F6F6] p-5 md:p-6 rounded-2xl border border-gray-100 flex flex-col gap-3 md:gap-4 relative mb-4 shadow-sm group hover:border-[#FBF201] transition-all">
      {/*  NAVIGATION REDIRECT */}
      <a
        href={generateMapLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-[#FBF201] p-2.5 md:p-3 rounded-full shadow-md active:scale-95 transition-transform z-10 flex items-center justify-center"
      >
        <Navigation size={18} className="text-gray-900 fill-current" />
      </a>

      <div className="flex flex-col gap-2 md:gap-3 pr-12 md:pr-14">
        <div className="flex items-center gap-2 md:gap-3">
          <MapPin
            size={18}
            className="text-gray-400 group-hover:text-[#FBF201] transition-colors"
          />
          <h4 className="font-black text-base md:text-lg text-gray-900 uppercase italic leading-tight">
            {/* {`${type[0] === "Distributor" ? store?.name : store?.firmName}`} */}
            {store?.name}
          </h4>
        </div>

        <div className="space-y-2 text-[11px] md:text-[13px] text-gray-600 font-medium">
          {/* ADDRESS COPY */}
          {/* <div
            className="flex items-start gap-2 cursor-pointer hover:text-gray-900 transition-colors"
            onClick={() =>
              handleCopy(`${store?.address}, ${store.city}`, setCopiedAddr)
            }
          >
            <div className="w-4 flex justify-center mt-1 opacity-40">
              {copiedAddr ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <MapPin size={14} />
              )}
            </div>
            <p className="leading-snug">{`${type[0] === "Distributor" ? store?.address1 + ", " + store?.city_name + ", " + store?.state_name + ", " + store?.pincode : store?.address + ", " + store?.city + ", " + store?.state + ", " + store?.postalCode}`}</p>
          </div> */}

          <a
            href={generateMapLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 hover:text-gray-900 transition-colors"
          >
            <div className="w-4 flex justify-center mt-1 opacity-40">
              <MapPin size={14} />
            </div>

            <p className="leading-snug">
              {/* {`${
                type[0] === "Distributor"
                  ? store?.address1 +
                    ", " +
                    store?.city_name +
                    ", " +
                    store?.state_name +
                    ", " +
                    store?.pincode
                  : store?.address +
                    ", " +
                    store?.city +
                    ", " +
                    store?.state +
                    ", " +
                    store?.postalCode
              }`} */}
              {store?.address1 +
                ", " +
                store?.city_name +
                ", " +
                store?.state_name +
                ", " +
                store?.pincode}
            </p>

            {/* COPY BUTTON */}
            <span
              onClick={(e) => {
                e.preventDefault();
                handleCopy(`${store?.address}, ${store.city}`, setCopiedAddr);
              }}
              className="ml-2 cursor-pointer"
            >
              {copiedAddr ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <Copy size={14} />
              )}
            </span>
          </a>

          <div className="flex items-center gap-2">
            <div className="w-4 flex justify-center opacity-40">
              <MapPin size={14} />
            </div>
            <p className="text-gray-400">
              City :{" "}
              <span className="text-gray-900 font-bold uppercase">
                {/* {`${type[0] === "Distributor" ? store?.city_name : store?.city}`} */}
                {store?.city_name}
              </span>
            </p>
          </div>

          {/* PHONE COPY */}
          {/* <div
            onClick={() => handleCopy(store?.mobile, setCopiedPhone)}
            className="flex items-center justify-between font-black text-gray-900 pt-2 border-t border-gray-200 mt-1 cursor-pointer group/phone"
          >
            <div className="flex items-center gap-2 group-hover/phone:scale-100 transition-all">
              <Phone size={14} className="text-[#FBF201]" />
              <p>{store?.mobile}</p>
            </div>

            <div className="flex items-center gap-1">
              {copiedPhone ? (
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">
                  Copied!
                </span>
              ) : (
                <Copy
                  size={14}
                  className="text-gray-300 group-hover/phone:text-gray-900 transition-colors"
                />
              )}
            </div>
          </div> */}

          <a
            href={`tel:${store?.mobile}`}
            className="flex items-center justify-between font-black text-gray-900 pt-2 border-t border-gray-200 mt-1 group/phone"
          >
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#FBF201]" />
              <p>{store?.mobile}</p>
            </div>

            <div
              onClick={(e) => {
                e.preventDefault(); // 👉 dialer open na ho jab copy kare
                handleCopy(store?.mobile, setCopiedPhone);
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              {copiedPhone ? (
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">
                  Copied!
                </span>
              ) : (
                <Copy
                  size={14}
                  className="text-gray-300 group-hover/phone:text-gray-900 transition-colors"
                />
              )}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
const CustomerDetails = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodeInput, setPincodeInput] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const { customerType } = useParams();
  const defaultType = customerType || "Retailer";
  const customerTypeOptions = [
    { id: 1, name: "Distributor" },
    { id: 2, name: "Retailer" },
    // { id: 3, name: "Stockist" },
    { id: 4, name: "Mechanic" },
    // { id: 5, name: "STU" },
    { id: 6, name: "Fleet Owner" },
  ];
  const [customerPayload, setCustomerPayload] = useState({
    customerType: [1], // Distributor
    state: [],
    city: [],
    pincode: "",
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(20);
  const [pincodes, setPincodes] = useState([]);
  const [showPincodeDropdown, setShowPincodeDropdown] = useState(false);

  const [autoState, setAutoState] = useState("");
  const [autoCity, setAutoCity] = useState("");
  const [autoStateId, setAutoStateId] = useState(null);
  const [autoCityId, setAutoCityId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const mechanicStatus = queryParams.get("mechanicStatus");
  const latestRequestRef = useRef(0);
  // useEffect(() => {
  //   setCustomerPayload((prev) => ({
  //     ...prev,
  //     customerType: [customerType || 1],
  //   }));
  // }, [customerType]);

  const pincodeRef = useRef(null);
  const CUSTOMER_TYPES = {
    Distributor: 1,
    Retailer: 2,
    Stockist: 3,
    Mechanic: 4,
    STU: 5,
    "Fleet Owner": 6,
  };

  const CUSTOMER_TYPE_NAMES = {
    1: "Distributor",
    2: "Retailer",
    3: "Stockist",
    4: "Mechanic",
    5: "STU",
    6: "Fleet Owner",
  };

  const filteredCustomerTypeOptions =
    status === "true"
      ? [
          { id: 1, name: "Distributor" },
          { id: 2, name: "Retailer" },
        ]
      : mechanicStatus === "true"
        ? [
            { id: 4, name: "Mechanic" },
            { id: 6, name: "Fleet Owner" },
          ]
        : customerTypeOptions;
  // useEffect(() => {
  //   if (customerType) {
  //     setCustomerPayload((prev) => ({
  //       ...prev,
  //       customerType: [CUSTOMER_TYPES[customerType]],
  //     }));
  //   }
  // }, [customerType]);


  useEffect(() => {
  const selectedType = CUSTOMER_TYPES[customerType] || 2;

  setCustomerPayload((prev) => ({
    ...prev,
    customerType: [selectedType],
  }));
}, [customerType]);
//   useEffect(() => {
//   let selectedType;

//   if (mechanicStatus === "true") {
//     selectedType = 4; // Mechanic
//   } else {
//     selectedType = CUSTOMER_TYPES[customerType] || 2;
//   }

//   setCustomerPayload((prev) => ({
//     ...prev,
//     customerType: [selectedType],
//   }));
// }, [customerType, mechanicStatus]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pincodeRef.current && !pincodeRef.current.contains(event.target)) {
        setShowPincodeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchPincodes = async () => {
    try {
      const res = await getDistributorPincodes();

      const formattedPincodes =
        res?.data?.map((item) => ({
          id: item.id,
          pincode: item.pincode,
        })) || [];

      setPincodes(formattedPincodes);
      setShowPincodeDropdown(true);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPincodes = pincodes.filter((item) =>
    item.pincode.toString().startsWith(pincodeInput),
  );

  // useEffect(() => {
  //   if (customerType) {
  //     setCustomerPayload((prev) => ({
  //       ...prev,
  //       customerType: [Number(customerType)],
  //     }));
  //   }
  // }, [customerType]);

  const fetchLocationByPincode = async (pincode) => {
    if (pincode.length !== 6) return;

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );

      const data = await res.json();

      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.length > 0) {
        const postOffice = data[0].PostOffice[0];

        const state = postOffice.State;
        const city = postOffice.District;

        const stateName = postOffice.State;
        const cityName = postOffice.District;

        const selectedState = states.find(
          (item) => item.name.toLowerCase() === stateName.toLowerCase(),
        );

        const cityRes = await getDistributorCities(selectedState.id);

        const formattedCities = cityRes?.data?.map((item) => ({
          id: item.city_id,
          name: item.city_name,
        }));

        setCities(formattedCities);

        const selectedCity = formattedCities.find(
          (item) => item.name.toLowerCase() === cityName.toLowerCase(),
        );

        setAutoState(selectedState?.name || "");
        setAutoCity(selectedCity?.name || "");

        setAutoStateId(selectedState?.id || null);
        setAutoCityId(selectedCity?.id || null);

        setCustomerPayload((prev) => ({
          ...prev,
          pincode,
        }));

        // AUTO UPDATE
        // setCustomerPayload((prev) => ({
        //   ...prev,
        //   pincode,
        //   state: selectedState?.id ? [selectedState.id] : [],
        //   city: selectedCity?.id ? [selectedCity.id] : [],
        // }));

        // OPTIONAL
        setStates((prev) => {
          if (prev.includes(state)) return prev;
          return [...prev, state];
        });

        setCities((prev) => {
          if (prev.includes(city)) return prev;
          return [...prev, city];
        });
      } else {
        console.log("Invalid Pincode");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async (page) => {
    const requestId = ++latestRequestRef.current;
    setLoading(true);

    try {
      const isDistributor = customerPayload.customerType?.[0] === 1;

      const params = {
        customer_type: customerPayload?.customerType?.[0] || "",
        state_id: customerPayload?.state?.[0] || "",
        city_id: customerPayload?.city?.[0] || "",
        pincode: customerPayload?.pincode || "",
        pageSize: 50,
        page: page || 1,
      };

      const res = await getDistributors(params);
      
      if (requestId === latestRequestRef.current) {
        setCustomers(res?.data || []);
      }
      const paginate = res?.pagination;
      console.log(paginate)
      setTotalDocs(paginate?.total_records || 0);
      setCurrentPage(paginate?.current_page || 1);
      setRecordPerPage(paginate?.per_page || 20);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };


  // useEffect(() => {
  //   if (
  //     customerPayload.state.length ||
  //     customerPayload.city.length ||
  //     customerPayload.customerType.length
  //   ) {
  //     fetchCustomers(currentPage);
  //   }
  // }, [customerPayload, currentPage]);

  // useEffect(() => {
  //   const hasValidPincode =
  //     customerPayload.pincode === "" || customerPayload.pincode.length === 6;

  //   if (
  //     hasValidPincode &&
  //     (customerPayload.state.length ||
  //       customerPayload.city.length ||
  //       customerPayload.customerType.length)
  //   ) {
  //     fetchData(currentPage);
  //   }
  // }, [customerPayload, currentPage]);

  useEffect(() => {
    if (
      customerPayload.customerType.length &&
      (customerPayload.pincode.length === 6 ||
        customerPayload.state.length ||
        customerPayload.city.length ||
        customerPayload.pincode === "")
    ) {
      fetchData(currentPage);
    }
  }, [
    customerPayload.customerType,
    customerPayload.state,
    customerPayload.city,
    customerPayload.pincode,
    currentPage,
  ]);
  const totalPages = Math.ceil(totalDocs / recordPerPage);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const isDistributor =
          customerPayload.customerType?.[0] === "Distributor";

        const res = await getDistributorStates();

        const formattedStates = res?.data?.map((item) => ({
          id: item?.state_id,
          name: item?.state_name,
        }));
        // ya item.label bhi use kar sakta hai

        setStates(formattedStates);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStates();
  }, [customerPayload]);
  // const handleStateChange = async (state) => {
  //   const isDistributor = customerPayload.customerType?.[0] === "Distributor";

  //   setSelectedState(state);

  //   handleDropdownChange("state", state);

  //   try {
  //     if (isDistributor) {
  //       const res = await getDistributorCities(state);

  //       const formattedCities = res?.data?.map((item) => ({
  //         id: item?.city_id,
  //         name: item?.city_name,
  //       }));
  //       setCities(formattedCities);
  //       handleDropdownChange("city", "");
  //     } else {
  //       const res = await getStateCities(state);

  //       const formattedCities = res?.data?.map((item) => item.cityName);

  //       setCities(formattedCities);
  //       handleDropdownChange("city", "");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getVisiblePages = () => {
    const delta = 2; // current ke around kitne pages dikhane hai
    const pages = [];

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    // First page
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Last page
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handleStateChange = async (state) => {
    const isDistributor = customerPayload.customerType?.[0] === "Distributor";
    setAutoState("");
    setAutoCity("");

    setSelectedState(state);

    handleDropdownChange("state", state); // 👈 already resets city + pincode

    try {
      const res = await getDistributorCities(state);

      const formattedCities = res?.data?.map((item) => ({
        id: item?.city_id,
        name: item?.city_name,
      }));

      setCities(formattedCities);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleDropdownChange = (key, value) => {
  //   setCustomerPayload((prev) => ({
  //     ...prev,
  //     [key]: value ? [value] : [], // kyunki tera payload array expect kar raha hai
  //   }));
  // };

  // const handleDropdownChange = (key, value) => {
  //   setCustomerPayload((prev) => {
  //     let updated = {
  //       ...prev,
  //       [key]: value ? [value] : [],
  //     };

  //     // 🔥 Reset logic
  //     if (key === "customerType") {
  //       // navigate(`/customer-details/${value || "Retailer"}`);
  //       navigate({
  //         pathname: `/customer-details/${value || "Retailer"}`,
  //         search: location.search,
  //       });
  //       updated.state = [];
  //       updated.city = [];
  //       // updated.postalCode = [];
  //       updated.searchByPincode = pincodeInput;
  //       setCities([]); // dropdown options bhi reset
  //       setStates([]);
  //     }

  //     if (key === "state") {
  //       updated.city = [];
  //       // updated.postalCode = [];
  //       updated.searchByPincode = pincodeInput;
  //       setCities([]); // city dropdown empty karo
  //     }

  //     if (key === "city") {
  //       // updated.postalCode = [];
  //       updated.searchByPincode = pincodeInput;
  //     }

  //     return updated;
  //   });
  // };

  const handleDropdownChange = (key, value) => {
    setCustomerPayload((prev) => {
      let updated = {
        ...prev,
        [key]: value ? [value] : [],
      };

      if (key === "customerType") {
        setCurrentPage(1);
        navigate({
          pathname: `/customer-details/${CUSTOMER_TYPE_NAMES[value]}`,
          search: location.search,
        });

        updated.customerType = [value];

        // keep existing filters
        updated.state = prev.state;
        updated.city = prev.city;
        updated.pincode = prev.pincode;
      }

      if (key === "state") {
        updated.city = [];
        updated.pincode = ""; // reset pincode

        setCities([]);
        setPincodeInput(""); // reset input UI
      }

      if (key === "city") {
        updated.pincode = ""; // reset pincode

        setPincodeInput(""); // reset input UI
      }

      return updated;
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pincodeInput.length === 6) {
        setCustomerPayload((prev) => ({
          ...prev,
          pincode: pincodeInput,
        }));

        fetchLocationByPincode(pincodeInput);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [pincodeInput]);

  useEffect(() => {}, [customerPayload]);

  //   useEffect(() => {
  //   setCustomerPayload({
  //     customerType: [1], // Distributor
  //     state: [],
  //     city: [],
  //     pincode: "",
  //   });

  //   fetchData(1);
  // }, []);

  // useEffect(() => {
  //   const selectedType = CUSTOMER_TYPES[customerType] || 2;

  //   setCustomerPayload({
  //     customerType: [selectedType],
  //     state: [],
  //     city: [],
  //     pincode: "",
  //   });
  // }, [customerType]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/*  HEADER */}
      <header className="bg-[#FBF201] px-4 md:px-10 py-3 md:py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center">
          {/* Logo - Kept exactly where it is */}
          <div className="bg-white p-1 md:p-2 rounded-full shadow-md flex items-center justify-center h-10 w-10 md:h-20 md:w-20 flex-shrink-0">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group transition-transform active:scale-95"
              title="Go to Home"
            >
              <div className="flex-shrink-0">
                <img
                  src={logo}
                  alt="Gajra Logo"
                  className="h-10 w-10 md:h-16 md:w-16 rounded-full"
                />
              </div>
            </Link>
          </div>

          {/* Heading */}
          <div className="flex-grow flex justify-center">
            <h1 className="text-lg md:text-4xl font-extrabold text-gray-900 uppercase tracking-tight md:tracking-wide italic">
              Customer Details
            </h1>
          </div>

          <div className="w-10 md:w-20"></div>
        </div>
      </header>

      {/*  HERO SECTION */}
      <div className="relative h-48 md:h-[400px] w-full bg-black">
        <img
          src={gearHero}
          alt="Mechanical Gears"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-end justify-center px-4 md:px-24 text-white text-right leading-loose">
          <h2 className="text-xl md:text-6xl font-black italic uppercase leading-[0.8] tracking-tighter leading-normal">
            Say Goodbye to <br />{" "}
            <span className="text-[#FBF201]">Wrong Parts</span>
          </h2>
          <p className="text-[10px] md:text-xl font-bold mt-2 md:mt-6 opacity-95 uppercase tracking-widest">
            Easy search, perfect match, smooth ride.
          </p>
        </div>
      </div>

      {/*  MAIN CONTENT */}
      <main className="flex-grow bg-white pb-10 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="py-10 md:py-16">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-4xl font-black uppercase text-gray-900 tracking-tighter italic">
                Please Enter Details
              </h3>
              <div className="w-16 md:w-24 h-1.5 bg-[#FBF201] mx-auto mt-3 rounded-full"></div>
            </div>

            {/* DROPDOWNS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              <div ref={pincodeRef} className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter Pin Code"
                  maxLength={6}
                  value={pincodeInput}
                  onFocus={fetchPincodes}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setPincodeInput(value);

                    if (value === "") {
                      setCustomerPayload((prev) => ({
                        ...prev,
                        pincode: "",
                        state: autoStateId ? [autoStateId] : [],
                        city: autoCityId ? [autoCityId] : [],
                      }));
                    } else {
                      setCustomerPayload((prev) => ({
                        ...prev,
                        pincode: value,
                        state: [],
                        city: [],
                      }));
                    }
                  }}
                  className="w-full bg-white border-3 border-gray-100 rounded-2xl p-4 font-bold text-sm md:text-base outline-none focus:border-[#FFED00]"
                />

                {showPincodeDropdown && filteredPincodes.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredPincodes.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setPincodeInput(item.pincode.toString());

                          setCustomerPayload((prev) => ({
                            ...prev,
                            pincode: item.pincode.toString(),
                          }));

                          setShowPincodeDropdown(false);

                          fetchLocationByPincode(item.pincode.toString());
                        }}
                        className="px-4 py-3 cursor-pointer hover:bg-yellow-100"
                      >
                        {item.pincode}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* <CustomDropdown
                label="State"
                options={states}
                isDistributor={customerPayload.customerType?.[0]}
                value={
                  customerPayload.customerType?.[0] === "Distributor"
                    ? states.find((s) => s.id === customerPayload.state?.[0])
                        ?.name
                    : customerPayload.state?.[0]
                }
                onChange={handleStateChange}
              /> */}

              <CustomDropdown
                label="State"
                options={states}
                value={
                  states.find((item) => item.id === customerPayload?.state?.[0])
                    ?.name || autoState
                }
                onChange={handleStateChange}
              />

              {/* <CustomDropdown
                label="City"
                options={cities}
                isDistributor={customerPayload.customerType?.[0]}
                value={
                  customerPayload.customerType?.[0] === "Distributor"
                    ? cities.find((c) => c.id === customerPayload.city?.[0])
                        ?.name
                    : customerPayload.city?.[0]
                }
                onChange={(city) => handleDropdownChange("city", city)}
              /> */}

              <CustomDropdown
                label="City"
                options={cities}
                value={
                  cities.find((item) => item.id === customerPayload?.city?.[0])
                    ?.name || autoCity
                }
                onChange={(city) => {
                  setAutoCity("");
                  handleDropdownChange("city", city);
                }}
              />

              {/* <CustomDropdown
                label="Customer Type"
                options={
                  status === "true"
                    ? ["Retailer", "Distributor"]
                    : mechanicStatus === "true"
                      ? ["Mechanic"]
                      : ["Retailer", "Mechanic", "Distributor"]
                }
                value={customerPayload.customerType?.[0]}
                onChange={(val) => handleDropdownChange("customerType", val)}
              /> */}
              {/* <CustomDropdown
                label="Customer Type"
                options={customerTypeOptions}
                isDistributor={true}
                value={
                  customerTypeOptions.find(
                    (item) => item.id === customerPayload.customerType?.[0]
                  )?.name
                }
                onChange={(value) =>
                  handleDropdownChange("customerType", value)
                }
              /> */}
              <CustomDropdown
  label="Customer Type"
  options={filteredCustomerTypeOptions}
  isDistributor={true}
  value={
    filteredCustomerTypeOptions.find(
      (item) => item.id === customerPayload.customerType?.[0]
    )?.name
  }
  onChange={(value) =>
    handleDropdownChange("customerType", value)
  }
/>
            </div>

            <div className="flex justify-center mt-10 md:mt-14">
              <img
                src={logo}
                alt=""
                className="h-7 w-7 md:h-16 md:w-16 rounded-full object-contain"
              />
            </div>
          </div>

          {/* STORE GRID*/}
          {/* <div className="flex flex-col md:grid md:grid-cols-3 md:gap-8">
            {customers?.map((store, i) => (
              <StoreCard
                key={i}
                store={store}
                type={customerPayload?.customerType}
              />
            ))}
          </div> */}

          <div className="flex flex-col md:grid md:grid-cols-3 md:gap-8">
            {loading ? (
              // 🔄 LOADING UI
              <div className="col-span-3 flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#FBF201]"></div>
              </div>
            ) : customers?.length > 0 ? (
              // ✅ DATA UI
              customers.map((store, i) => (
                <StoreCard
                  key={i}
                  store={store}
                  type={customerPayload?.customerType}
                />
              ))
            ) : (
              // ❌ EMPTY STATE
              <div className="col-span-3 text-center py-20 text-gray-400 font-bold">
                No Stores Found
              </div>
            )}
          </div>

          {/* <div className="flex justify-center items-center gap-3 mt-12 md:mt-24">
             <div className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-[#FBF201] text-gray-900 text-sm md:text-lg font-black rounded-xl shadow-lg transform hover:scale-110 transition-transform cursor-pointer italic">1</div>
             {[2, 3, 4, 5].map(n => (
               <div key={n} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-gray-400 text-sm md:text-lg font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer">{n}</div>
             ))}
             <div className="text-gray-300 font-black text-xl md:text-2xl ml-2 cursor-pointer hover:text-[#FBF201] transition-colors">{">"}</div>
          </div> */}
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
            >
              {"<"}
            </button>

            {/* PAGE NUMBERS */}
            {getVisiblePages().map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold 
                  ${
                    currentPage === page
                      ? "bg-[#FBF201] text-gray-900"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-2 bg-gray-100 rounded-lg disabled:opacity-40"
            >
              {">"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDetails;
