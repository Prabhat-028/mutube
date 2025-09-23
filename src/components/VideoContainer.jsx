import React,{useEffect} from 'react'
import VideoList from './VideoList'
import { YOUTUBE_API } from '../utils/constants';

const VideoContainer = () => {

    useEffect(() => {
        getVideos();
    }, []);
    const getVideos = async () => {
        const data = await fetch(YOUTUBE_API);
        const json = await data.json();
        console.log("Printing movies data",json);
    }
  return (
      <div>
          <VideoList/>
    </div>
  )
}

export default VideoContainer