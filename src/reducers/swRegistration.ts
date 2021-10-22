import { ServiceWorkerProps } from "../utils/types/serviceWorker";

type ActionProps = {
  type: "SET_REGISTRATION" | "CLEAR_REGISTRATION";
  payload?: ServiceWorkerProps;
};

const initialState = {
  id: "1",
};

//TODO error is on the default value of the state
export const swRegistrationReducer = (
  state: ServiceWorkerProps | {} = initialState,
  action: ActionProps
) => {
  switch (action.type) {
    case "SET_REGISTRATION":
      return action.payload;
    case "CLEAR_REGISTRATION":
      return {};
    default:
      return state;
  }
};
