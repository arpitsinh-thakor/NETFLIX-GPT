import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.addNowPlayingMovies);
    // console.log(movies);
    if(!movies) return;  

    const mainMovie = movies[0];
    console.log(mainMovie);
  return (
    <div>
        <VideoTitle/>
        <VideoBackground/>
    </div>
  );
};

export default MainContainer;