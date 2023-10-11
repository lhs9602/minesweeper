import { styled } from "styled-components";
import { BlockColor } from "../../style/BlockColor";

export const ResetBtn = styled.button`
  ${BlockColor}
  border-width: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 2.6rem;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
  }
  &:active {
    top: 2px;
    background-color: #2980b9;
    opacity: 0.8;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3);
  }
`;
