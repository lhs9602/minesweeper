import { CellState } from "../../data/type/type";
import { ICONS } from "../../data/type/urls";
import { Icon } from "../block/Block.styled";

//오픈된 지뢰의 아이콘 설정
export const OpenMineIcon = ({ block }: { block: CellState }) => {
  if (block.isFlagged) {
    return <Icon src={ICONS.misflagged} />;
  }
  if (block.isOpen) {
    return <Icon src={ICONS.death} />;
  }
  return <Icon src={ICONS.revealed} />;
};
