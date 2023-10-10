import { GameState } from "../data/type/type";

export const openCells = (state: GameState, x: number, y: number) => {
  const cell = state.board[y][x];

  if (cell.isOpen || cell.isFlagged || cell.isMine) {
    return;
  }

  cell.isOpen = true;

  if (cell.neighboringMines === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + j;
        const newY = y + i;
        if (
          newX >= 0 &&
          newX < state.boardSettings.width &&
          newY >= 0 &&
          newY < state.boardSettings.height
        ) {
          openCells(state, newX, newY);
        }
      }
    }
  }
};
