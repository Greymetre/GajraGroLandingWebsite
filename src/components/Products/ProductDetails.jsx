import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";

import gearImg from "../../assets/Gear-img.png";
import bglogo from "../../assets/nobg-logo .png";
import testVideo from "../../assets/testvideo.mp4";
import Timg from "../../assets/thumbnailImg.jpg";
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import { getProductById } from "../../config/api";
import { ASSET_BASE_URL } from "../../config/environment";
import ReelSec from "../Home/ReelSec";

const ProductDetails = () => {
  const { partId } = useParams();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("Specification");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const trackRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
const start = useRef({ x: 0, y: 0 });
const animationFrame = useRef(null);

  const [playingId, setPlayingId] = useState(null);

  const BASE_URL = ASSET_BASE_URL;

  useEffect(() => {
    fetchProduct();
  }, [partId]);

  const handleMouseDown = (e) => {
  if (zoomScale <= 1) return;

  setIsDragging(true);

  start.current = {
    x: e.clientX - position.x,
    y: e.clientY - position.y,
  };
};

const handleMouseMove = (e) => {
  if (!isDragging) return;

  if (animationFrame.current) {
    cancelAnimationFrame(animationFrame.current);
  }

  animationFrame.current = requestAnimationFrame(() => {
    setPosition({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  });
};

const handleMouseUp = () => {
  setIsDragging(false);
};

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await getProductById(partId);
      const data = res.data?.data;

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reviewsData = [
    {
      id: 1,
      thumbnail: Timg,
      video: video1,
      text: "Autoshack Front Brake Set Spare Parts Chevrolet...",
    },
    {
      id: 2,
      thumbnail: Timg,
      video: video3,
      text: "Gajra Gears - Precision and Durability in every tooth.",
    },
    {
      id: 3,
      thumbnail: Timg,
      video: video2,
      text: "High-performance reverse forward gear review.",
    },
    // { id: 4, thumbnail:gearImg, video: testVideo, text: "Excellent build quality and seamless fit." },
    // { id: 5, thumbnail:gearImg, video: testVideo, text: "Durability testing under heavy load conditions." },
    // { id: 6, thumbnail:gearImg, video: testVideo, text: "Industrial components performance overview." },
  ];

  const handlePlayVideo = (id, videoElem) => {
    if (!videoElem) return;

    if (playingId === id) {
      videoElem.pause();
      setPlayingId(null);
    } else {
      const allVideos = document.querySelectorAll(".slider-track video");
      allVideos.forEach((v) => v.pause());

      videoElem.muted = true;

      videoElem.play().catch((err) => {
        console.error("Playback error:", err);
      });
      setPlayingId(id);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 264 : 465.38;
      const gap = isMobile ? 12 : 24;
      const totalStep = cardWidth + gap;
      const centerOffset = isMobile ? (window.innerWidth - cardWidth) / 2 : 0;
      const xTarget = -activeIndex * totalStep + centerOffset;

      gsap.to(".slider-track", {
        x: xTarget,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }, trackRef);
    return () => ctx.revert();
  }, [activeIndex]);

  const handleNext = () => {
    const maxIndex =
      window.innerWidth < 768 ? reviewsData.length - 1 : reviewsData.length - 3;
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    const maxIndex =
      window.innerWidth < 768 ? reviewsData.length - 1 : reviewsData.length - 3;
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // const closePreview = () => {
  //   setIsPreviewOpen(false);
  //   setZoomScale(1);
  // };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setZoomScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomOut = () => {
  const nextZoom = Math.max(zoomScale - 0.5, 1);

  setZoomScale(nextZoom);

  if (nextZoom === 1) {
    setPosition({ x: 0, y: 0 });
  }
};
  if (loading) {
    return <div className="h-screen text-center p-10">Loading...</div>;
  }

  if (!product) {
    return <div className="h-screen text-center p-10">No Product Found</div>;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFED00_-60%,#FFFFFF_20%)] relative overflow-hidden font-sans text-left">
      <main className="max-w-[1550px] mx-auto pt-6 md:pt-10 px-4 md:px-10 relative z-10">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url(${bglogo})`,
            backgroundSize: "250px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Info Card Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-[2rem] md:rounded-[3.5rem] border border-gray-100 shadow-2xl overflow-hidden flex flex-col md:flex-row mb-12 relative z-10">
          <div
            className="w-full md:w-1/3 bg-gradient-to-br from-[#FFED00] to-[#FFFED5] p-4 flex items-center justify-center cursor-pointer group"
            onClick={() => setIsPreviewOpen(true)}
          >
            <img
              src={
                product?.images?.[0] !== undefined
                  ? BASE_URL + "/" + product?.images[0]
                  : gearImg
              }
              alt="Gear"
              className="h- md:h-auto w-auto object-contain drop-shadow-2xl transition-transform group-hover:scale-110"
            />
          </div>
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase leading-none tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-sm md:text-xl font-bold text-gray-400 uppercase tracking-widest">
              {product.model}
            </p>
            <div className="grid grid-cols-2 gap-y-3 mt-8 text-xs md:text-base border-t pt-6">
              <span className="text-gray-400 font-semibold uppercase">
                Brand
              </span>
              <span className="font-black text-gray-900">{product.brand}</span>

              <span className="text-gray-400 font-semibold uppercase">
                GG number
              </span>
              <span className="font-black text-[#001D3D] uppercase">
                {product.productNo}
              </span>

              <span className="text-gray-400 font-semibold uppercase">
                OE Part Number
              </span>
              <span className="font-black uppercase text-gray-900">
                {product.productDetail?.[0]?.partNo || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-5xl mx-auto mb-20 relative z-10">
          <div className="flex gap-8 border-b border-gray-100 mb-6">
            {[
              { id: "Specification", label: t("products.specification-head") },
              { id: "Description", label: t("products.description-head") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 font-bold uppercase text-sm md:text-xl tracking-tight transition-all ${activeTab === tab.id ? "text-black border-b-4 border-[#FFED00]" : "text-gray-400"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed font-medium">
            {activeTab === "Specification"
              ? product.productDetail?.[0]?.specification || "No specification"
              : product.description}
          </p>{" "}
        </div>

        <ReelSec></ReelSec>

        {/* Reviews Section */}
        {/* <div className="relative mt-20 z-10 pb-32">
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-left">
              {t("products.review-head")}
            </h2>
          </div>

          <div className="relative mx-auto md:w-[1513px] w-full">
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-[-60px] top-1/2 -translate-y-1/2 z-50 bg-white shadow-2xl p-3 md:p-5 rounded-full hover:bg-[#FFED00] transition-all border border-gray-100"
            >
              <ChevronLeft size={window.innerWidth < 768 ? 20 : 32} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-[-60px] top-1/2 -translate-y-1/2 z-50 bg-white shadow-2xl p-3 md:p-5 rounded-full hover:bg-[#FFED00] transition-all border border-gray-100"
            >
              <ChevronRight size={window.innerWidth < 768 ? 20 : 32} />
            </button>

            <div className="overflow-hidden md:mx-40" ref={trackRef}>
              <div className="slider-track flex items-center">
                {reviewsData.map((review) => (
                  <div
                    key={review.id}
                    className="review-card flex-shrink-0"
                    style={{
                      width: window.innerWidth < 768 ? "264px" : "380px",
                      height: window.innerWidth < 768 ? "345px" : "530px",
                      marginRight: window.innerWidth < 768 ? "12px" : "24px",
                    }}
                  >
                    <div className="w-full h-full rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-black relative group border border-gray-100">
                      <video
                        key={review.id}
                        src={review.video}
                        poster={review.thumbnail}
                        className={`w-full h-full bg-black transition-all duration-300 ${
                          playingId === review.id
                            ? "object-fill opacity-100"
                            : "object-cover opacity-70 group-hover:opacity-100"
                        }`}
                        loop
                        muted={true}
                        playsInline
                        onClick={(e) =>
                          handlePlayVideo(review.id, e.currentTarget)
                        }
                      />

                      
                      <div
                        className={`absolute inset-0 pointer-events-none bg-gradient-to-t from-black/95 via-transparent flex flex-col justify-end p-8 md:p-12 text-center transition-opacity duration-300 ${
                          playingId === review.id ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const video = e.currentTarget
                                .closest(".review-card")
                                .querySelector("video");
                              handlePlayVideo(review.id, video);
                            }}
                            className="bg-white/20 p-6 rounded-full border border-white/30 backdrop-blur-xl group-hover:scale-110 transition-transform pointer-events-auto cursor-pointer"
                          >
                            {playingId === review.id ? (
                              <Pause
                                size={40}
                                className="text-white fill-white"
                              />
                            ) : (
                              <Play
                                size={40}
                                className="text-white fill-white ml-1"
                              />
                            )}
                          </button>
                        </div>
                        <p className="text-white text-xs md:text-base font-black uppercase italic tracking-tighter opacity-90 leading-tight">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </main>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden relative w-full max-w-2xl flex flex-col items-center">
            <button
              onClick={closePreview}
              className="absolute top-6 right-6 z-[110] bg-gray-100 hover:bg-[#FFED00] text-gray-900 transition-all p-3 rounded-full"
            >
              <X size={24} />
            </button>
            <div className="p-12 w-full flex items-center justify-center bg-white h-[400px] md:h-[550px] overflow-hidden">
<img
  src={
    product?.images?.[0]
      ? BASE_URL + "/" + product.images[0]
      : gearImg
  }
  alt="Product"
  draggable={false}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
  className={`select-none object-contain ${
    zoomScale > 1
      ? isDragging
        ? "cursor-grabbing"
        : "cursor-grab"
      : "cursor-default"
  }`}
  style={{
    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoomScale})`,
    transformOrigin: "center center",
    transition: isDragging ? "none" : "transform .25s ease",
    willChange: "transform",
    maxWidth: "100%",
    maxHeight: "100%",
  }}
/>
            </div>
            <div className="w-full p-6 flex justify-center gap-6 border-t border-gray-100">
              <button
                onClick={() => setZoomScale(Math.max(zoomScale - 0.5, 1))}
                className="flex items-center gap-2 px-6 py-3 text-sm font-black uppercase tracking-tighter text-gray-500 border border-gray-200 rounded-2xl transition-all"
              >
                <ZoomOut size={18} /> Zoom Out
              </button>
              <button
                onClick={() => setZoomScale(Math.min(zoomScale + 0.5, 3))}
                className="flex items-center gap-2 px-6 py-3 text-sm font-black uppercase tracking-tighter text-gray-900 bg-[#FFED00] rounded-2xl shadow-lg"
              >
                Zoom In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
