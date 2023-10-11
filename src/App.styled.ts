import styled from "styled-components";
import { BlockColor } from "./style/BlockColor";

export const GameContainer = styled.div`
  ${BlockColor}
  padding: 0.4rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const GameWrapper = styled.div``;
