import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mineSweeperReducer from "../reducer/reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, mineSweeperReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
