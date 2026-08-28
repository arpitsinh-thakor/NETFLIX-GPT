import { useEffect, useCallback } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = useCallback(async () => {
    try {
       const data = await fetch("/api/tmdb");

      const json = await data.json();

      if (!data.ok) {
        console.error("TMDB Error:", json);
        return;
      }

      dispatch(addNowPlayingMovies(json.results || []));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, [nowPlayingMovies, getNowPlayingMovies]);
};

export default useNowPlayingMovies;