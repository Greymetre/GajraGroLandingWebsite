// import React, { useState, useRef, useEffect } from "react";
// import { Play, Pause } from "lucide-react";

// const VideoCard = ({
//   data,
//   isActive,
//   isGloballyPlaying,
//   setGlobalPlay,
//   setGlobalPause,
//   width,
//   height,
// }) => {
//   const videoRef = useRef(null);
//   const playPromise = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handlePlayback = async () => {
//       try {
//         if (isGloballyPlaying) {
//           // Clear any previous state and play
//           video.load();
//           playPromise.current = video.play();
//           await playPromise.current;
//           setIsPlaying(true);
//         } else {
//           if (playPromise.current !== null) await playPromise.current;

//           video.pause();

//           // RESET LOGIC
//           video.currentTime = 0;
//           video.load();

//           setIsPlaying(false);
//         }
//       } catch (err) {
//         setIsPlaying(false);
//       }
//     };

//     handlePlayback();
//   }, [isGloballyPlaying]);

//   const togglePlay = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isGloballyPlaying) {
//       setGlobalPause();
//     } else {
//       setGlobalPlay();
//     }
//   };

//   useEffect(() => {
//     if (!isActive && isGloballyPlaying) {
//       setGlobalPause();
//     }
//   }, [isActive, isGloballyPlaying, setGlobalPause]);

//   return (
//     <div
//       className="flex-shrink-0 transition-all duration-500"
//       style={{ width: width, height: height }}
//     >
//       <div className="w-full h-full rounded-[1rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl bg-black relative group border border-gray-100 mx-2">
//         <video
//           key={data.id}
//           ref={videoRef}
//           src={data.video}
//           poster={data.thumbnail}
//           className={`w-full h-full bg-black transition-all duration-300 ${
//             isPlaying ? "object-fill" : "object-fill"
//           }`}
//           playsInline
//           loop
//           muted={true}
//         />

//         {/* INTERACTIVE OVERLAY */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex flex-col justify-end p-8 md:p-10 text-center z-10 ${
//             isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
//           }`}
//         >
//           <div className="absolute inset-0 flex items-center justify-center z-20">
//             <button
//               onClick={togglePlay}
//               className="bg-white/20 p-5 md:p-7 rounded-full border border-white/30 backdrop-blur-xl transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
//             >
//               {isPlaying ? (
//                 <Pause size={35} className="text-white fill-white" />
//               ) : (
//                 <Play size={35} className="text-white fill-white ml-1" />
//               )}
//             </button>
//           </div>

//           <p className="text-white text-xs md:text-[13px] font-black uppercase italic tracking-tighter opacity-90 leading-tight drop-shadow-md z-10">
//             {data.text}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCard;



import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const VideoCard = ({
  data,
  isActive,
  isGloballyPlaying,
  setGlobalPlay,
  setGlobalPause,
  width,
  height,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isGloballyPlaying) {
      setGlobalPause();
      setIsPlaying(false);
    } else {
      setGlobalPlay();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!isActive && isGloballyPlaying) {
      setGlobalPause();
      setIsPlaying(false);
    }
  }, [isActive, isGloballyPlaying, setGlobalPause]);

  return (
    <div
      className="flex-shrink-0 transition-all duration-500"
      style={{ width: width, height: height }}
    >
      <div className="w-full h-full rounded-[1rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl bg-black relative group border border-gray-100 mx-2">
        
        {/* 👉 YOUTUBE IFRAME */}
        {isPlaying ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${data.videoId}`}
            title="YouTube Short"
            allow="autoplay"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <img
            src={data.thumbnail}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        )}

        {/* OVERLAY */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex flex-col justify-end p-8 md:p-10 text-center z-10 ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
              onClick={togglePlay}
              className="bg-white/20 p-5 md:p-7 rounded-full border border-white/30 backdrop-blur-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={35} className="text-white fill-white" />
              ) : (
                <Play size={35} className="text-white fill-white ml-1" />
              )}
            </button>
          </div>

          <p className="text-white text-xs md:text-[13px] font-black uppercase italic tracking-tighter opacity-90 leading-tight drop-shadow-md z-10">
            {data.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;