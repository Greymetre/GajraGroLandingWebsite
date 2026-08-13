import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  console.log(product)

  return (
    <div 
      onClick={() => navigate(`/product/${product?.id}`)}
      className="flex bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Left Side */}
      <div className="flex-1 p-4 md:p-5 flex flex-col justify-center">
        <h3 className="font-black text-gray-900 text-sm md:text-lg mb-2 uppercase leading-tight">
          {product.name}
        </h3>
        <div className="space-y-1">
          <p className="text-[10px] md:text-sm text-gray-500 font-medium tracking-tight">
            Part no. : {product.partNo}
          </p>
          <p className="text-[10px] md:text-sm text-gray-500 font-medium tracking-tight">
            Specification : {product.specification}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-28 md:w-48 bg-gradient-to-l from-[#FFFED5] to-transparent p-4 flex items-center justify-center">
        <img 
          src={product.img} 
          alt={product.name} 
          className="max-h-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
    </div>
  );
};

export default ProductCard;