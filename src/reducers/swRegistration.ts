import { ServiceWorkerProps } from "../utils/types/serviceWorker";

type ActionProps = {
  type: "SET_REGISTRATION" | "CLEAR_REGISTRATION";
  payload?: ServiceWorkerProps;
};

export const swRegistration = (
  state: ServiceWorkerProps | {} = {},
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
