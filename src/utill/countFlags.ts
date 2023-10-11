import { GameState } from "../data/type/type";

export const countFlags = (state: GameState, x: number, y: number): number => {
  let flagCount = 0;
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
        if (state.board[newY][newX].isFlagged) {
          flagCount++;
        }
      }
    }
  }
  return flagCount;
};
