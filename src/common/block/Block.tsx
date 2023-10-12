import { useSelector } from "react-redux";
import { GameState } from "../../data/type/type";
import { Cell, OpenCell, Icon } from "./Block.styled";
import { useDispatch } from "react-redux";
import { areaOpen, clickCell, clickFlag } from "../../redux/reducer/reducer";
import { ICONS } from "../../data/type/urls";
import { OpenMineIcon } from "../openMineIcon/OpenMineIcon";

export const Block = ({ x, y }: { x: number; y: number }) => {
  const gameStateEnd = useSelector((state: GameState) => state.end);
  const block = useSelector((state: GameState) => state.board[y][x]);
  const dispatch = useDispatch();

  // 깃발을 추가,제거
  const handleFlagClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!gameStateEnd) dispatch(clickFlag({ y, x }));
  };

  // 셀을 클릭하여 오픈
  const handleCellClick = () => {
    if (!gameStateEnd) dispatch(clickCell({ y, x }));
  };

  // areaOpen 사용
  const handleAreaOpen = () => {
    if (!gameStateEnd) dispatch(areaOpen({ y, x }));
  };

  return (
    <>
      {
        // 게임이 패배 상태이고, 해당 블록이 지뢰일 경우. 지뢰들을 모두 오픈한다
        gameStateEnd === "defeat" && block.isMine ? (
          <OpenMineIcon block={block} />
        ) : // 해당 블록에 깃발이 있는 경우
        block.isFlagged ? (
          <Cell onClick={handleCellClick} onContextMenu={handleFlagClick}>
            <Icon src={ICONS.flagged} />
          </Cell>
        ) : // 해당 블록이 열렸을 경우
        block.isOpen ? (
          //  열린 블록 주변에 지뢰가 있을 경우
          block.neighboringMines > 0 ? (
            <OpenCell onClick={handleAreaOpen}>
              {block.neighboringMines}
            </OpenCell>
          ) : (
            // 열린 블록 주변에 지뢰가 없을 경우
            <OpenCell />
          )
        ) : (
          // 기본 상태의 블럭
          <Cell onClick={handleCellClick} onContextMenu={handleFlagClick} />
        )
      }
    </>
  );
};
