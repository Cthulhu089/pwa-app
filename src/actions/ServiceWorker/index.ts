import { ServiceWorkerProps } from "../../utils/types/serviceWorker";

export const setSWRegistrationAction =
  (registration: ServiceWorkerProps) => async (dispatch) => {
    console.log("ActionRgis^^^^^^^^^^^^^^^^^^", registration);

    await dispatch({
      type: "SET_REGISTRATION",
      payload: registration,
    });
  };
