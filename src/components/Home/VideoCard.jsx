import React, { useRef } from "react";
import YouTube from "react-youtube";

const getYoutubeId = (url) => {
  const match = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const VideoCard = ({ data, width, height }) => {
  const playerRef = useRef(null);
  const videoId = getYoutubeId(data.video);

  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      loop: 1,
      playlist: videoId,
      mute: 1,
      playsinline: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const handlePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    player.unMute();
    player.playVideo();
  };

  if (!videoId) return null;

  return (
    <div
      style={{ width, height }}
      className="relative rounded-2xl overflow-hidden bg-black"
    >
      {/* Thumbnail */}
      <img
        src={data.thumbnail}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Play Button */}
      <div
        onClick={handlePlay}
        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
      >
        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          ▶
        </div>
      </div>

      {/* YouTube Player */}
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className="absolute inset-0 z-0"
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent z-30">
        <p className="text-white text-sm">{data.text}</p>
      </div>
    </div>
  );
};

export default VideoCard;