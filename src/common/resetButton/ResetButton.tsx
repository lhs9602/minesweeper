import { useDispatch } from "react-redux";
import { ResetBtn } from "./ResetButton.styled";
import { resetGame } from "../../redux/reducer/reducer";
import { GameState } from "../../data/type/type";
import { useSelector } from "react-redux";

//리셋 컴포넌트
export const ResetButton = () => {
  const gameStateEnd = useSelector((state: GameState) => state.end);

  const dispatch = useDispatch();

  //클릭시 게임 리셋
  const handleReset = () => {
    dispatch(resetGame());
  };
  return (
    <ResetBtn onClick={handleReset}>
      <img
        src={
          // 패배 여부에 따라서 버튼 이미지 변경
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
