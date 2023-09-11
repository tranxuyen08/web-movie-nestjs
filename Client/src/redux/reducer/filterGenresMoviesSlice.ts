import { createSlice } from "@reduxjs/toolkit";

const filterGenresMovie = createSlice({
  name: "filterGenresMovie",
  initialState: [], // Giá trị ban đầu của sortOption
  reducers: {
    genresMovie: (state: any, action) => {
      state = action.payload;
      return state;
    },
  },
});
const { reducer } = filterGenresMovie;
export const { genresMovie } = filterGenresMovie.actions;
export default reducer