import { GameContainer, GameWrapper } from "./App.styled";
import { Board } from "./component/board/Board";
import { Header } from "./component/header/Header";
import { Option } from "./component/option/Option";

function App() {
  return (
    <GameWrapper>
      <GameContainer>
        <Option />
        <Header />
        <Board />
      </GameContainer>
    </GameWrapper>
  );
}

export default App;
