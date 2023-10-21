import MovieCard from "./MovieCard"


const MovieList = ({title, movies}) => {
    console.log(movies);
    if(movies === null) return;
  return (
    <div className="px-6">
        <h1 className="py-4 text-2xl font-semibold text-white">{title}</h1>
        <div className="flex overflow-x-scroll">
            <div className="flex">
                { 
                    movies.map(movie => 
                        movie && <MovieCard key={movie.id} posterPath={movie.poster_path}/>
                    )
                }
                <MovieCard/>
            </div>
        </div>
    </div>
  )
}

export default MovieList