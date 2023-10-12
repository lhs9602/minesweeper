import { GameState, CellState } from "../data/type/type";

// minesPositions 배열에 지뢰의 위치를 무작위로 추가하는 함수
export const initializeBoard = (
  state: GameState,
  x: number,
  y: number
): CellState[][] => {
  const minesPositions: { x: number; y: number }[] = [];

  // 지정된 수의 지뢰가 배열에 추가될 때까지 반복
  while (minesPositions.length < state.boardSettings.mines) {
    const mineX = Math.floor(Math.random() * state.boardSettings.width);
    const mineY = Math.floor(Math.random() * state.boardSettings.height);

    //지뢰는 기존에 이미 있거나, 처음 클릭한 지점을 제외하고 추가
    if (
      (mineX !== x || mineY !== y) &&
      !minesPositions.some((pos) => pos.x === mineX && pos.y === mineY)
    ) {
      minesPositions.push({ x: mineX, y: mineY });
    }
  }

  // 새로운 게임 보드를 생성하고 초기화
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
      // 각 셀의 상태를 설정 (지뢰 여부, 열림 여부, 플래그 여부, 주변 지뢰 수)
      newBoard[i][j] = {
        isMine,
        isOpen: false,
        isFlagged: false,
        neighboringMines,
      };
    }
  }

  return newBoard;
};

// 현재 셀 주변의 지뢰 수를 반환하는 함수
function getNeighboringMines(
  x: number,
  y: number,
  mines: { x: number; y: number }[],
  width: number,
  height: number
): number {
  let count = 0;
  // 현재 셀의 주변 셀을 검사
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // 현재 셀은 건너뜀
      if (i === 0 && j === 0) continue;
      const newX = x + j;
      const newY = y + i;
      // 새 위치가 보드 내에 있고, 그 위치에 지뢰가 있는 경우 카운트 증가
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
