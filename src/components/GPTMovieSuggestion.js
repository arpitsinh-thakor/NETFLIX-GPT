import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GPTMovieSuggestion = () => {
  const{movieResults, movieNames} = useSelector(store => store.gpt);

  return (
    <div className="p-4 m-4">
      <div>
          {
            movieNames.map((movieName, index) => 
              <MovieList 
                key="movieName" 
                title={movieName} 
                movies={movieResults[index]}/>)
          }
      </div>
    </div>
  )
}

export default GPTMovieSuggestion