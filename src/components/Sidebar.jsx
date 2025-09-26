import {
  FaGraduationCap,
  FaHistory,
  FaHome,
  FaMusic,
  FaNewspaper,
  FaPodcast,
  FaShoppingBag,
  FaStopwatch,
  FaThumbsUp,
  FaVideo,
} from "react-icons/fa";
import { FaCircleDot, FaHeart, FaMound, FaTrophy } from "react-icons/fa6";
import { MdFeaturedPlayList } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  //early return if isMenuOpen is false
  if (!isMenuOpen) return null;
  return (
    <div className="w-42 px-2 bg-white h-screen w-auto">
      <div className="pt-2 font-san  ">
        <Link to="/">
          <p className="flex items-center">
            <FaHome className="mr-5" />
            Home
          </p>
        </Link>
        <h1 className="flex items-center">
          <svg
            className="mr-5"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="black"
          >
            <path d="M10.5 3.5L17 7v3l-6.5-3.5V20l-6.5-3.5v-3l6.5 3.5V3.5z" />
          </svg>
          Shorts
        </h1>
        <h1 className="flex items-center">
          <svg
            className="mr-5"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="black"
          >
            <path d="M20 8H4V6h16v2zm0 2v8H4v-8h16zM9.5 13.5v3L13 15l-3.5-1.5z" />
          </svg>
          Subscriptioins
        </h1>
      </div>
      <hr />
      <div className="pt-2 font-san ">
        <h1 className="flex items-center">
          <FaHistory className="mr-5" />
          History
        </h1>
        <h1 className="flex items-center">
          <MdFeaturedPlayList className="mr-5" />
          Playlists
        </h1>
        <h1 className="flex items-center">
          <FaVideo className="mr-5" />
          Your videos
        </h1>
        <h1 className="flex items-center">
          <FaGraduationCap className="mr-5" />
          Your courses
        </h1>
        <h1 className="flex items-center">
          <FaStopwatch className="mr-5" />
          Watch later
        </h1>
        <h1 className="flex items-center">
          <FaThumbsUp className="mr-5" />
          Liked videos
        </h1>
      </div>
      <hr />
      <div className="pt-2 font-san ">
        <h1 className="flex items-center">
          <FaShoppingBag className="mr-5" />
          Shopping
        </h1>
        <h1 className="flex items-center">
          <FaMusic className="mr-5" />
          Music
        </h1>
        <h1 className="flex items-center">
          <FaMound className="mr-5" />
          Movies
        </h1>
        <h1 className="flex items-center">
          <FaCircleDot className="mr-5" />
          Live
        </h1>
        <h1 className="flex items-center">
          <FaHeart className="mr-5" />
          Gaming
        </h1>
        <h1 className="flex items-center">
          <FaNewspaper className="mr-5" />
          News
        </h1>
        <h1 className="flex items-center">
          <FaTrophy className="mr-5" />
          Sports
        </h1>
        <h1 className="flex items-center">
          <FaGraduationCap className="mr-5" />
          Courses
        </h1>
        <h1 className="flex items-center">
          <FaShoppingBag className="mr-5" />
          Fashion & Beauty
        </h1>
        <h1 className="flex items-center">
          <FaPodcast className="mr-5" />
          Podcasts
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
