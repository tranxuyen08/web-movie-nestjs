import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/index";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;