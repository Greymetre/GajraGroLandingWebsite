// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ProductCard from '../components/Products/ProductCard';
// import gearImg from '../assets/Gear-img.png';
// import bglogo from '../assets/nobg-logo .png';
// import { useTranslation } from 'react-i18next';

// const ProductsPage = () => {
//   const { modelName } = useParams();
//   const { t } = useTranslation();

//   const products = Array(8).fill({
//     name: "REVERSE FORWARD GEAR",
//     partNo: "267-444-443",
//     specification: "24 Teeth",
//     img: gearImg
//   });

//   return (
//     <div className="min-h-screen bg-[linear-gradient(180deg,#FFED00_-60%,#FFFFFF_20%)] relative overflow-hidden">
//       {/* Background Pattern */}
//       <div
//         className="absolute inset-0 opacity-[0.025] pointer-events-none"
//         style={{ backgroundImage: `url(${bglogo})`, backgroundSize: '250px', backgroundRepeat:'repeat' }}
//       />

//       <main className="max-w-7xl mx-auto py-10 px-6 relative z-10">
//         <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 relative uppercase tracking-wide">
//           {t('products.title')}
//           <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-38 h-1 bg-[#FBF201] rounded-full"></span>
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {products.map((item, idx) => (
//             <ProductCard key={idx} product={item} />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProductsPage;

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import gearImg from "../assets/Gear-img.png";
import bglogo from "../assets/nobg-logo .png";
import { useTranslation } from "react-i18next";
import { getAllProducts } from "../config/api";
import { ASSET_BASE_URL } from "../config/environment";

const ProductsPage = () => {
  let { modelName } = useParams();
  const { state } = useLocation();
  const { t } = useTranslation();

  const [products, setProducts] = useState(state?.products || []);
  const [loading, setLoading] = useState(false);
  const filters = state?.filters || {};
  const hasFilters = Object.values(filters).some((val) => val);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const BASE_URL = ASSET_BASE_URL;
  console.log(state);
  if (state?.type === "search" || state?.type) {
    modelName = "";
  }

  // ✅ Fallback: agar state nahi aaya (direct URL hit)
useEffect(() => {
  fetchProducts(currentPage);
}, [currentPage, modelName, state?.search, state?.type]);
  // useEffect(() => {
  //   if (state?.products) {
  //     setProducts(state.products);
  //   }
  // }, [state]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);
  console.log(state?.type);
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);

      console.log(modelName);

      const res = await getAllProducts({
        currentPage: page,
        recordPerPage: 10,
        subcategoryName: state?.type === "brand" ? state?.selectedModel : "",
        search: state?.type === "search" ? state?.search : "",

        model:
          state?.type === "search" && state?.type === "brand" ? "" : modelName,
        ...filters, // 🔥 important (filters bhi pass karo)
      });

      const data = res.data?.data;
      console.log(data);

      setProducts(data?.docs || []);
      console.log(data?.docs);
      setTotalPages(Math.ceil((data?.paginate[0]?.totalDocs || 0) / 10));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(totalPages);

  const getVisiblePages = () => {
    const pages = [];
    const delta = 1; // kitne pages before/after current

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Always first page
    pages.push(1);

    // Left dots
    if (rangeStart > 2) {
      pages.push("...");
    }

    // Middle pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Right dots
    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    // Always last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };
  console.log(state);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFED00_-60%,#FFFFFF_20%)] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url(${bglogo})`,
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
        }}
      />

      <main className="max-w-7xl mx-auto py-10 px-6 relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-10  tracking-wide">
          {/* {t('products.title')} - {modelName} */}
          {/* {t('products.title')} */}
          {/* ✅ Search Query / Filters */}
          <div className="flex items-center gap-4 mb-8">
            {/* Left Line */}
            <div className="flex-1 h-[2px] bg-gray-300"></div>

            {/* Text */}
            <div className="text-xl md:text-2xl font-bold uppercase text-gray-800 whitespace-nowrap">
              {hasFilters ? (
                <>
                  Search :
                  {Object.entries(filters)
                    .filter(([_, v]) => v)
                    .map(([_, v]) => ` ${v}`)
                    .join(", ")}
                </>
              ) : state?.type === "search" ? (
                <>Search Query : {state?.search}</>
              ) : (
                modelName && <>Search Query : {modelName}</>
              )}
            </div>

            {/* Right Line */}
            <div className="flex-1 h-[2px] bg-gray-300"></div>
          </div>
        </h2>

        {/* ✅ Loading */}
        {loading && <p className="text-center">Loading...</p>}

        {/* ❌ No Data */}
        {!loading && products.length === 0 && (
          <p className="text-center">No products found</p>
        )}

        {/* ✅ Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((item) => (

         
            <ProductCard
              key={item._id}
              product={{
                id: item._id,
                name: item.name,
                partNo: item?.productDetail?.[0]?.partNo || "-",
                specification: item?.productDetail?.[0]?.specification || "-",
                img:
                  item?.images?.[0] !== undefined
                    ? BASE_URL + "/" + item.images[0]
                    : gearImg, // fallback image
              }}
            />
          ))}
        </div>

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
      </main>
    </div>
  );
};

export default ProductsPage;
