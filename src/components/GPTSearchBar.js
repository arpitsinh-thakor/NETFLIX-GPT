import OpenAI from "openai";
import { useRef } from "react";
import gemini from "../utils/gemini";
import { API_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";


const GPTSearchBar = () => {

  const searchText = useRef(null);
  const dispatch = useDispatch();

  //search movie in tmdb
  const searchMovieTMDB = async (movie)=>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie +"&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  };
  
  const handleGptSearchClick = async () => {
  try {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give 5 movies, comma separated like the example result given ahead. " +
      "Example result: Gadar, Sholay, Don, Gomaal, Koi mil gaya";

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
      throw new Error(data.error || "Gemini API request failed");
    }

    console.log("Gemini response:", data.text);

    const gptMovies = data.text
      .split(",")
      .map((movie) => movie.trim())
      .filter((movie) => movie.length > 0)
      .slice(0, 5);

    console.log("Movies:", gptMovies);

    const tmdbRequests = gptMovies.map((movie) =>
      searchMovieTMDB(movie)
    );

    const tmdbResults = await Promise.all(tmdbRequests);

    console.log("TMDB Results:", tmdbResults);

    dispatch(
      addGptMovieResult({
        movieNames: gptMovies,
        movieResults: tmdbResults,
      })
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
};

  return (
    <div className="pt-[7%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg"
                onSubmit={(e) => e.preventDefault()}>
            <input 
                ref={searchText}
                type="text"  
                className="p-3 m-2 col-span-9 rounded-lg" placeholder="What would you like to watch today ?" />
            <button 
                className="col-span-3 m-2 py-2 px-4 bg-red-500 text-white rounded-lg"
                onClick={handleGptSearchClick}
                >Search</button>
        </form>
    </div>
  )
}

export default GPTSearchBar