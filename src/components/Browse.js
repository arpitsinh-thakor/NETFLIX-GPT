import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondayContainer from './SecondayContainer';

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  useNowPlayingMovies();

  return (
    <div>
      <Header/>
      {
        showGptSearch ? 
          (<GptSearch/>) : 
            (<>
              <MainContainer/>
              <SecondayContainer/>
            </>)
      }
    </div>
  );
};

export default Browse;