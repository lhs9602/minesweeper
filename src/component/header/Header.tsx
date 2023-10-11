import { useEffect } from "react";
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

export const Header = () => {
  const { mines, usedFlag, start, timer } = useSelector(
    (state: GameState) => ({
      mines: state.boardSettings.mines,
      usedFlag: state.usedFlag,
      start: state.start,
      timer: state.timer,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const MinesCount = mines - usedFlag;
  useEffect(() => {
    let intervalId: number | undefined;

    if (start) {
      intervalId = setInterval(() => {
        dispatch(increaseTimer());
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [dispatch, start]);

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
    </HeaderContainer>
  );
};
