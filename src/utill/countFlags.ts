import { GameState } from "../data/type/type";

// 자신의 이웃 셀의 좌표를 반환하는 함수
export const getNeighborCoords = (x: number, y: number) => {
  const neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      neighbors.push([x + j, y + i]);
    }
  }
  return neighbors;
};

// 자신 주변에 있는 깃발의 수를 카운트
export const countFlags = (state: GameState, x: number, y: number): number => {
  let flagCount = 0;
  const neighbors = getNeighborCoords(x, y);

  //자신 주변의 쉘을 탐색
  neighbors.forEach(([newX, newY]) => {
    //boardSettings을 넘어가거나 0이상이고
    //isFlagged가 true이면 카운트 증가
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
