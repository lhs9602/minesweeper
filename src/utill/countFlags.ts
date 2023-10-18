import { GameState } from "../data/type/type";

export const getNeighborCoords = (x: number, y: number) => {
  const neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      neighbors.push([x + j, y + i]);
    }
  }
  return neighbors;
};

export const countFlags = (state: GameState, x: number, y: number): number => {
  let flagCount = 0;
  const neighbors = getNeighborCoords(x, y);

  neighbors.forEach(([newX, newY]) => {
    if (
      newX >= 0 &&
      newX < state.boardSettings.width &&
      newY >= 0 &&
      newY < state.boardSettings.height &&
      state.board[newY][newX].isFlagged
    ) {
      flagCount++;
    }
  });

  return flagCount;
};
