import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomDropdown = ({ label, options, onChange, isDistributor,value }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selected, setSelected] = useState(label);
  const [search, setSearch] = useState("");

  // const selected = value || label; // 🔥 controlled value


  const selected =
  typeof value === "object"
    ? value?.name
    : value || label;

  // 🔍 Filter logic
  const filteredOptions = options.filter((option) => {
  const text =
    typeof option === "object"
      ? option?.name || ""
      : option || "";

  return text.toLowerCase().includes(search.toLowerCase());
});

  return (
    <div className="relative w-full group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border-2 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 shadow-sm
          ${isOpen ? 'border-[#FFED00] ring-4 ring-[#FFED00]/10' : 'border-gray-100 group-hover:border-gray-200'}`}
      >
        {/* <span className={`font-bold text-sm md:text-base ${selected === label ? 'text-gray-400' : 'text-gray-900'}`}>
          {selected}
        </span> */}

        <span
  className={`font-bold text-sm md:text-base ${
    !selected ? "text-gray-400" : "text-gray-900"
  }`}
>
  {selected || label}
</span>

        <ChevronDown 
          size={20} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-gray-900' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl z-50">

            {/* 🔍 Search Input */}
            <div className="p-3">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2  rounded-lg outline-none focus:ring-2 focus:ring-[#FFED00]"
              />
            </div>

            {/* 📜 Options */}
            <ul className="max-h-[250px] overflow-y-auto">
             {filteredOptions.length > 0 ? (
  filteredOptions.map((option, i) => {
    const isObject = typeof option === "object";

    return (
      <li
        key={i}
        onClick={() => {
          setIsOpen(false);
          setSearch("");

          onChange &&
            onChange(isObject ? option.id : option);
        }}
        className="px-5 py-4 font-bold text-sm text-gray-700 hover:bg-[#FFED00] hover:text-gray-900 cursor-pointer last:border-none"
      >
        {isObject ? option.name : option}
      </li>
    );
  })
) : (
  <li className="px-5 py-4 text-gray-400 text-sm">
    No results found
  </li>
)}
            </ul>

          </div>
        </>
      )}
    </div>
  );
};

export default CustomDropdown;