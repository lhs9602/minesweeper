import { GameContainer, GameWrapper } from "./App.styled";
import { Header } from "./component/header/Header";
import { Option } from "./component/option/Option";

function App() {
  return (
    <GameWrapper>
      <GameContainer>
        <Option />
        <Header />
      </GameContainer>
    </GameWrapper>
  );
}

export default App;
