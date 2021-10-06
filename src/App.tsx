import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import SnackBar from "my-react-snackbar";
import "antd/dist/antd.css";
import Home from "./views/Home";
import PokeDex from "./views/PokeDex";
import theme from "./theme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register({
      onSuccess: () => {
        console.log("-------------Success------------");
      },
      onUpdate: () => {
        console.log("-------------Update------------");
        setShowSnackbar(true);
      },
    });
  }, []);

  const handleOnYes = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackBar
          open={showSnackbar}
          message={"There is a New Version Available"}
          position="bottom-top"
          type="info"
          yesLabel="Update"
          onYes={handleOnYes}
        />
        <SnackBar />
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
