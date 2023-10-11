export interface GameState {
  board: CellState[][];
  difficulty: string;
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
  difficulty: string;
  boardSettings: {
    width: number;
    height: number;
    mines: number;
  };
};
export interface DifficultyProps {
  difficulty: string;
  setting?: SettingProps;
}
export interface SettingProps {
  width: number;
  height: number;
  mines: number;
}
