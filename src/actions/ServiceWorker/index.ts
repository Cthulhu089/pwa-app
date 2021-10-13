import { ServiceWorkerProps } from "../../utils/types/serviceWorker";

export const setSWRegistration =
  (registration: ServiceWorkerProps) => async (dispatch) => {
    await dispatch({
      type: "SET_REGISTRATION",
      payload: registration,
    });
  };
