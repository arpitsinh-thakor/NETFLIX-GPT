import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector(
    (store) => store.gpt
  );

  if (!movieNames || !movieResults) return null;

  return (
    <div className="px-4 pb-10">
      {movieResults.map((movies, index) => {
        if (!movies || movies.length === 0) {
          return null;
        }

        const validMovies = movies.filter(
          (movie) => movie?.poster_path
        );

        if (validMovies.length === 0) {
          return null;
        }

        return (
          <MovieList
            key={`${movieNames[index]}-${index}`}
            title={movieNames[index]}
            movies={validMovies}
          />
        );
      })}
    </div>
  );
};

export default GPTMovieSuggestions;