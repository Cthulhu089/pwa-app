import { useCallback, useEffect, useMemo, useState } from "react";
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
import { setSnackBarAction } from "./actions/Snackbar";
import { requestPermissions } from "./utils/Notifications";
import { getRegistration } from "./utils/SW";

function App(props) {
  const { setSnackBar, snackBar } = props;
  const [registration, setRegistration] = useState<
    ServiceWorkerProps & ServiceWorkerRegistration
  >();
  const [sw, setSw] = useState<any>();
  const handleRegistration = useCallback(async () => {
    const sw: any = await getRegistration();
    setSw(sw);
  }, []);

  useEffect(() => {
    handleRegistration();
  }, [handleRegistration]);

  useEffect(() => {
    try {
      // If you want your app to work offline and load faster, you can change
      // unregister() to register() below. Note this comes with some pitfalls.
      // Learn more about service workers: https://cra.link/PWA
      serviceWorkerRegistration.register({
        onSuccess: (registration) => {
          setRegistration(registration);
        },
        onUpdate: async (registration) => {
          try {
            await setRegistration(registration);
            setSnackBar({
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
    } catch (error) {}
  }, [setSnackBar]);

  useEffect(() => {
    //Notification Request

    if (Notification.permission !== "granted") {
      setSnackBar({
        message: "Allow Notification",
        type: "info",
        open: true,
        yesLabel: "Allow",
        handleOnYes: () => {
          requestPermissions((result) => {
            if (result !== "granted") {
            } else {
              window.location.reload();
            }
          });
        },
      });
    }
  }, [sw, setSnackBar]);

  const handleOnYes = useCallback(async () => {
    try {
      await setSnackBar({
        message: "",
        type: "",
        open: false,
        yesLabel: "",
      });
      if (!!registration && !!registration.waiting) {
        await registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
      }
    } catch (error) {
      await setSnackBar({
        message: "Error on service worker registration",
        type: "error",
        open: true,
        yesLabel: "close",
      });
    }
  }, [registration, setSnackBar]);

  const SnackBarRx = useMemo(() => {
    if (!!snackBar && snackBar.open) {
      return (
        <SnackBar
          open={snackBar.open}
          message={snackBar.message}
          position="top-center"
          type={snackBar.type}
          yesLabel={snackBar.yesLabel}
          onYes={!!snackBar.handleOnYes ? snackBar.handleOnYes : handleOnYes}
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
  setSnackBar: (snackbar: SnackBarProps) =>
    dispatch(setSnackBarAction(snackbar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
