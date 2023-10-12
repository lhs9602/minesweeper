import { CellState } from "../data/type/type";

// 게임 승리 상태를 체크하는 함수
export const checkGameVictory = (board: CellState[][]) => {
  const flattenedBoard = board.flat();
  const safeCell = flattenedBoard.filter(
    (cell) => !cell.isMine && !cell.isOpen
  );

  // 안전한 셀이 없으면 승리 상태로 변경합니다.
  if (safeCell.length === 0) {
    return true; // 승리 상태를 나타내는 true를 반환합니다.
  }

  return false; // 아직 승리 상태가 아니므로 false를 반환합니다.
};
