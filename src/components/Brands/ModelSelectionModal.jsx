import React from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllProducts } from '../../config/api';
import { useParams } from "react-router-dom";


// 👉 "SWARAJ 724/735FE"


const ModelSelectionModal = ({ isOpen, onClose, brandName, models = [], loading }) => {
  const { modelName } = useParams();
  const [searchTerm, setSearchTerm] = React.useState("");

// ✅ decode
const decodedModel = decodeURIComponent(modelName);

console.log(decodedModel); 
  console.log(models)
  const navigate = useNavigate();
    const { t } = useTranslation();

  if (!isOpen) return null;

  // const handleModelClick = (model) => {
  //   console.log(model)
  //   const slug = model.toLowerCase().replace(/ /g, '-');
  //   navigate(`/products/${slug}`);
  //   onClose();
  // };
const handleModelClick = async (model) => {
  try {
    const res = await getAllProducts({
      currentPage: 1,
      recordPerPage: 100,
      search: "",
      brand: models?.brandName,
      subcategoryName: model,
    });

    const products = res.data?.data?.docs || [];
    const pagination = res.data?.data?.paginate?.[0];

    // ✅ FIX HERE
    const encodedModel = encodeURIComponent(model);

    navigate(`/products/${encodedModel}`, {
      state: {
        products,
        pagination,
        type: "brand",
        selectedModel: model,
      },
    });

    onClose();

  } catch (error) {
    console.error(error);
  }
};
const filteredModels = models?.subCategories?.filter((model) =>
  model.toLowerCase().includes(searchTerm.toLowerCase())
);

// console.log(filteredModels)
  console.log(models)
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg md:max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic">
            {brandName} Models
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={t('brands.searchPlaceholder', { brand: `${brandName}`})}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFED00]"
            />
          </div>
        </div>

        {/*  Model List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#FFED00] rounded-full animate-spin"></div>
            </div>
          ) : filteredModels?.length > 0 ? (
            filteredModels.map((model, index) => (
              <button
                key={index}
                className="w-full py-4 border-[1.5px] border-gray-100 rounded-xl font-bold text-gray-800 hover:bg-[#FFED00] hover:border-[#FFED00] transition-all uppercase active:scale-95"
                onClick={() => handleModelClick(model)}
              >
                {model}
              </button>
            ))
          ) : (
            <p className="text-center py-10 text-gray-400 font-bold">
              No models available
            </p>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default ModelSelectionModal;