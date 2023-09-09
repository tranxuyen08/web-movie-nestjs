import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: " ", // Giá trị ban đầu của sortOption
  reducers: {
    addSort: (state, action) => {
      return (state = action.payload);
    },
  },
});
const sortPopulateSlice = createSlice({
  name: "sortPopulate",
  initialState: " ",
  reducers: {
    addSortPopulate: (state, action) => {
      return (state = action.payload);
    },
  },
});

const { reducer } = sortSlice;
export const { addSort } = sortSlice.actions;
export const { addSortPopulate } = sortPopulateSlice.actions;
export default reducer;
