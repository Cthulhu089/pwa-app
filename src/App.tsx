import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import SnackBar from "my-react-snackbar";
import "antd/dist/antd.css";
import Home from "./views/Home";
import PokeDex from "./views/PokeDex";
import theme from "./theme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ServiceWorkerProps } from "./utils/types/serviceWorker";
import { setSWRegistration } from "./actions/ServiceWorker/";

function App(props) {
  const { SWRegistration } = props;
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [registration, setRegistration] = useState<ServiceWorkerProps>();

  useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register({
      onSuccess: (registration: ServiceWorkerProps) => {
        SWRegistration(registration);
      },
      onUpdate: (registration: ServiceWorkerProps) => {
        try {
          SWRegistration(registration);
          setRegistration(registration);
          setShowSnackbar(true);
        } catch (error) {
          return error;
        }
      },
    });
  }, [SWRegistration]);

  const handleOnYes = useCallback(async () => {
    if (!!registration && !!registration.waiting) {
      await registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
      setShowSnackbar(false);
    }
  }, [registration]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackBar
          open={showSnackbar}
          message={"There is a New Version Available"}
          position="top-center"
          type="info"
          yesLabel="Update"
          onYes={handleOnYes}
          closeOnClick={false}
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

const mapDispatchToProps = (dispatch) => ({
  SWRegistration: (registration: ServiceWorkerProps) =>
    dispatch(setSWRegistration(registration)),
});

export default connect(null, mapDispatchToProps)(App);
