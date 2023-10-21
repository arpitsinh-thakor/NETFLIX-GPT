import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';

const VideoBackground = () => {
  const dispath = useDispatch();
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  const getMovieVideos = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/299054/videos?language=en-US', API_OPTIONS);
    const json = await data.json();
    console.log(json);
    const filterData = json.results.filter(video => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0]: json.results[0];
    dispath(addTrailerVideo(trailer));
  };

  useEffect(()=>{
    getMovieVideos();
  }, []);

  return (
    <div>
      <iframe width="560" height="315" 
        src={"https://www.youtube.com/embed/" + trailerVideo?.key}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen></iframe>
    </div>
  )
}

export default VideoBackground