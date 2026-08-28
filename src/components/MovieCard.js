import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div
      className="
        group/card
        relative
        w-32
        flex-shrink-0
        cursor-pointer
        overflow-hidden
        rounded-md
        transition-all
        duration-300
        hover:z-20
        hover:scale-110
        sm:w-36
        md:w-40
        lg:w-44
        xl:w-48
      "
    >
      <img
        src={IMG_CDN_URL + posterPath}
        alt="Movie poster"
        loading="lazy"
        className="
          aspect-[2/3]
          w-full
          object-cover
          transition-all
          duration-300
          group-hover/card:brightness-110
        "
      />
    </div>
  );
};

export default MovieCard;