import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_API } from "../utils/constants";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_API);
      if (!data.ok) throw new Error(`API error: ${data.status}`);
      const json = await data.json();
      setVideos(json.items || []); // fallback to empty array
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading videos...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">Error fetching videos: {error}</div>
    );
  if (videos.length === 0) return <div className="p-4">No videos found.</div>;

  return (
    <div className="flex gap-2 flex-wrap flex-grow w-auto pl-8">
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
