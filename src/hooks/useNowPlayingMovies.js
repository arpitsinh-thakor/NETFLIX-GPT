import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = useCallback(async () => {
    try {
      const response = await fetch("/api/tmdb");

      const json = await response.json();

      if (!response.ok) {
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