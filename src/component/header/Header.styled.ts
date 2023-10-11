import styled from "styled-components";
import { BlockContainerColor } from "../../style/BlockColor";

export const HeaderContainer = styled.div`
  ${BlockContainerColor}
  padding: 0.2rem;
  display: flex;
  width: 400px;
`;
export const MinesCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  overflow: hidden;
`;

export const RestButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const GameTimerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  overflow: hidden;
`;
