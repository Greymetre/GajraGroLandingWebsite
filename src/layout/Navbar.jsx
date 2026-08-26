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

  const isCustomerDetailsPage = location.pathname.startsWith("/customer-details");

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
    <nav className="bg-[#FBF201] sticky top-0 z-50 shadow-sm border-b border-black/10">
      <div className="w-full px-3 sm:px-4 md:px-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 h-16 sm:h-20 md:h-24">

          {/* Logo + wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2 md:gap-3 flex-shrink-0 transition-transform active:scale-95"
            title="Go to Home"
          >
            <img
              src={logo}
              alt="Gajra Gears"
              className="h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14 rounded-full ring-2 ring-white/80 shadow-sm object-cover"
            />
            <span className="hidden lg:flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-gray-900">
                GAJRA GEARS
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-800/60">
                Engineered for uptime
              </span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 min-w-0 max-w-2xl relative" ref={searchBoxRef}>

            <span
              onClick={submitSearch}
              className="absolute inset-y-0 left-3 sm:left-4 flex items-center text-gray-400 cursor-pointer"
            >
              <Search size={18} className="sm:w-5 sm:h-5" />
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
              className="w-full h-10 sm:h-11 md:h-12 pl-9 sm:pl-11 pr-20 sm:pr-24 md:pr-28 bg-white rounded-full border border-black/10 shadow-sm focus:ring-2 focus:ring-black/20 outline-none text-sm md:text-base font-semibold"
            />

            <button
              onClick={submitSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 sm:h-9 md:h-10 px-3 sm:px-4 md:px-5
                bg-black text-white rounded-full
                hover:bg-gray-800 transition-colors duration-200
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
                      {product.partNo ? `Part No. ${product.partNo}` : product.productNo}
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

          {/* Customer Details */}
          {!isCustomerDetailsPage && (
            <Link
              to="/customer-details/Retailer"
              title={t('mobile-head.customer_details')}
              aria-label={t('mobile-head.customer_details')}
              className="flex-shrink-0 inline-flex items-center justify-center gap-2
                h-10 w-10 sm:h-11 sm:w-auto sm:px-4 md:h-12 md:px-5
                rounded-full bg-white text-gray-900 border-2 border-black
                shadow-[0_2px_0_0_rgba(0,0,0,1)]
                hover:bg-black hover:text-white
                transition-colors duration-200 active:translate-y-[2px] active:shadow-none"
            >
              <SquareUser size={20} strokeWidth={1.8} />
              <span className="hidden sm:inline text-sm font-bold whitespace-nowrap">
                {t('mobile-head.customer_details')}
              </span>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
