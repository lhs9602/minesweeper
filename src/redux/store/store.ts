import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mineSweeperReducer, { initialState } from "../reducer/reducer";
import { GameState, PersistedState } from "../../data/type/type";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const saveSpecifics = createTransform<GameState, PersistedState>(
  (inboundState, key) => {
    if (key === "game") {
      return {
        difficulty: inboundState.difficulty,
        boardSettings: inboundState.boardSettings,
      };
    }
    return inboundState;
  },
  (outboundState) => {
    return {
      ...initialState,
      difficulty: outboundState.difficulty,
      boardSettings: outboundState.boardSettings,
    };
  }
);
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["minesweeper"],
  transforms: [saveSpecifics],
};

const persistedReducer = persistReducer(persistConfig, mineSweeperReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const persistor = persistStore(store);
