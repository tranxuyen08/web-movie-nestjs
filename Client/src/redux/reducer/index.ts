import reducerUser from './userSlice';
import reducerMovie from './movieSlice';
import reducerSortMovie from './sortSlice';
import reducerFilterTimeMovie from './filterRuntimeSlice';
import reducerGenresMovie from './filterGenresMoviesSlice';
const rootReducer = {
  users : reducerUser,
  movies: reducerMovie,
  sortData: reducerSortMovie,
  filterTimeMovie: reducerFilterTimeMovie,
  filterGenresMovie : reducerGenresMovie
}

export default rootReducer;