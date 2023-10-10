import { GameState, CellState } from "../data/type/type";

export const initializeBoard = (
  state: GameState,
  x: number,
  y: number
): CellState[][] => {
  const minesPositions: { x: number; y: number }[] = [];

  while (minesPositions.length < state.boardSettings.mines) {
    const mineX = Math.floor(Math.random() * state.boardSettings.width);
    const mineY = Math.floor(Math.random() * state.boardSettings.height);
    if (
      (mineX !== x || mineY !== y) &&
      !minesPositions.some((pos) => pos.x === mineX && pos.y === mineY)
    ) {
      minesPositions.push({ x: mineX, y: mineY });
    }
  }

  const newBoard: CellState[][] = [];
  for (let i = 0; i < state.boardSettings.height; i++) {
    newBoard[i] = [];
    for (let j = 0; j < state.boardSettings.width; j++) {
      const isMine = !!minesPositions.find((pos) => pos.x === j && pos.y === i);
      const neighboringMines = getNeighboringMines(
        j,
        i,
        minesPositions,
        state.boardSettings.width,
        state.boardSettings.height
      );
      newBoard[i][j] = {
        isMine,
        isOpen: false,
        isFlagged: false,
        isQuestioned: false,
        neighboringMines,
      };
    }
  }

  return newBoard;
};
function getNeighboringMines(
  x: number,
  y: number,
  mines: { x: number; y: number }[],
  width: number,
  height: number
): number {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newX = x + j;
      const newY = y + i;
      if (
        newX >= 0 &&
        newX < width &&
        newY >= 0 &&
        newY < height &&
        mines.some((pos) => pos.x === newX && pos.y === newY)
      ) {
        count++;
      }
    }
  }
  return count;
}
