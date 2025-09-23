import { FaGraduationCap, FaHistory, FaHome, FaMusic, FaNewspaper, FaPodcast, FaShoppingBag, FaStopwatch, FaThumbsUp, FaVideo} from "react-icons/fa";
import {  FaCircleDot, FaHeart, FaMound, FaTrophy } from "react-icons/fa6";
import { MdFeaturedPlayList } from "react-icons/md";
import { useSelector } from "react-redux";
const Sidebar = () => {
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    
    //early return if isMenuOpen is false
    if (!isMenuOpen) return null;
    return (
      <div className="w-48 px-2 bg-white h-screen">
        <div className="pt-2 font-san font-semibold ">
          <h1 className="flex items-center">
            <FaHome className="mr-2" />
            Home
          </h1>
          <h1 className="flex items-center">
            <svg
              className="mr-1"
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
              className="mr-0"
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
       <hr/>
        <div className="pt-2 font-san font-semibold ">
          <h1 className="flex items-center">
            <FaHistory className="mr-2" />
            History
          </h1>
          <h1 className="flex items-center">
            <MdFeaturedPlayList className="mr-2" />
            Playlists
          </h1>
          <h1 className="flex items-center">
            <FaVideo className="mr-2" />
            Your videos
          </h1>
          <h1 className="flex items-center">
            <FaGraduationCap className="mr-2" />
            Your courses
          </h1>
          <h1 className="flex items-center">
            <FaStopwatch className="mr-2" />
            Watch later
          </h1>
          <h1 className="flex items-center">
            <FaThumbsUp className="mr-2" />
            Liked videos
          </h1>
        </div>
       <hr/>
        <div className="pt-2 font-san font-semibold ">
          <h1 className="flex items-center">
            <FaShoppingBag className="mr-2" />
            Shopping
          </h1>
          <h1 className="flex items-center">
            <FaMusic className="mr-2" />
            Music
          </h1>
          <h1 className="flex items-center">
            <FaMound className="mr-2" />
            Movies
          </h1>
          <h1 className="flex items-center">
            <FaCircleDot className="mr-2" />
            Live
          </h1>
          <h1 className="flex items-center">
            <FaHeart className="mr-2" />
            Gaming
          </h1>
          <h1 className="flex items-center">
            <FaNewspaper className="mr-2" />
            News
          </h1>
          <h1 className="flex items-center">
            <FaTrophy className="mr-2" />
            Sports
          </h1>
          <h1 className="flex items-center">
            <FaGraduationCap className="mr-2" />
            Courses
          </h1>
          <h1 className="flex items-center">
            <FaShoppingBag className="mr-2" />
            Fashion & Beauty
          </h1>
          <h1 className="flex items-center">
            <FaPodcast className="mr-2" />
            Podcasts
          </h1>
        </div>
      </div>
    );
};

export default Sidebar;