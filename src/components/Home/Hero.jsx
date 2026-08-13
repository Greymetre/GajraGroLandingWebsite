import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bglogo from "../../assets/nobg-logo .png";
import Partfindercard from "../../assets/Partfinder.png";
import PartFinderModal from "./PartFinderModal";
import { useTranslation } from "react-i18next";

import brand1 from "../../assets/brandlogo 1.png";
import brand2 from "../../assets/brand2.png";
import brand3 from "../../assets/brand3.png";
import brand4 from "../../assets/brand4.png";
import brand5 from "../../assets/brand5.png";
import brand6 from "../../assets/brand6.png";
import brand7 from "../../assets/brand7.png";
import brand8 from "../../assets/brand8.png";
import brand9 from "../../assets/brand9.png";
import brand10 from "../../assets/brand10.png";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <section className="relative pt-8 pb-12 px-4 md:px-6 bg-[linear-gradient(180deg,#FFED00_-60%,#FFFFFF_50%)] overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url(${bglogo})`,
            backgroundSize: "150px",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:p-12 md:gap-10">
            {/* Head */}
            <div className="w-full text-center md:text-left md:w-1/2">
              <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-normal ">
                {/* {t('home.hero_title')} */}
                Engineered for
              </h1>
              <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-normal ">
                {/* {t('home.hero_title')} */}
                uptime
              </h1>
              <p className="mt-3 md:mt-6 text-gray-700 text-xs md:text-lg max-w-sm mx-auto md:mx-0 leading-relaxed">
                {t("home.hero_subtitle")}
              </p>
            </div>

            {/* Cards Container */}
            {/* <div className="flex flex-row justify-center gap-2 w-full lg:w-1/2 md:gap-6"> */}

            {/* Part Finder Card */}
            {/* <div 
                className="relative bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between overflow-hidden group flex-shrink-0"
                style={{
                  width: window.innerWidth < 768 ? "175px" : "399.62px",
                  height: window.innerWidth < 768 ? "165px" : "368.11px"
                }}
              >
                <div className="relative z-10">
                  <h3 className="font-black text-xl md:text-5xl text-gray-900 uppercase leading-[0.85] tracking-tighter text-left">
                    <span className="block">Part</span>
                    <span className="block">Finder</span>
                  </h3>
                </div>

                <div className="absolute bottom-6 md:bottom-10 right-[-2%] w-[75%] h-[70%] pointer-events-none z-0">
                  <img 
                    src={Partfindercard} 
                    alt="Gear Part Illustration" 
                    className="w-full h-full object-contain object-right-bottom transition-transform duration-500 group-hover:scale-110 opacity-90"
                  />
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="relative z-10 w-full py-2 md:py-4 text-[8px] md:text-[14px] font-bold border-[1px] md:border-[1.5px] border-[#FFED00] bg-white rounded-full hover:bg-[#FFED00] hover:text-black transition-all flex items-center justify-center gap-1 uppercase tracking-wider active:scale-95 shadow-sm"
                >
                  {t('home.search_here')}
                </button>
              </div> */}

            {/* By Brand Card */}
            {/* <div 
                className="relative bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-between overflow-hidden group flex-shrink-0"
                style={{
                  width: window.innerWidth < 768 ? "175px" : "399.62px",
                  height: window.innerWidth < 768 ? "165px" : "368.11px"
                }}
              >
                <div className="relative z-20">
                  <h3 className="font-black text-xl md:text-5xl text-[#001D3D] uppercase leading-[0.85] tracking-tighter text-left">
                    <span className="block">By</span>
                    <span className="block">Brand</span>
                  </h3>
                </div>

                
                <div className="absolute top-2 md:top-4 right-0 w-[85%] h-[80%] z-0 pointer-events-none pr-1 md:pr-4">
                  <div className="flex flex-wrap justify-end gap-x-2 md:gap-x-8 gap-y-3 md:gap-y-10">
                    <img src={brand1} alt="Ford" className="w-6 md:w-16" />
                    <img src={brand2} alt="Swaraj" className="w-6 md:w-16" />
                    
                    <div className="w-full flex justify-end gap-2 md:gap-12 -mt-1 md:-mt-4">
                       <img src={brand4} alt="JCB" className="w-6 md:w-16 -rotate-12" />
                       <img src={brand5} alt="TATA" className="w-5 md:w-14" />
                       <img src={brand3} alt="Force" className="w-6 md:w-16" />
                    </div>

                    <div className="w-full flex justify-between items-center px-1 md:px-4 -mt-1 md:-mt-2">
                       <img src={brand6} alt="Mahindra" className="w-6 md:w-16" />
                       <img src={brand8} alt="Eicher" className="w-5 md:w-14" />
                       <img src={brand7} alt="Escorts" className="w-5 md:w-14" />
                    </div>
                    
                    <div className="w-full flex justify-around opacity-20 -mt-1 md:-mt-4">
                       <img src={brand9} alt="Ashok Leyland" className="w-6 md:w-16" />
                       <img src={brand10} alt="Ford" className="w-6 md:w-16" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/brands')}
                  className="relative z-10 w-full py-2 md:py-4 text-[8px] md:text-[14px] font-black border-[1px] md:border-[1.5px] border-[#FFED00] bg-white rounded-full hover:bg-[#FFED00] hover:text-black transition-all flex items-center justify-center uppercase tracking-wider active:scale-95 shadow-sm"
                >
                  {t('home.search_here')}
                </button>
              </div> */}

            {/* </div> */}
            <div className="flex flex-row justify-center gap-2 sm:gap-5 md:gap-6 lg:gap-8 w-full max-w-[820px] mx-auto px-3 sm:px-6">
              {/* Part Finder Card */}
              <div
                className="relative bg-white p-2.5 sm:p-5 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 
               flex flex-col justify-between overflow-hidden group flex-1 sm:max-w-[400px] aspect-square"
              >
                <div className="relative z-10">
                  <h3 className="font-black text-3xl sm:text-2xl md:text-4xl lg:text-5xl text-gray-900 uppercase leading-[0.85] tracking-tighter text-left">
                    <span className="block">Part</span>
                    <span className="block">Finder</span>
                  </h3>
                </div>

                <div className="absolute bottom-[10%] sm:bottom-[18%] md:bottom-5 right-[0] w-[50%] sm:w-[65%] md:w-[75%] h-[45%] sm:h-[55%] md:h-[70%] pointer-events-none z-0">
                  <img
                    src={Partfindercard}
                    alt="Gear Part Illustration"
                    className="w-full h-full object-contain object-right-bottom scale-150 md:scale-110 transition-transform duration-500 group-hover:scale-110 opacity-90"
                  />
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative z-10 w-full py-1.5 sm:py-2.5 md:py-3 lg:py-4 text-[8px] sm:text-xs md:text-sm lg:text-base font-bold border-2 border-[#FFED00] 
                 bg-white rounded-full hover:bg-[#FFED00] hover:text-black transition-all 
                 flex items-center justify-center gap-1 uppercase tracking-wider active:scale-95 shadow-sm"
                >
                  {t("home.search_here")}
                </button>
              </div>

              {/* By Brand Card */}
              <div
                className="relative bg-white p-2.5 sm:p-5 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 
               flex flex-col justify-between overflow-hidden group flex-1 sm:max-w-[400px] aspect-square"
              >
                <div className="relative z-20">
                  <h3 className="font-black text-3xl sm:text-2xl md:text-4xl lg:text-5xl text-gray-900 uppercase leading-[0.85] tracking-tighter text-left">
                    <span className="block">By</span>
                    <span className="block">Brand</span>
                  </h3>
                </div>

                <div className="absolute top-2 sm:top-4 md:top-6 right-0 w-[70%] sm:w-[80%] md:w-[85%] h-[55%] sm:h-[68%] md:h-[75%] z-0 pointer-events-none pr-1 sm:pr-3 md:pr-6">
                  <div className="flex flex-wrap justify-end gap-x-3 sm:gap-x-3  opacity-80 md:gap-x-6 lg:gap-x-8 gap-y-2 sm:gap-y-3 md:gap-y-6 lg:gap-y-10">
                    {/* Row 1 */}
                    <img
                      src={brand1}
                      alt="Ford"
                      className="w-10 sm:w- md:w-20 lg:w-12 xl:w-16"
                    />
                    <img
                      src={brand2}
                      alt="Swaraj"
                      className="w-10 sm:w-7 md:w-15 lg:w-12 xl:w-16"
                    />

                    {/* Row 2 */}
                    <div className="w-full flex justify-end gap-4 sm:gap-3  md:gap-10 lg:gap-9 mt-0 sm:-mt-1 md:-mt-4">
                      <img
                        src={brand4}
                        alt="JCB"
                        className="w-10 sm:w-7 md:w-15 lg:w-10 -rotate-12 xl:w-16"
                      />
                      <img
                        src={brand5}
                        alt="TATA"
                        className="w-10 sm:w-6 md:w-15 lg:w-10 xl:w-16"
                      />
                      <img
                        src={brand3}
                        alt="Force"
                        className="w-10 sm:w-7 md:w-15 lg:w-10 xl:w-16"
                      />
                    </div>

                    {/* Row 3 */}
                    <div className="w-full flex justify-end gap-4  sm:gap-3 md:gap-10 lg:gap-9 mt-0 sm:-mt-1 md:-mt-4">
                      <img
                        src={brand6}
                        alt="Mahindra"
                        className="w-10 sm:w-7 md:w-15 lg:w-10 xl:w-16"
                      />
                      <img
                        src={brand8}
                        alt="Eicher"
                        className="w-10 sm:w-6 md:w-15 lg:w-10 xl:w-16"
                      />
                      <img
                        src={brand7}
                        alt="Escorts"
                        className="w-10 sm:w-6 md:w-15 lg:w-10 xl:w-16"
                      />
                    </div>

                    {/* Row 4 */}
                    <div className="w-full flex justify-around  mt-0 sm:-mt-1 md:-mt-4">
                      <img
                        src={brand9}
                        alt="Ashok Leyland"
                        className="w-10 sm:w-7 md:w-15 lg:w-16"
                      />
                      {/* <img src={brand10} alt="Ford" className="w-3 sm:w-20  md:w-12 lg:w-16" /> */}
                      <img
                        src={brand10}
                        alt="Ford"
                        className="w-10 sm:w-20  md:w-15   lg:w-16"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/brands")}
                  className="relative z-10 w-full py-1.5 sm:py-2.5 md:py-3 lg:py-4 text-[8px] sm:text-xs md:text-sm lg:text-base font-black border-2 border-[#FFED00] 
                 bg-white rounded-full hover:bg-[#FFED00] hover:text-black transition-all 
                 flex items-center justify-center uppercase tracking-wider active:scale-95 shadow-sm"
                >
                  {t("home.search_here")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartFinderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Hero;
