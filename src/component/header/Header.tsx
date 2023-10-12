import { useEffect, useState } from "react";
import { Counter } from "../../common/counter/Counter";
import { ResetButton } from "../../common/resetButton/ResetButton";
import {
  HeaderContainer,
  MinesCountWrapper,
  RestButtonWrapper,
  GameTimerWrapper,
} from "./Header.styled";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GameState } from "../../data/type/type";
import { increaseTimer } from "../../redux/reducer/reducer";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const Header = () => {
  // useSelector의 두 번째 인자로 shallowEqual을 사용하여,
  // 객체 내부의 일부 값이 변경될 때만 컴포넌트를 리렌더링하도록 최적화합니다.
  const { mines, usedFlag, start, timer, end } = useSelector(
    (state: GameState) => ({
      mines: state.boardSettings.mines,
      usedFlag: state.usedFlag,
      start: state.start,
      timer: state.timer,
      end: state.end,
    }),
    shallowEqual
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // 남은 깃발의 수를 계산합니다.
  const MinesCount = mines - usedFlag;

  useEffect(() => {
    let intervalId: number | undefined;

    // 게임이 시작되고, 패배하거나 승리하지 않은 경우 타이머를 실행합니다.
    if (start && !(end === "defeat" || end === "victory")) {
      intervalId = setInterval(() => {
        dispatch(increaseTimer());
      }, 1000);
    }

    // 승리한 경우 승리 다이얼로그를 표시합니다.
    if (end === "victory") {
      setOpen(true);
    }

    // 컴포넌트가 언마운트되거나 업데이트될 때 타이머를 정리합니다.
    return () => clearInterval(intervalId);
  }, [dispatch, start, end]);

  // 승리창을 닫습니다.
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <HeaderContainer>
      <MinesCountWrapper>
        {/* 남은 깃발 수 */}
        <Counter count={MinesCount} />
      </MinesCountWrapper>
      <RestButtonWrapper>
        {/* 리셋 버튼 */}
        <ResetButton />
      </RestButtonWrapper>
      <GameTimerWrapper>
        {/* 경과 시간 */}
        <Counter count={timer} />
      </GameTimerWrapper>

      {/* 승리창을 표시합니다. */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"승리!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            축하합니다. 모든 지뢰를 찾아내셨습니다.
          </DialogContentText>
          <DialogContentText>더 높은난이도에 도전해세요!</DialogContentText>
        </DialogContent>
      </Dialog>
    </HeaderContainer>
  );
};
