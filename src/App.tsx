import { useCallback, useEffect, useMemo } from "react";
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
import { SnackBarProps } from "./utils/types/SnackBarTypes";
import { setSWRegistrationAction } from "./actions/ServiceWorker/";
import { setSnackBarAction } from "./actions/Snackbar";

function App(props) {
  const { setSWRegistration, setSnackBar, snackBar, swRegistration } = props;

  useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register({
      onSuccess: (registration: ServiceWorkerProps) => {
        setSWRegistration(registration);
      },
      onUpdate: async (registration: ServiceWorkerProps) => {
        try {
          console.log("onUpdate", registration);
          await setSWRegistration(registration);
          await setSnackBar({
            message: "There is a New Version Available",
            type: "info",
            open: true,
            yesLabel: "Update",
          });
        } catch (error) {
          return error;
        }
      },
    });
  }, [setSWRegistration, setSnackBar]);

  const handleOnYes = useCallback(async () => {
    try {
      await setSnackBar({
        message: "",
        type: "",
        open: false,
        yesLabel: "",
      });
      await swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  }, [setSnackBar]);

  const SnackBarRx = useMemo(() => {
    if (!!snackBar && snackBar.open) {
      return (
        <SnackBar
          open={snackBar.open}
          message={snackBar.message}
          position="top-center"
          type={snackBar.type}
          yesLabel={snackBar.yesLabel}
          onYes={handleOnYes}
          closeOnClick={snackBar.closeOnClick}
        />
      );
    }
  }, [handleOnYes, snackBar]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {SnackBarRx}
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

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  setSWRegistration: (registration: ServiceWorkerProps) =>
    dispatch(setSWRegistrationAction(registration)),
  setSnackBar: (snackbar: SnackBarProps) =>
    dispatch(setSnackBarAction(snackbar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
