import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getAllProducts } from "../../config/api";
import { Navigate, useNavigate } from "react-router-dom";

const PartFinderModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [filters, setFilters] = useState({
    model: "",
    productNo: "",
    description: "",
    partNo: "",
    specification: "",
  });
  if (!isOpen) return null;
  console.log(t);

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  

const handleSearch = async () => {
  const isAllFieldsEmpty = Object.values(filters).every(
    (value) => value.trim() === ""
  );

  if (isAllFieldsEmpty) {
    setShowValidationPopup(true);
    return;
  }

  try {
    setLoading(true);
    setNotFound(false);

    const res = await getAllProducts({
      currentPage: 1,
      recordPerPage: 10,
      ...filters,
    });

    const products = res.data?.data?.docs || [];

    if (products.length === 0) {
      setNotFound(true);
      return;
    }

    const modelName = products[0].model || "results";

    navigate(`/products/${encodeURIComponent(modelName)}`, {
      state: {
        filters,
        products,
        pagination: res.data?.data?.paginate?.[0],
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/*  Overlay  */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 text-center">
          {t("PartsfindModal.title")}
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8 max-w-sm">
          {t("PartsfindModal.subtitle")}
        </p>

        {/* Input Fields  */}
        <div className="w-full space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* <InputField icon={<Search size={18}/>} placeholder={t('PartsfindModal.modalName')} />
            <InputField icon={<Search size={18}/>} placeholder={t('PartsfindModal.GGNo.')} />
            <InputField icon={<Search size={18}/>} placeholder={t('PartsfindModal.description')} /> */}

            <InputField
              icon={<Search size={18} />}
              placeholder={t("PartsfindModal.modalName")}
              value={filters.model}
              onChange={(e) => handleChange("model", e.target.value)}
            />

            <InputField
              icon={<Search size={18} />}
              placeholder={t("PartsfindModal.GGNo.")}
              value={filters.productNo}
              onChange={(e) => handleChange("productNo", e.target.value)}
            />

            <InputField
              icon={<Search size={18} />}
              placeholder={t("PartsfindModal.description")}
              value={filters.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <InputField icon={<Search size={18}/>} placeholder={t('PartsfindModal.OE')} />
            <InputField icon={<Search size={18}/>} placeholder={t('PartsfindModal.specification')} /> */}

            <InputField
              icon={<Search size={18} />}
              placeholder={t("PartsfindModal.OE")}
              value={filters.partNo}
              onChange={(e) => handleChange("partNo", e.target.value)}
            />

            <InputField
              icon={<Search size={18} />}
              placeholder="Specification"
              //  placeholder={t('PartsfindModal.specification')}
              value={filters?.specification}
              onChange={(e) => handleChange("specification", e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSearch}
          className="w-full mt-8 bg-[#FFED00] hover:bg-black hover:text-white text-black font-black py-4 rounded-lg transition-all duration-300 shadow-lg uppercase tracking-wider"
        >
          {t("PartsfindModal.findbutton")}
        </button>
        {/* <button className="w-full mt-8 bg-[#FFED00] hover:bg-black hover:text-white text-black font-black py-4 rounded-lg transition-all duration-300 shadow-lg uppercase tracking-wider">
          {t('PartsfindModal.findbutton')}
        </button> */}
      </div>

      {/* Not Found Popup */}
      {notFound && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-bold text-red-500 mb-3">
              No Products Found
            </h3>

            <p className="text-gray-600 mb-6">
              No matching products were found for your search.
            </p>

            <button
              onClick={() => setNotFound(false)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showValidationPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl text-center">
            <h3 className="text-2xl font-bold text-orange-500 mb-3">
              Search Required
            </h3>

            <p className="text-gray-600 mb-6">
              Please fill at least one field before searching.
            </p>

            <button
              onClick={() => setShowValidationPopup(false)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// const InputField = ({ icon, placeholder }) => (
//   <div className="relative w-full">
//     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
//       {icon}
//     </div>
//     <input
//       type="text"
//       placeholder={placeholder}
//       className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm placeholder:text-gray-400"
//     />
//   </div>
// );

const InputField = ({ icon, placeholder, value, onChange }) => (
  <div className="relative w-full">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm placeholder:text-gray-400"
    />
  </div>
);

export default PartFinderModal;
