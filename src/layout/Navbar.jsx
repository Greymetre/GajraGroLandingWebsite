import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, SquareUser } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { loadCatalogue, searchCatalogue } from '../config/catalogue';

// import translatelanguage from '../assets/language.png';

const MAX_SUGGESTIONS = 6;

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isHomePage = location.pathname === "/";
  const isCustomerDetailsPage = location.pathname === "/customer-details"; // Adjust path if different

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  //   setShowDropdown(false);
  // };

  // const languages = [
  //   { code: 'en', name: 'English' },
  //   { code: 'hi', name: 'हिन्दी' }
  // ];

  // Query currently shown by the results page, or null when we are elsewhere.
  const urlQuery =
    location.pathname === "/search" ? searchParams.get("q") || "" : null;

  const [search, setSearch] = useState(urlQuery || "");
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  const [catalogue, setCatalogue] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

  // Keep the box in sync with the results page (back/forward, reload, deep link)
  // without an effect, so typing is never clobbered mid-render.
  if (urlQuery !== null && urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setSearch(urlQuery);
  }

  // The catalogue is one cached request, so pulling it as soon as the user
  // shows intent keeps suggestions instant without loading it on every page.
  const primeCatalogue = () => {
    if (catalogue) return;
    loadCatalogue()
      .then(setCatalogue)
      .catch(() => {
        // Suggestions stay off; submitting still works via the results page.
      });
  };

  const suggestions = useMemo(() => {
    if (!catalogue || search.trim().length < 2) return [];
    return searchCatalogue(catalogue, search).slice(0, MAX_SUGGESTIONS);
  }, [catalogue, search]);

  // Close the dropdown when clicking anywhere else.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchBoxRef.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitSearch = () => {
    const term = search.trim();
    if (!term) return;

    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const openProduct = (id) => {
    setShowSuggestions(false);
    navigate(`/product/${id}`);
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
        <div className="flex-grow max-w-2xl relative" ref={searchBoxRef}>

          <span
            onClick={submitSearch}
            className="absolute inset-y-0 left-3 flex items-center text-gray-400 font-semibold cursor-pointer"
          >
            <Search size={20} />
          </span>

          <input
            type="text"
            value={search}
            onFocus={() => {
              primeCatalogue();
              setShowSuggestions(true);
            }}
            onChange={(e) => {
              primeCatalogue();
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitSearch();
              }
              if (e.key === "Escape") {
                setShowSuggestions(false);
              }
            }}
            placeholder={t('home.search_here')}
            className="w-full pl-10 pr-28 py-2 bg-amber-50 rounded-full border-none focus:ring-2 focus:ring-gray-200 outline-none text-sm md:text-lg font-semibold"
          />

          <button
            onClick={submitSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2
    bg-black text-white px-4 py-2 rounded-full
    hover:bg-gray-800 transition-all duration-200
    text-sm font-semibold"
          >
            Search
          </button>

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100]">
              {suggestions.map(({ product, matchedIn }) => (
                <button
                  key={product._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => openProduct(product._id)}
                  className="w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {product.partNo ? `Part no. ${product.partNo}` : product.productNo}
                    {product.model ? ` · ${product.model}` : ""}
                  </p>
                  {matchedIn.length > 0 && (
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 mt-0.5">
                      matched in {matchedIn.join(", ")}
                    </p>
                  )}
                </button>
              ))}

              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={submitSearch}
                className="w-full text-center px-4 py-3 bg-gray-50 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                See all results for &ldquo;{search.trim()}&rdquo;
              </button>
            </div>
          )}
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
              <SquareUser size={28} strokeWidth={0.8} />
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
