import { createContext, ReactNode } from "react";
import { ServiceWorkerProps } from "../../utils/types/serviceWorker";

export const RegistrationContext = createContext({});

type RegistrationProviderProps = {
  children: ReactNode;
  registration: ServiceWorkerProps | undefined;
};

export const RegistrationProvider = (props: RegistrationProviderProps) => {
  const { children } = props;
  return (
    <RegistrationContext.Provider
      value={!!props.registration ? props.registration : {}}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
