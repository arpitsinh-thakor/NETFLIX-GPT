import MovieCard from "./MovieCard";
import { useRef } from "react";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative px-4 py-5 sm:px-6 md:px-10">

      {/* Title */}
      <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="
          absolute left-2 top-1/2 z-30
          hidden -translate-y-1/2
          rounded-full
          bg-black/70
          p-3
          text-2xl
          text-white
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-300
          hover:scale-110
          hover:bg-black
          md:group-hover:block
        "
        aria-label="Scroll left"
      >
        ‹
      </button>

      {/* Movie Slider */}
      <div
        ref={sliderRef}
        className="
          flex
          gap-3
          overflow-x-auto
          scroll-smooth
          pb-3
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {movies.map(
          (movie) =>
            movie?.poster_path && (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
              />
            )
        )}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="
          absolute right-2 top-1/2 z-30
          hidden -translate-y-1/2
          rounded-full
          bg-black/70
          p-3
          text-2xl
          text-white
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-300
          hover:scale-110
          hover:bg-black
          md:group-hover:block
        "
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
};

export default MovieList;