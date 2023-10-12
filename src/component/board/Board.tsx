import { useDispatch, useSelector } from "react-redux";
import { BoardContainer, BlockContainer } from "./Board.styled";
import { GameState } from "../../data/type/type";
import { Block } from "../../common/block/Block";
import { Cell } from "../../common/block/Block.styled";
import { startGame } from "../../redux/reducer/reducer";

//게임 보드
export const Board = () => {
  const dispatch = useDispatch();

  const { height, width } = useSelector(
    (state: GameState) => state.boardSettings
  );

  const gameStateStart = useSelector((state: GameState) => state.start);

  //게임 시작
  const handleStart = (y: number, x: number) => {
    //게임 시작 상태로 변경하고, 해당 좌표에는 지뢰가 추가 되지 않도록 좌표를 보냄
    dispatch(startGame({ y, x }));
  };
  return (
    <BoardContainer>
      {/* height, width에 따라 게임판 생성 */}
      {Array.from({ length: height }).map((_, y) => (
        <BlockContainer key={y}>
          {Array.from({ length: width }).map((_, x) =>
            // 게임 시작 여부에 따라 분기
            gameStateStart ? (
              //게임이 시작되면 지뢰존재하는 셀을 렌더링
              <Block key={`x: ${x}, y: ${y}`} x={x} y={y} />
            ) : (
              //게임이 시작에는 지뢰가 없는 셀을 렌더링
              //처음 클릭 시 게임이 시작되면 블럭의 상태 변경
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
