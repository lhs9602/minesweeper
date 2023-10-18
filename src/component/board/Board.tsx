import { useDispatch, useSelector } from "react-redux";
import { BoardContainer, BlockContainer } from "./Board.styled";
import { GameState } from "../../data/type/type";
import { Block } from "../../common/block/Block";
import { Cell } from "../../common/block/Block.styled";
import { startGame } from "../../redux/reducer/reducer";

export const Board = () => {
  const dispatch = useDispatch();

  const { height, width } = useSelector(
    (state: GameState) => state.boardSettings
  );

  const gameStateStart = useSelector((state: GameState) => state.start);

  const handleStart = (y: number, x: number) => {
    dispatch(startGame({ y, x }));
  };
  return (
    <BoardContainer>
      {Array.from({ length: height }).map((_, y) => (
        <BlockContainer key={y}>
          {Array.from({ length: width }).map((_, x) =>
            gameStateStart ? (
              <Block key={`x: ${x}, y: ${y}`} x={x} y={y} />
            ) : (
              <Cell
                key={`x: ${x}, y: ${y}`}
                onClick={() => handleStart(y, x)}
              />
            )
          )}
        </BlockContainer>
      ))}
    </BoardContainer>
  );
};
