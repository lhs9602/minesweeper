import { CellState } from "../data/type/type";

export const checkGameVictory = (board: CellState[][]) => {
  const flattenedBoard = board.flat();
  const safeCell = flattenedBoard.filter(
    (cell) => !cell.isMine && !cell.isOpen
  );

  if (safeCell.length === 0) {
    return true;
  }

  return false;
};
