import reducerUser from './userSlice';
import reducerMovie from './movieSlice';
import reducerSortMovie from './sortSlice';
import reducerFilterTimeMovie from './filterRuntimeSlice';
const rootReducer = {
  users : reducerUser,
  movies: reducerMovie,
  sortData: reducerSortMovie,
  filterTimeMovie: reducerFilterTimeMovie
}

export default rootReducer;