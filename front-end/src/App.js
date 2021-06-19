import Header from "./components/Header";
import Player from "./components/Player";
import Team from "./components/Team";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Player} />
        <Route exact path="/team" component={Team} />
      </Switch>
    </Router>
  );
}

export default App;
