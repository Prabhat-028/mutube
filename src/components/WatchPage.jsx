import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";

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
              <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded- hover:bg-red-700">
                Subscribe
              </button>
              <button className="flex gap-2 px-4 py-2 bg-white text-black font-semibold rounded-xl hover:bg-black hover:text-white">
                <FaDownload /> Download
              </button>
            </div>
          </div>

          {/* Likes / Comments summary */}
          <div className=" items-center mt-4 space-x-4 text-white bg-black inline pl-2 pr-2 pt-1 pb-1">
            <span>
              👍 {Number(videoDetails.statistics.likeCount).toLocaleString()}
            </span>
            <span>
              💬 {Number(videoDetails.statistics.commentCount).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">
          {comments.length} Comments
        </h2>

        {/* Add comment input */}
        <div className="flex items-center mb-4 space-x-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Add a public comment..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-gray-500"
          />
          <button className="text-blue-600 font-semibold">Comment</button>
        </div>

        {/* Real comments list */}
        <div className="space-y-4">
          {comments.map((comment) => {
            const snippet = comment.snippet.topLevelComment.snippet;
            return (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={snippet.authorProfileImageUrl}
                  alt={snippet.authorDisplayName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{snippet.authorDisplayName}</p>
                  <p className="text-gray-700">{snippet.textDisplay}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {snippet.likeCount} Likes •{" "}
                    {new Date(snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Comments */}
        {nextPageToken && (
          <button
            onClick={() => setNextPageToken(nextPageToken)}
            className="mt-4 px-4 py-2 border rounded hover:bg-gray-100"
          >
            Load More Comments
          </button>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
