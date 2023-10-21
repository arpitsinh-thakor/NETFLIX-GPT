import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer"

const VideoBackground = ({movieId}) => {

  const trailerVideo = useSelector((store)=>store.movies?.trailerVideo)
  useMovieTrailer(movieId);

  return (
    <div>
      <iframe width="560" height="315" 
        src={"https://www.youtube.com/embed/" + trailerVideo?.key}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen></iframe>
    </div>
  )
}

export default VideoBackground