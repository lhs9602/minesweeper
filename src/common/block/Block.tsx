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

  const handleFlagClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!gameStateEnd) dispatch(clickFlag({ y, x }));
  };

  const handleCellClick = () => {
    if (!gameStateEnd) dispatch(clickCell({ y, x }));
  };

  const handleAreaOpen = () => {
    if (!gameStateEnd) dispatch(areaOpen({ y, x }));
  };

  return (
    <>
      {gameStateEnd === "defeat" && block.isMine ? (
        <OpenMineIcon block={block} />
      ) : block.isFlagged ? (
        <Cell onClick={handleCellClick} onContextMenu={handleFlagClick}>
          <Icon src={ICONS.flagged} />
        </Cell>
      ) : block.isOpen ? (
        block.neighboringMines > 0 ? (
          <OpenCell onClick={handleAreaOpen}>{block.neighboringMines}</OpenCell>
        ) : (
          <OpenCell />
        )
      ) : (
        <Cell onClick={handleCellClick} onContextMenu={handleFlagClick} />
      )}
    </>
  );
};
