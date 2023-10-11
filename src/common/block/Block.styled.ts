import styled from "styled-components";
import { BlockColor } from "../../style/BlockColor";

export const Cell = styled.a`
  ${BlockColor}
  border-radius: 0;
  box-sizing: border-box;
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  outline: none;

  &:active {
    top: 2px;
    opacity: 0.4;
  }
`;
export const Icon = styled.img`
  height: 23px;
  width: 23px;
`;
export const OpenCell = styled(Cell)`
  border-color: gray;
  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  border-left-width: 1px;

  &:active {
    opacity: 1;
  }
`;
