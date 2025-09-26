import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { FaComment, FaDownload, FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import Comment from "./Comment";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  // Fetch video details
  useEffect(() => {
    const fetchVideoDetails = async () => {
      const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setVideoDetails(data.items[0]);
      } catch (err) {
        console.error("Failed to fetch video details:", err);
      }
    };
    if (videoId) fetchVideoDetails();
  }, [videoId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
      let url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&key=${API_KEY}`;
      if (nextPageToken) url += `&pageToken=${nextPageToken}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setComments((prev) => [...prev, ...data.items]);
        setNextPageToken(data.nextPageToken);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    if (videoId) fetchComments();
  }, [videoId, nextPageToken]);

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      {/* Video */}
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-lg"
      ></iframe>

      {/* Video info */}
      {videoDetails && (
        <div className="mt-4 bg-gray-200 p-4 rounded-lg">
          <h1 className="text-2xl font-bold line-clamp-2">
            {videoDetails.snippet.title}
          </h1>

          {/* Channel info + Subscribe + Download */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                <img
                  src={videoDetails.snippet.thumbnails.default.url}
                  alt={videoDetails.snippet.channelTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">
                  {videoDetails.snippet.channelTitle}
                </p>
                <p className="text-gray-500 text-sm">
                  {Number(videoDetails.statistics.viewCount).toLocaleString()}{" "}
                  views •{" "}
                  {new Date(videoDetails.snippet.publishedAt).toDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-3xl hover:bg-red-700">
                Subscribe
              </button>
              <button className="flex gap-2 px-4 py-2 bg-white text-black font-semibold rounded-3xl hover:bg-black hover:text-white">
                <FaDownload /> Download
              </button>
            </div>
          </div>

          {/* Likes / Comments summary */}
          <div className="flex items-center mt-4 space-x-4">
            {/* Like Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <FaThumbsUp className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                {Number(videoDetails.statistics.likeCount).toLocaleString()}
              </span>
            </button>
            <button className="flex items-center px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <FaThumbsDown className="text-gray-600" />
            </button>

            {/* Comment Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
              <FaComment className="text-gray-600" />
              <span className="text-gray-700 font-medium">
                {Number(videoDetails.statistics.commentCount).toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      )}
      <Comment comments={comments} nextPageToken={nextPageToken}  />
    </div>
  );
};

export default WatchPage;
