import { CellState } from "../../data/type/type";
import { ICONS } from "../../data/type/urls";
import { Icon } from "../block/Block.styled";

export const OpenCellIcon = ({ block }: { block: CellState }) => {
  if (block.isFlagged) {
    return <Icon src={ICONS.misflagged} />;
  }
  if (block.isOpen) {
    return <Icon src={ICONS.death} />;
  }
  return <Icon src={ICONS.revealed} />;
};
