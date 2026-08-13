import React,{useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Filter, Search, Mic,ChevronDown  } from 'lucide-react';
import logo from '../assets/logo.jpg';
import translatelanguage from '../assets/language.png';
import headerGears from '../assets/headerGear.png'; 
import { useTranslation } from 'react-i18next';

const MobileHeader = () => {
  const location = useLocation();
  const { modelName } = useParams();

  const { t, i18n } = useTranslation();
    const [showDropdown, setShowDropdown] = useState(false);

    const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowDropdown(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' }
  ];



  let pageTitle = t("mobile-head.page_name");
  
  if (location.pathname.includes('/brands')) {
    pageTitle = t("mobile-head.brand_name");
  } else if (location.pathname.includes('/products/')) {
    pageTitle = modelName?.replace(/-/g, ' ');
  } else if (location.pathname.includes('/product/')) {
    pageTitle = t("mobile-head.product_details");
  } else if (location.pathname.includes('/customer-details')) {
    pageTitle = t("mobile-head.customer_details");
  }

  return (
    <div className="md:hidden bg-[#FFED00] pt-4 pb-6 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        
        {/*  Page Title */}
        <div className="bg-white rounded-xl overflow-hidden flex items-center justify-between h-14 shadow-sm border border-white/50">
          <div className="flex items-center gap-3 pl-4">
            <img src={logo} alt="GG Logo" className="h-7 w-7 rounded-full" />
            <span className="font-bold text-gray-800 uppercase italic text-sm">
              {pageTitle}
            </span>
          </div>
          
          <div className="h-full w-24 opacity-80">
            <img src={headerGears} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Search and Action Row */}
        <div className="flex items-center gap-3">
          <Filter className="text-gray-800 cursor-pointer flex-shrink-0" size={24} />
          
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={t('home.search_here')}  
              className="w-full pl-10 pr-10 py-2.5 rounded-full border-none shadow-inner font-semibold text-sm bg-white"
            />
            <Mic className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>


          <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <img src={translatelanguage} alt="translate" className="h-6 w-6 md:h-8 md:w-8" />
            <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
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
        </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;