import { createSlice } from "@reduxjs/toolkit";

const filterProcessMovie = createSlice({
  name: "filterProcessMovie",
  initialState: "0", // Giá trị ban đầu của sortOption
  reducers: {
    processMovie: (state: any, action) => {
      state = action.payload;
      return state;
    },
  },
});
const { reducer } = filterProcessMovie;

export const { processMovie } = filterProcessMovie.actions;
export default reducer