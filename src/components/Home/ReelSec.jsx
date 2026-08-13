import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import VideoCard from "../utilities/VideoCard";
import { fetchVideos } from "../../config/getYoutubeVideo";
import { getYoutubeShorts } from "../../config/api";


const ReelSec = () => {
  const { t } = useTranslation();
  const isResetting = useRef(false);

  const [playingId, setPlayingId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);
  const [youtubeReels, setYoutubeReels] = useState([]);
  const [enableTransition, setEnableTransition] = useState(true);
  const sliderWrapperRef = useRef(null);

  const rawData = useMemo(() => youtubeReels, [youtubeReels]);

  // const getShorts = async () => {
  //   const data = await fetchVideos();

  //   if (!data.items) return;

  //   const formatted = data.items
  //     .filter((item) => item.id.videoId)
  //     .map((item) => ({
  //       id: item.id.videoId,
  //       videoId: item.id.videoId,
  //       thumbnail: item.snippet.thumbnails.medium.url,
  //       text: item.snippet.title,
  //     }));

  //   setYoutubeReels(formatted);
  // };

const getShorts = async () => {
  try {
    const response = await getYoutubeShorts();

    console.log("Shorts API Response:", response);

    const shorts =
      response?.data?.youtubeShorts || [];

    const formatted = shorts.map((url, index) => {
      // Extract video ID from shorts URL
      const videoId = url.split("/shorts/")[1];

      return {
        id: index,
        videoId,
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        text: `YouTube Short ${index + 1}`,
      };
    });

    console.log(formatted)

    setYoutubeReels(formatted);
  } catch (error) {
    console.error("Failed to fetch shorts:", error);
  }
};

  useEffect(() => {
    getShorts();
  }, []);



  const reelsData = useMemo(
    () => [...rawData.slice(-2), ...rawData, ...rawData.slice(0, 2)],
    [rawData]
  );

  /* ─── Responsive Card Dimensions ─── */
  const cardDims = useMemo(() => {
    const w = windowWidth;
    if (w < 640) return { w: 280, h: 380 };
    if (w < 768) return { w: 320, h: 435 };
    if (w < 1024) return { w: 340, h: 462 };
    if (w < 1280) return { w: 360, h: 490 };
    return { w: 380, h: 517 };
  }, [windowWidth]);

  /* ─── Gap between cards ─── */
  const gap = 1;

  /* ─── Window resize listener ─── */
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ─── Calculate translateX value ─── */
  // const getTranslateX = useMemo(() => {
  //   if (!windowWidth || !rawData.length) return 0;

  //   const step = cardDims.w + gap;
  //   const containerWidth = Math.min(windowWidth, 1600);
  //   const centerOffset = (containerWidth - cardDims.w) / 2;

  //   return -activeIndex * step + centerOffset;
  // }, [activeIndex, windowWidth, cardDims, rawData.length, gap]);
  const getTranslateX = useMemo(() => {
    if (!sliderWrapperRef.current || !rawData.length) return 0;

    const step = cardDims.w + gap;

    // REAL visible width
    const containerWidth =
      sliderWrapperRef.current.offsetWidth;

    // perfect center
    const centerOffset =
      (containerWidth - cardDims.w) / 2;

    return -(activeIndex * step) + centerOffset;
  }, [activeIndex, cardDims, rawData.length, gap]);

  /* ─── Handle infinite loop reset ─── */
  useEffect(() => {
    if (!rawData.length || isResetting.current) return;

    if (activeIndex >= rawData.length + 2) {
      isResetting.current = true;
      // Wait for transition to finish, then disable it and reset position
      setTimeout(() => {
        setEnableTransition(false);
        setActiveIndex(2);
        // Re-enable transition on next frame
        requestAnimationFrame(() => {
          isResetting.current = false;
          setEnableTransition(true);
        });
      }, 680);
    } else if (activeIndex <= 1) {
      isResetting.current = true;
      setTimeout(() => {
        setEnableTransition(false);
        setActiveIndex(rawData.length + 1);
        requestAnimationFrame(() => {
          isResetting.current = false;
          setEnableTransition(true);
        });
      }, 680);
    }
  }, [activeIndex, rawData.length]);

  const handleNext = useCallback(() => {
    if (isResetting.current) return;
    setActiveIndex((p) => p + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (isResetting.current) return;
    setActiveIndex((p) => p - 1);
  }, []);

  /* ─── Get card styles based on distance from active ─── */
  const getCardStyle = useCallback(
    (index) => {
      const distance = Math.abs(index - activeIndex);
      const isActive = distance === 0;

      return {
        transform: `scale(${isActive ? 1 : 0.92})`,
        opacity: isActive ? 1 : distance === 1 ? 0.85 : 0.5,
        filter: isActive
          ? "blur(0px)"
          : distance === 1
            ? "blur(1px)"
            : "blur(3px)",
        transition:
          "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      };
    },
    [activeIndex]
  );

  /* ─── Touch Swipe ─── */
  const touchX = useRef(0);
  const onTouchStart = (e) => (touchX.current = e.changedTouches[0].screenX);
  const onTouchEnd = (e) => {
    const diff = touchX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
  };

  return (
    <section className="py- sm:py-10 md:py-12 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4">
        {/* Heading */}
        <div className="py-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter">
            {t("home.reels")}
          </h2>
          <div className="flex justify-center mt-3">
            <div className="w-[90%] h-[2px] bg-gray-300"></div>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderWrapperRef}
          className="relative overflow-hidden select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-[#FFED00] shadow-2xl p-4 rounded-full transition-all hidden md:block"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-[#FFED00] shadow-2xl p-4 rounded-full transition-all hidden md:block"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <div className="overflow-hidden py-">
            <div
              className="flex items-center"
              style={{
                transform: `translateX(${getTranslateX}px)`,
                transition: enableTransition
                  ? "transform 0.65s cubic-bezier(0.215, 0.61, 0.355, 1)"
                  : "none",
              }}
            >
              {reelsData.map((reel, index) => {
                const key = `${reel.id}-${index}`;
                const isThisPlaying = playingId === key;

                return (
                  <div
                    key={key}
                    className="flex-shrink-0"
                    style={{
                      ...getCardStyle(index),
                      width: `${cardDims.w}px`,
                      marginLeft: index === 0 ? "0" : `${gap}px`,
                    }}
                  >
                    <VideoCard
                      data={reel}
                      isActive={activeIndex === index}
                      isGloballyPlaying={isThisPlaying}
                      setGlobalPlay={() => setPlayingId(key)}
                      setGlobalPause={() => setPlayingId(null)}
                      width={`${cardDims.w}px`}
                      height={`${cardDims.h}px`}
                      muted={!isThisPlaying}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {rawData.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                (activeIndex - 2 + rawData.length) % rawData.length === i
                  ? "w-12 bg-[#FFED00]"
                  : "w-3 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelSec;