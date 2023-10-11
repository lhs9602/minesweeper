import { styled } from "styled-components";
import { BlockColor } from "../../style/BlockColor";

export const CountContainer = styled.div`
  ${BlockColor}
  position: relative;
  background-color: #000;
  height: 2.6rem;
  box-sizing: border-box;
`;
export const CountBackground = styled.div`
  opacity: 0.3;
  color: red;
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: -0.1rem;
  box-sizing: border-box;
  padding: 0.1rem;
`;

export const Count = styled(CountBackground)`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1;
`;
