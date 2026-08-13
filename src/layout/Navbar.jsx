import React, { useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search,   ChevronDown, Filter, SquareUser } from 'lucide-react'; 
import logo from '../assets/logo.jpg';
import { getAllProducts } from '../config/api';


// import translatelanguage from '../assets/language.png';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation(); // Hook to get current path
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isCustomerDetailsPage = location.pathname === "/customer-details"; // Adjust path if different
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  //   setShowDropdown(false);
  // };

  // const languages = [
  //   { code: 'en', name: 'English' },
  //   { code: 'hi', name: 'हिन्दी' }
  // ];



  const fetchProducts = async () => {
  try {
    setLoading(true);

    const payload = {
      currentPage: currentPage,
      recordPerPage: recordPerPage,
      search: search,
      description: "",
      model: "",
      partNo: "",
      productNo: "",
      specification: ""
    };

    const res = await getAllProducts(payload);

      const responseData = res?.data?.data?.docs || [];
      console.log(responseData)

      setProducts(responseData);

      // Redirect after response
      if (search.trim()) {
        navigate(`/products/${encodeURIComponent(search)}`, {
          state: {
            products: responseData,
            search: search,
            type: "search"
          }
        });
      }

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
};
  return (
    <nav className="bg-[#FBF201] px-4 py-3 h-25 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto py-3 flex items-center justify-around gap-4">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center group transition-transform active:scale-95"
          title="Go to Home"
        >
          <div className="flex-shrink-0">
            <img src={logo} alt="Gajra Logo" className="h-10 w-10 md:h-16 md:w-16 rounded-full" />
          </div>
        </Link>

        {/* Search Bar */}
       <div className="flex-grow max-w-2xl relative">
  
  <span 
    onClick={fetchProducts}
    className="absolute inset-y-0 left-3 flex items-center text-gray-400 font-semibold cursor-pointer"
  >
    <Search size={20} />
  </span>

  <input 
    type="text" 
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        fetchProducts();
      }
    }}
    placeholder={t('home.search_here')} 
    className="w-full pl-10 pr-28 py-2 bg-amber-50 rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none text-sm md:text-lg font-semibold"
  />

  <button
    onClick={fetchProducts}
    className="absolute right-1 top-1/2 -translate-y-1/2 
    bg-black text-white px-4 py-2 rounded-full 
    hover:bg-gray-800 transition-all duration-200
    text-sm font-semibold"
  >
    Search
  </button>

</div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          {/* {!isHomePage && (
            <button className="cursor-pointer p-1 hover:bg-black/5 rounded-full transition-all active:scale-90">
              <Filter size={24} className="text-gray-700" />
            </button>
          )} */}

          {/* USER ICON */}
          {!isCustomerDetailsPage && (
            <Link 
              to="/customer-details/Retailer" 
              className="cursor-pointer p-1 hover:bg-black/2 rounded-full transition-all active:scale-90 text-gray-900"
              title="Customer Details"
            >
              <SquareUser size={28}  strokeWidth={0.8}/>
            </Link>
          )}
          

          {/* Language Dropdown */}
          {/* <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="cursor-pointer flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <img src={translatelanguage} alt="translate" className="h-6 w-6 md:h-8 md:w-8" />
              <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-[100] animate-in fade-in zoom-in duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm font-bold hover:bg-gray-50 transition-colors ${
                      i18n.language === lang.code ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div> */}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;