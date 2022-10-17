import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import movieReducer from "../features/movieSlice";
import gridReducer from "../features/gridSlice";
import sortSliceReducer from "../features/sortSlice";

const reducers = combineReducers({
  movie: movieReducer,
  grid: gridReducer,
  sort: sortSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
