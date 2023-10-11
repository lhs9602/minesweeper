import styled from "styled-components";
import { BlockContainerColor } from "../../style/BlockColor";

export const BoardContainer = styled.div`
  ${BlockContainerColor}

  box-sizing: border-box;
  overflow: scroll;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  .scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scroll::-webkit-scrollbar {
    display: none;
  }
  overflow: hidden;
`;

export const BlockContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex: 1;
`;
