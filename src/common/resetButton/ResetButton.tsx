import { useDispatch } from "react-redux";
import { ResetBtn } from "./ResetButton.styled";
import { resetGame } from "../../redux/reducer/reducer";

export const ResetButton = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetGame());
  };
  return (
    <ResetBtn onClick={handleReset}>
      <img
        src="https://freeminesweeper.org/images/facesmile.gif"
        alt="smilieFace"
        width="100%"
        height="100%"
      />
    </ResetBtn>
  );
};
