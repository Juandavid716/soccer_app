import Header from "./components/Header";
import Player from "./components/Player";

function App() {
  return (
    <div className=" main-container">
      <Header />
      <div className="row">
        <Player />
      </div>
    </div>
  );
}

export default App;
