import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector(
    (store) => store.movies.trailerVideo
  );

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `/api/tmdb?type=videos&movieId=${movieId}`
      );

      const json = await data.json();

      if (!data.ok) {
        console.error("TMDB Video Error:", json);
        return;
      }

      if (!json.results || json.results.length === 0) {
        console.log("No videos found for this movie");
        return;
      }

      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );

      const trailer =
        filterData.length > 0
          ? filterData[0]
          : json.results[0];

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Failed to fetch movie videos:", error);
    }
  };

  useEffect(() => {
    if (!trailerVideo && movieId) {
      getMovieVideos();
    }
  }, [movieId, trailerVideo]);

};

export default useMovieTrailer;