import { GameState } from "../data/type/type";

export const openCells = (state: GameState, x: number, y: number) => {
  const cell = state.board[y][x];

  if (cell.isOpen || cell.isFlagged || cell.isMine) {
    return;
  }

  cell.isOpen = true;

  if (cell.neighboringMines === 0) {
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

    neighbors.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;

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
