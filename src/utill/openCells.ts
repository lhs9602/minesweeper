import { GameState } from "../data/type/type";
import { getNeighborCoords } from "./countFlags";

export const openCells = (state: GameState, x: number, y: number) => {
  const cell = state.board[y][x];

  if (cell.isOpen || cell.isFlagged || cell.isMine) {
    return;
  }

  cell.isOpen = true;

  if (cell.neighboringMines === 0) {
    getNeighborCoords(x, y).forEach(([newX, newY]) => {
      if (
        newX >= 0 &&
        newX < state.boardSettings.width &&
        newY >= 0 &&
        newY < state.boardSettings.height
      ) {
        openCells(state, newX, newY);
      }
    });
  }
};
