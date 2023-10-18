import { useDispatch } from "react-redux";
import { ResetBtn } from "./ResetButton.styled";
import { resetGame } from "../../redux/reducer/reducer";
import { GameState } from "../../data/type/type";
import { useSelector } from "react-redux";

export const ResetButton = () => {
  const gameStateEnd = useSelector((state: GameState) => state.end);

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetGame());
  };
  return (
    <ResetBtn onClick={handleReset}>
      <img
        src={
          gameStateEnd === "defeat"
            ? "https://freeminesweeper.org/images/facedead.gif"
            : "https://freeminesweeper.org/images/facesmile.gif"
        }
        alt="smilieFace"
        width="100%"
        height="100%"
      />
    </ResetBtn>
  );
};
