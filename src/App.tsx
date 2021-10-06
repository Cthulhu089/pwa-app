import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import Home from "./views/Home";
import PokeDex from "./views/PokeDex";
import theme from "./theme";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/pokedex">
            <PokeDex />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
