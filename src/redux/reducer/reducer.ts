import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DifficultyProps, GameState, SettingProps } from "../../data/type/type";
import { initializeBoard } from "../../utill/initializeBoard";
import { openCells } from "../../utill/openCells";
import { countFlags } from "../../utill/countFlags";

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
        cell.isFlagged = false;
      } else {
        if (state.usedFlag < state.boardSettings.mines) {
          state.usedFlag += 1;
          cell.isFlagged = true;
        }
      }
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

    areaOpen: (state, action) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];
      const neighboringFlags = countFlags(state, x, y);
      const neighbors = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      if (
        cell.isOpen ||
        cell.isFlagged ||
        neighboringFlags !== cell.neighboringMines
      ) {
        return;
      }

      neighbors.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;

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
    },
  },
});

export const {
  setDifficulty,
  increaseTimer,
  resetGame,
  clickFlag,
  clickCell,
  areaOpen,
} = mineSweeperSlice.actions;

export default mineSweeperSlice.reducer;
