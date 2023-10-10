export interface GameState {
  board: CellState[][];
  difficulty: "Beginner" | "Intermediate" | "Expert" | "Custom";
  boardSettings: { width: number; height: number; mines: number };
  timer: number;
  start: boolean;
  end: string;
  usedFlag: number;
}

export interface CellState {
  isMine: boolean;
  neighboringMines: number;
  isOpen: boolean;
  isFlagged: boolean;
  isQuestioned: boolean;
}
export type PersistedState = {
  difficulty: "Beginner" | "Intermediate" | "Expert" | "Custom";
  boardSettings: {
    width: number;
    height: number;
    mines: number;
  };
};
