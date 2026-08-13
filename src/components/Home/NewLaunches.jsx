import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getAllProducts } from "../../config/api";
import { ASSET_BASE_URL } from "../../config/environment";

const NewLaunches = () => {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const payload = {
        currentPage: 1,
        recordPerPage: 2000,
        search: "",
      };
      const response = await getAllProducts(payload);

      const productsData = (response?.data?.data?.docs || []).filter(
        (item) => item?.isNewLaunch === true,
      );

      setRawProducts(productsData);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Auto Scroll Logic
  // Auto Horizontal Infinite Scroll
  useEffect(() => {
    const container = scrollRef.current;

    if (!container || rawProducts.length === 0) return;

    let animationFrame;
    let scrollSpeed = 1; // speed

    const autoScroll = () => {
      if (!isHovering) {
        container.scrollLeft += scrollSpeed;

        // Smooth infinite loop
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [rawProducts, isHovering]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl font-semibold">Loading...</div>
    );
  }

  if (!rawProducts.length) {
    return (
      <div className="py-20 text-center text-xl font-semibold">
        No New Launches Found
      </div>
    );
  }

  return (
    <section className="bg-white pb-8 md:pb-12 overflow-hidden">
      {/* Header */}
      <div className="py-4 md:py-6 px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl flex justify-center md:text-4xl font-black text-gray-900 uppercase text-left md:text-center tracking-wide italic">
          {t("home.new_launches")}
        </h2>
        <div className="flex justify-center mt-2 md:mt-3">
          <div className="w-[90%] md:w-[90%] h-[2px] bg-gray-300"></div>
        </div>
      </div>

      {/* Auto Scrolling Container */}
      <div className="relative py-6 md:py-12 px-4 md:px-12 bg-[linear-gradient(180deg,#FFED00_-40%,rgba(255,237,0,0)_15%,rgba(255,237,0,0)_85%,#FFED00_150%)]">
        <div className="max-w-7xl mx-auto">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-scroll pb-6 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "auto",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Duplicate items for seamless infinite scroll */}
            {[...rawProducts, ...rawProducts].map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[32%] snap-start"
              >
                <div className="relative overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-300 h-[420px]">
                  {/* Product Image */}
                  <img
                    src={`${ASSET_BASE_URL}/${product.images?.[0]}`}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Optional Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* NEW Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-[#FF3B30] text-white text-xs font-black px-3 py-1.5 rounded-lg">
                    NEW
                  </div>

                  {/* Product Name */}
                  <div className="absolute top-3 right-3 left-20 z-20">
                    <div className="inline-block bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg">
                      <h3 className="text-sm md:text-base font-bold uppercase italic leading-tight">
                        {product?.name || product?.productName || "Product"}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLaunches;
