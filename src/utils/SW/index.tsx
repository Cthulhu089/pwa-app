import { ServiceWorkerProps } from "../types/serviceWorker";

export const getRegistration = async () => {
  try {
    const sw = await navigator.serviceWorker.ready;

    return sw;
  } catch (error) {
    return error;
  }
};
