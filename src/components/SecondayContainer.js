import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondayContainer = () => {

  const movies = useSelector(store => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-36  pl-7 relative z-20">
        <MovieList title = {"Now Playing"} movies = {movies.addNowPlayingMovies}/>
        <MovieList title = {"Trending"} movies = {movies.addNowPlayingMovies}/>
        <MovieList title = {"Popular"} movies = {movies.addNowPlayingMovies}/>
        <MovieList title = {"Upcoming Movies"} movies = {movies.addNowPlayingMovies}/>
      </div>
    </div>
  )
}

export default SecondayContainer;