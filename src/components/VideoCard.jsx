import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const VideoCard = ({ info }) => {
    if (!info || !info.snippet) {
      return null; 
    }
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const { viewCount } = statistics;

  return (
    <div className="w-[430px] cursor-pointer flex flex-wrap">
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={thumbnails?.maxres?.url || thumbnails?.high?.url}
          alt={title}
          className="w-full h-[240px] object-cover rounded-xl"
        />
      </div>

      {/* Video Info */}
      <div className="flex mt-2 space-x-3">
        {/* Channel Avatar placeholder */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
          <img
            src={thumbnails?.default?.url || thumbnails?.high?.url}
            alt="channel avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm line-clamp-2">{title}</p>
          <p className="text-gray-600 text-sm">{channelTitle}</p>
          <p className="text-gray-500 text-xs">
            {viewCount} views • {new Date(publishedAt).toDateString()}
          </p>
        </div>

        {/* Three dots always visible */}
        <div className="self-start text-gray-600 hover:text-black">
          <BsThreeDotsVertical size={18} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
