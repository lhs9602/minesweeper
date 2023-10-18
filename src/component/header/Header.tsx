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

  const MinesCount = mines - usedFlag;

  useEffect(() => {
    let intervalId: number | undefined;

    if (start && !(end === "defeat" || end === "victory")) {
      intervalId = setInterval(() => {
        dispatch(increaseTimer());
      }, 1000);
    }

    if (end === "victory") {
      setOpen(true);
    }

    return () => clearInterval(intervalId);
  }, [dispatch, start, end]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <HeaderContainer>
      <MinesCountWrapper>
        <Counter count={MinesCount} />
      </MinesCountWrapper>
      <RestButtonWrapper>
        <ResetButton />
      </RestButtonWrapper>
      <GameTimerWrapper>
        <Counter count={timer} />
      </GameTimerWrapper>

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
