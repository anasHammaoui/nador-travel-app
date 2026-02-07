import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import placesReducer from "./slices/placesSlice";
import newsletterReducer from "./slices/newsletterSlice";

export const store = configureStore({
  reducer: {
    places: placesReducer,
    newsletter: newsletterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed dispatch hook */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/** Typed selector hook */
export const useAppSelector = useSelector.withTypes<RootState>();
