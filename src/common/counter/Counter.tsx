import { Count, CountBackground, CountContainer } from "./Counter.styled";

export const Counter = ({ count }: { count: number }) => {
  return (
    <CountContainer>
      <CountBackground>888</CountBackground>
      <Count>{count}</Count>
    </CountContainer>
  );
};
