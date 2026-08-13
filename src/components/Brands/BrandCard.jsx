import React from 'react';

const BrandCard = ({ brand, onClick }) => {
  return (
    <div 
      className="group cursor-pointer flex flex-col items-center"
      onClick={() => onClick(brand)}
    >
      <div className="w-full aspect-square bg-white rounded-2xl border border-gray-100 flex items-center justify-center p-6 shadow-md hover:shadow-xl transition-all duration-300">
        <img 
          src={brand.logo} 
          alt={brand.name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://placehold.co/200x200?text=Logo+Missing'; }}
        />
      </div>
      <p className="mt-4 font-bold text-gray-700 text-sm md:text-base uppercase tracking-tight">
        {brand.name}
      </p>
    </div>
  );
};

export default BrandCard;