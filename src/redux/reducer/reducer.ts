import { createSlice } from "@reduxjs/toolkit";
import { GameState } from "../../data/type/type";
import { initializeBoard } from "../../utill/initializeBoard";
import { openCells } from "../../utill/openCells";

export const initialState: GameState = {
  board: [],
  difficulty: "Beginner",
  boardSettings: { width: 8, height: 8, mines: 10 },
  timer: 0,
  start: false,
  end: "",
  usedFlag: 0,
};

const mineSweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    setDifficulty: (state, action) => {
      state.difficulty = action.payload.difficulty;

      if (action.payload === "Beginner") {
        state.boardSettings = { width: 8, height: 8, mines: 10 };
      } else if (action.payload === "Intermediate") {
        state.boardSettings = { width: 16, height: 16, mines: 40 };
      } else if (action.payload === "Expert") {
        state.boardSettings = { width: 32, height: 16, mines: 100 };
      } else if (action.payload === "Custom") {
        state.boardSettings = action.payload.setting;
      }
    },
    increaseTimer: (state) => {
      state.timer += 1;
    },
    resetGame: (state) => {
      state.board = [];
      state.timer = 0;
      state.start = false;
      state.end = "";
      state.usedFlag = 0;
    },

    clickFlag: (state, action) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];

      if (cell.isFlagged) {
        state.usedFlag -= 1;
      } else {
        state.usedFlag += 1;
      }
      cell.isFlagged = !cell.isFlagged;
    },
    clickCell: (state, action) => {
      const { x, y } = action.payload;

      if (!state.start) {
        state.start = true;
        state.board = initializeBoard(state, x, y);
      }

      const cell = state.board[y][x];

      if (cell.isFlagged || cell.isOpen) {
        return;
      }

      if (cell.isMine) {
        state.end = "defeat";
        for (let i = 0; i < state.boardSettings.height; i++) {
          for (let j = 0; j < state.boardSettings.width; j++) {
            if (state.board[i][j].isMine && !state.board[i][j].isFlagged) {
              state.board[i][j].isOpen = true;
            }
          }
        }
        return;
      }

      openCells(state, x, y);

      const flattenedBoard = state.board.flat();
      const safeCell = flattenedBoard.filter(
        (cell) => !cell.isMine && !cell.isOpen
      );
      if (safeCell.length === 0) {
        state.end = "victory";
      }
    },
  },
});

export const { setDifficulty, increaseTimer, resetGame, clickFlag, clickCell } =
  mineSweeperSlice.actions;

export default mineSweeperSlice.reducer;
