import { BG_URL } from "../utils/constants";
import GPTMovieSuggestion from "./GPTMovieSuggestion";
import GPTSearchBar from "./GPTSearchBar";

const GptSearch = () => {
  return (
    <div className="">
        {/* <div className="absolute -z-10">
            <img
            src={BG_URL}
            alt="logo"
            />
        </div> */}
        <GPTSearchBar/>
        <GPTMovieSuggestion/>
    </div>
  )
}

export default GptSearch;