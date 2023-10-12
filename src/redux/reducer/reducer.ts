import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DifficultyProps, GameState, SettingProps } from "../../data/type/type";
import { initializeBoard } from "../../utill/initializeBoard";
import { openCells } from "../../utill/openCells";
import { countFlags, getNeighborCoords } from "../../utill/countFlags";
import { checkGameVictory } from "../../utill/checkGameVictory";

//초기 상태
export const initialState: GameState = {
  board: [],
  difficulty: "Beginner",
  boardSettings: { width: 8, height: 8, mines: 10 },
  timer: 0,
  start: false,
  end: "",
  usedFlag: 0,
};

const mineSweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    //난이도 세팅
    setDifficulty: (state, action: PayloadAction<DifficultyProps>) => {
      //난이도 저장
      state.difficulty = action.payload.difficulty;

      //난이도별로 크기와 지뢰 설정
      if (action.payload.difficulty === "Beginner") {
        state.boardSettings = { width: 8, height: 8, mines: 10 };
      } else if (action.payload.difficulty === "Intermediate") {
        state.boardSettings = { width: 16, height: 16, mines: 40 };
      } else if (action.payload.difficulty === "Expert") {
        state.boardSettings = { width: 32, height: 16, mines: 100 };
      }
      //Custom은 입력받아서  크기와 지뢰 설정
      else if (action.payload.difficulty === "Custom") {
        state.boardSettings = action.payload.setting as SettingProps;
      }
      //기존 상태를 지우고 초기화
      state.board = [];
      state.timer = 0;
      state.start = false;
      state.end = "";
      state.usedFlag = 0;
    },
    //타이머
    increaseTimer: (state) => {
      //타이머가 999이상이면 중단
      if (state.timer >= 999) {
        return;
      }
      //1초에 1증가
      state.timer += 1;
    },
    //게임 리셋
    resetGame: (state) => {
      state.board = [];
      state.timer = 0;
      state.start = false;
      state.end = "";
      state.usedFlag = 0;
    },
    //깃발 추가
    clickFlag: (state, action) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];

      // 셀이 이미 깃발로 표시되어 있는 경우
      if (cell.isFlagged) {
        // 사용된 깃발 수 감소
        // 셀의 깃발 상태 변경
        state.usedFlag -= 1;
        cell.isFlagged = false;
      } else {
        // 사용된 깃발의 수가 지뢰의 수보다 적은 경우에만 깃발 추가
        if (state.usedFlag < state.boardSettings.mines) {
          // 사용된 깃발 수 증가
          // 셀의 깃발 상태 변경
          state.usedFlag += 1;
          cell.isFlagged = true;
        }
      }

      // 승리 조건 확인
      if (checkGameVictory(state.board)) {
        state.end = "victory";
      }
    },
    //게임시작
    startGame: (state, action) => {
      const { x, y } = action.payload;

      // 게임이 아직 시작되지 않았다면 게임을 시작합니다.
      if (!state.start) {
        state.start = true;
        // 게임 보드 초기화
        state.board = initializeBoard(state, x, y);
      }

      // 선택된 셀과 그 주변 셀을 엽니다.
      openCells(state, x, y);
    },
    //셀 클릭
    clickCell: (state, action) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];

      // 셀이 이미 깃발로 표시되어 있거나 열려있는 경우, 아무런 동작도 실행하지 않습니다.
      if (cell.isFlagged || cell.isOpen) {
        return;
      }

      // 셀에 지뢰가 있는 경우
      if (cell.isMine) {
        // 셀을 열고, 패배 상태로 변경합니다.
        cell.isOpen = true;
        state.end = "defeat";
        return;
      }

      // 셀과 그 주변 셀을 엽니다.
      openCells(state, x, y);

      // 승리 조건 확인
      if (checkGameVictory(state.board)) {
        state.end = "victory";
      }
    },
    //숫자 칸 클릭시 발생하는 areaOpen
    areaOpen: (state, action) => {
      const { x, y } = action.payload;
      const cell = state.board[y][x];

      // 선택된 셀 주변의 깃발의 수를 세기
      const neighboringFlags = countFlags(state, x, y);

      // 선택된 셀 주변의 셀 좌표
      const neighbors = getNeighborCoords(x, y);

      // 선택된 셀 주변의 깃발의 수가 해당 셀의 주변 지뢰 수와 같지 않다면, 중지
      if (neighboringFlags !== cell.neighboringMines) {
        return;
      }

      // 선택된 셀의 주변 셀을 검사
      neighbors.forEach(([newX, newY]) => {
        // 셀이 게임 보드 내에 있는지 확인
        if (
          newX >= 0 &&
          newX < state.boardSettings.width &&
          newY >= 0 &&
          newY < state.boardSettings.height
        ) {
          const neighboringCell = state.board[newY][newX];

          // 주변 셀에 지뢰가 있고, 깃발이 없다면 패배
          if (neighboringCell.isMine && !neighboringCell.isFlagged) {
            state.end = "defeat";
            return;
          }
          // 셀이 깃발로 표시되어 있지 않고, 열리지 않았다면 셀을 연다
          else if (!neighboringCell.isFlagged && !neighboringCell.isOpen) {
            openCells(state, newX, newY);
          }
        }
      });

      // 승리 조건 확인
      if (checkGameVictory(state.board)) {
        state.end = "victory";
      }
    },
  },
});

export const {
  setDifficulty,
  increaseTimer,
  resetGame,
  clickFlag,
  clickCell,
  startGame,
  areaOpen,
} = mineSweeperSlice.actions;

export default mineSweeperSlice.reducer;
