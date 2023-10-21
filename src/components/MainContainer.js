import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.addNowPlayingMovies);
    if(!movies) return;  

    const mainMovie = movies[0];

    const{id, original_title, overview} = mainMovie;
  return (
    <div>
        <VideoTitle title = {original_title} overview = {overview}/>
        <VideoBackground movieId = {id}/>
    </div>
  );
};

export default MainContainer;