import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DifficultyProps, GameState, SettingProps } from "../../data/type/type";
import { initializeBoard } from "../../utill/initializeBoard";
import { openCells } from "../../utill/openCells";
import { countFlags, getNeighborCoords } from "../../utill/countFlags";
import { checkGameVictory } from "../../utill/checkGameVictory";

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
    setDifficulty: (state, action: PayloadAction<DifficultyProps>) => {
      state.difficulty = action.payload.difficulty;

      if (action.payload.difficulty === "Beginner") {
        state.boardSettings = { width: 8, height: 8, mines: 10 };
      } else if (action.payload.difficulty === "Intermediate") {
        state.boardSettings = { width: 16, height: 16, mines: 40 };
      } else if (action.payload.difficulty === "Expert") {
        state.boardSettings = { width: 32, height: 16, mines: 100 };
      } else if (action.payload.difficulty === "Custom") {
        state.boardSettings = action.payload.setting as SettingProps;
      }

      state.board = [];
      state.timer = 0;
      state.start = false;
      state.end = "";
      state.usedFlag = 0;
    },

    increaseTimer: (state) => {
      if (state.timer >= 999) {
        return;
      }

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
        cell.isFlagged = false;
      } else {
        if (state.usedFlag < state.boardSettings.mines) {
          state.usedFlag += 1;
          cell.isFlagged = true;
        }
      }

      if (checkGameVictory(state.board)) {
        state.end = "victory";
      }
    },

    startGame: (state, action) => {
      const { x, y } = action.payload;

      if (!state.start) {
        state.start = true;

        state.board = initializeBoard(state, x, y);
      }

      openCells(state, x, y);
    },

    clickCell: (state, action) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];

      if (cell.isFlagged || cell.isOpen) {
        return;
      }

      if (cell.isMine) {
        cell.isOpen = true;
        state.end = "defeat";
        return;
      }

      openCells(state, x, y);

      if (checkGameVictory(state.board)) {
        state.end = "victory";
      }
    },

    areaOpen: (state, action) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];

      const neighboringFlags = countFlags(state, x, y);

      const neighbors = getNeighborCoords(x, y);

      if (neighboringFlags !== cell.neighboringMines) {
        return;
      }

      neighbors.forEach(([newX, newY]) => {
        if (
          newX >= 0 &&
          newX < state.boardSettings.width &&
          newY >= 0 &&
          newY < state.boardSettings.height
        ) {
          const neighboringCell = state.board[newY][newX];

          if (neighboringCell.isMine && !neighboringCell.isFlagged) {
            state.end = "defeat";
            return;
          } else if (!neighboringCell.isFlagged && !neighboringCell.isOpen) {
            openCells(state, newX, newY);
          }
        }
      });

      if (checkGameVictory(state.board)) {
        state.end = "victory";
      }
    },
  },
});

export const {
  setDifficulty,
  increaseTimer,
  resetGame,
  clickFlag,
  clickCell,
  startGame,
  areaOpen,
} = mineSweeperSlice.actions;

export default mineSweeperSlice.reducer;
