import { createContext, ReactNode, useEffect, useState } from "react";
import { socket } from "@/sockets";
import { EventNames } from "@/messages/events";

type ErrorState = {
  isError: boolean;
  message: string;
};

type InitialState = ErrorState & {
  clearState: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const initialState: InitialState = {
  isError: false,
  message: "Some random error",
  clearState: () => {},
};

const ErrorContext = createContext<InitialState>(initialState);

const ErrorProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState<ErrorState>(initialState);

  useEffect(() => {
    socket.on(EventNames.connectionError, (error) =>
      setState({
        isError: true,
        message: error.message,
      })
    );

    socket.on(EventNames.error, (message: string) =>
      setState({
        isError: true,
        message,
      })
    );

    return () => {
      socket.off(EventNames.error);
    };
  }, []);

  const clearState = () =>
    setState({
      isError: false,
      message: "",
    });

  return (
    <ErrorContext.Provider
      value={{
        ...state,
        clearState,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider };
