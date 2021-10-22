import { useState } from "react";
import { ServiceWorkerProps } from "../utils/types/serviceWorker";

const useRegistration = () => {
  const [SWRegistration, setSWRegistration] = useState<ServiceWorkerProps>();

  const handleRegistration = (registration: ServiceWorkerProps | undefined) => {
    if (!!registration) {
      setSWRegistration(registration);
    }
  };

  return [SWRegistration, handleRegistration];
};

export default useRegistration;
