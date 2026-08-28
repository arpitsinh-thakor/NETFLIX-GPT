import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // Search movie through our backend -> TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `/api/tmdb?type=search&query=${encodeURIComponent(movie)}`
      );

      const json = await response.json();

      if (!response.ok) {
        console.error("TMDB Search Error:", json);
        return [];
      }

      return json.results || [];
    } catch (error) {
      console.error("TMDB Fetch Error:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current?.value?.trim();

    if (!query) return;

    try {
      // -----------------------------
      // 1. Ask Gemini for movies
      // -----------------------------

      const gptQuery =
        "Act as a movie recommendation system and suggest some movies for the query: " +
        query +
        ". Only give 5 movies, comma separated. " +
        "Do not add numbering, explanations, or extra text. " +
        "Example: Gadar, Sholay, Don, Gomaal, Koi Mil Gaya";

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: gptQuery,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Gemini API request failed"
        );
      }

      console.log("Gemini response:", data.text);

      // -----------------------------
      // 2. Extract movie names
      // -----------------------------

      const gptMovies = data.text
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean)
        .slice(0, 5);

      console.log("Movies:", gptMovies);

      if (gptMovies.length === 0) {
        console.log("No movies returned by Gemini");
        return;
      }

      // -----------------------------
      // 3. Search movies in TMDB
      // -----------------------------

      const tmdbResults = await Promise.all(
        gptMovies.map((movie) => searchMovieTMDB(movie))
      );

      console.log("TMDB Results:", tmdbResults);

      // -----------------------------
      // 4. Store results in Redux
      // -----------------------------

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );

      console.log("Redux updated");
    } catch (error) {
      console.error("GPT Search Error:", error);
    }
  };

  return (
    <div className="flex justify-center px-4 pt-[20%] sm:pt-[12%] md:pt-[8%]">
      <form
        className="
          grid
          w-full
          max-w-2xl
          grid-cols-12
          overflow-hidden
          rounded-lg
          bg-black/80
          shadow-xl
        "
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearchClick();
        }}
      >
        <input
          ref={searchText}
          type="text"
          className="
            col-span-9
            m-2
            rounded-lg
            bg-white
            p-3
            text-black
            outline-none
          "
          placeholder="What would you like to watch today?"
        />

        <button
          type="submit"
          className="
            col-span-3
            m-2
            rounded-lg
            bg-red-600
            px-4
            py-2
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-red-700
            active:scale-95
          "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;