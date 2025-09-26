import React,{useState,useEffect} from 'react'
import { GOOGLE_API_KEY, HamBurger_URL, NOTFICATION_LOGO_URL, USER_LOGO_URL, YOUTUBE_LOGO_URL} from '../utils/constants';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };
    
    useEffect(() => {
        
        const timer=setTimeout(() =>  getSearchQuery() , 200);
        
        return ()=>{
            clearTimeout(timer);
        }
        

    }, [searchQuery])
    
    const getSearchQuery = async () => {
        const data = await fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+searchQuery+"&maxResults=5&key="+GOOGLE_API_KEY);
        const json = await data.json();
        console.log(json);
    }


    return (
      <div className="grid grid-flow-col p-2 shadow-lg bg-white sticky">
        <div className="flex col-span-1">
          <img
            className="h-8 cursor-pointer"
            src={HamBurger_URL}
            alt="#"
            onClick={() => toggleMenuHandler()}
          />
          <img className="h-8 mx-2" src={YOUTUBE_LOGO_URL} alt="#" />
        </div>
        <div className="col-span-10 text-center">
          <input
            className="w-2/3 border border-gray-400 p-2 rounded-l-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none  focus:ring-1 focus:border-[0px] focus:border-b-blue-400"
            type="text"
                    placeholder=" Search"
                    value={searchQuery}
                    onChange={(e)=>{setSearchQuery(e.target.value)}}
          />
          <button className=" border border-gray-400 py-2 px-5 rounded-r-3xl bg-gray-100">
            🔍
          </button>
        </div>
        <div className="col-span-1 flex justify-around">
          <img className="h-8" src={NOTFICATION_LOGO_URL} alt="notification" />
          <img className=" ml-2 h-8" src={USER_LOGO_URL} alt="user" />
        </div>
      </div>
    );
}

export default Head;