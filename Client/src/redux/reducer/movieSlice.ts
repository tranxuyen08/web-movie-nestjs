import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieAPI } from "../../api/movieApiClient";
import { IMovie } from "../../types/types";
import axios from "axios";

export const getAll = createAsyncThunk("getAll", async (payload: any) => {
  const res = await MovieAPI.getAllMovie(payload);
  return res.data;
});
export const getMovieShowSlide = createAsyncThunk(
  "getShowSlide",
  async (_, thunkAPI) => {
    // const cancelRequest = thunkAPI.signal
    // const res = await MovieAPI.getMovieShowSlide(cancelRequest)
    const test = await axios.get("http://localhost:8000/api/v1/movie/popular", {
      signal: thunkAPI.signal,
    });
    return test.data;
  }
);
export const getMovieRate = createAsyncThunk("getRate", async (_, thunkAPI) => {
  // const res = await MovieAPI.getMovieRate()
  const test = await axios.get("http://localhost:8000/api/v1/movie/rate", {
    signal: thunkAPI.signal,
  });
  return test.data;
});
export const getMovieSearch = createAsyncThunk(
  "getSearch",
  async (payload: any) => {
    const res = await MovieAPI.getMovieSearch(payload);
    return res.data;
  }
);

interface MovieState {
  data: Array<IMovie> | [];
  pagination: {
    _limit: number;
    _page: number;
    _totalMovie: number;
  };
}

const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    data: [],
    pagination: {},
  } as MovieState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(
        getAll.fulfilled,
        (state: any, action: PayloadAction<MovieState>) => {
          state.data = action.payload.data; // Cập nhật dữ liệu phim
          state.pagination = action.payload.pagination; // Cập nhật dữ liệu phân trang
        }
      )
      .addCase(
        getMovieShowSlide.fulfilled,
        (state: any, action: PayloadAction<MovieState>) => {
          state.data = action.payload.data;
        }
      )
      .addCase(
        getMovieRate.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state = action.payload;
        }
      )
      .addCase(
        getMovieSearch.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state = action.payload;
        }
      );
  },
});

const { reducer } = MovieSlice;

export default reducer;
