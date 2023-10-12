import { GameState } from "../data/type/type";
import { getNeighborCoords } from "./countFlags";

// 지정된 셀과 그 주변의 셀을 열기 위한 함수
export const openCells = (state: GameState, x: number, y: number) => {
  const cell = state.board[y][x];

  // 셀이 이미 열려 있거나 깃발이 있다거나 셀이 지뢰를 포함하고 있다면 함수를 종료
  if (cell.isOpen || cell.isFlagged || cell.isMine) {
    return;
  }

  // 지정된 셀을 오픈
  cell.isOpen = true;

  // 만약 셀 주변에 지뢰가 없다면
  if (cell.neighboringMines === 0) {
    // getNeighborCoords 함수를 사용하여 주변 셀의 좌표를 가져옴
    getNeighborCoords(x, y).forEach(([newX, newY]) => {
      // 해당 좌표가 게임 보드의 경계 내에 있고 해당 셀이 열려 있지 않다면
      if (
        newX >= 0 &&
        newX < state.boardSettings.width &&
        newY >= 0 &&
        newY < state.boardSettings.height
      ) {
        // 해당 좌표로 openCells 함수를 재귀적으로 호출
        openCells(state, newX, newY);
      }
    });
  }
};
