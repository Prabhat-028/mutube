import React, { useState, useEffect } from "react";
import {
  GOOGLE_API_KEY,
  HamBurger_URL,
  NOTFICATION_LOGO_URL,
  USER_LOGO_URL,
  YOUTUBE_LOGO_URL,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import {cacheResults} from "../utils/searchSlice"

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
    };
    //subscribing the store using useSelector hook 
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
      const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
        searchQuery +
        "&maxResults=10&key=" +
        GOOGLE_API_KEY
    );
    const json = await data.json();
      setSuggestions(json.items || []);
      //dispatch and action
      dispatch(
        cacheResults({
          [searchQuery]: json.items,
        })
      );
  };

  return (
    <div className="grid grid-flow-col p-2 shadow-lg bg-white sticky top-0 z-40 ">
      {/* Left - Logo + Menu */}
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          src={HamBurger_URL}
          alt="menu"
          onClick={toggleMenuHandler}
        />
        <img className="h-8 mx-2" src={YOUTUBE_LOGO_URL} alt="YouTube" />
      </div>

      {/* Middle - Search */}
      <div className="col-span-10 text-center place-items-center relative">
        <input
          className="w-2/3 border border-gray-400 p-2 rounded-l-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-1 focus:border-[0px] focus:border-b-blue-400"
          type="text"
          placeholder=" Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setShowSuggestions(false);
          }}
        />
        <button className="border border-gray-400 py-2 px-5 rounded-r-3xl bg-gray-100">
          🔍
        </button>

        {/* ✅ Suggestion Box */}
        {showSuggestions && (
          <div className="absolute top-12 left-40 w-2/3 bg-white border rounded-lg shadow-lg z-50 ">
            <ul className="py-2">
              {suggestions.map((item, index) => (
                <li
                  className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  key={index}
                >
                  <svg
                    className="w-4 h-4 text-gray-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-800 truncate">
                    {item.snippet?.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right - Icons */}
      <div className="col-span-1 flex justify-around">
        <img className="h-8" src={NOTFICATION_LOGO_URL} alt="notification" />
        <img className="ml-2 h-8" src={USER_LOGO_URL} alt="user" />
      </div>
    </div>
  );
};

export default Head;
