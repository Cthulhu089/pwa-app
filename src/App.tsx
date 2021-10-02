import { useCallback, useEffect, useState } from "react";
import Home from "./views/Home";
import SnackBar from "my-react-snackbar";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function App() {
  const [showSnackBar, setShowSnackbar] = useState<boolean>(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();

  const onSuccess = useCallback(() => {}, []);
  const onUpdate = useCallback((registration: ServiceWorkerRegistration) => {
    if (!!registration && !!registration.waiting) {
      setShowSnackbar(true);
      setRegistration(registration);
    }
  }, []);

  const handleOnUpdate = useCallback(async () => {
    if (!!registration && !!registration.waiting) {
      await registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  }, [registration]);

  useEffect(() => {
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register({
      onSuccess,
      onUpdate,
    });
  }, []);

  return (
    <>
      <SnackBar
        open={showSnackBar}
        closeOnClick={false}
        message={"New version available"}
        position="bottom-center"
        type="info"
        yesLabel="Update"
        onYes={handleOnUpdate}
      />
      <Home />
    </>
  );
}

export default App;
