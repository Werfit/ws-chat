import { createContext, ReactNode, useEffect, useState } from "react";
import { socket } from "@/sockets";
import { EventNames } from "@/messages/events";

type AuthenticationState = {
  username: string;
  roomId: string;
  isAuthenticated: boolean;
};

type InitialState = AuthenticationState & {
  authenticate: (authenticationData: AuthenticationState) => void;
  logout: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const initialState: InitialState = {
  username: "",
  roomId: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
};

const AuthenticationContext = createContext<InitialState>(initialState);

const AuthenticationProvider = ({ children }: ProviderProps) => {
  const [state, setState] = useState<AuthenticationState>(initialState);

  useEffect(() => {
    socket.on(
      EventNames.authorization,
      (data: Omit<AuthenticationState, "isAuthenticated">) =>
        setState((state) => ({
          ...state,
          username: data.username,
          roomId: data.roomId,
          isAuthenticated: true,
        }))
    );

    return () => {
      socket.off(EventNames.authorization);
    };
  }, []);

  const authenticate = (
    authenticationData: Omit<AuthenticationState, "isAuthenticated">
  ) => {
    if (!socket.connected) {
      throw new Error("Socket connection isn't established yet");
    }

    socket.emit(EventNames.authorization, {
      username: authenticationData.username,
      roomId: authenticationData.roomId,
    });
  };

  const logout = () => {
    setState(initialState);
    socket.emit(EventNames.logout);
    // socket.disconnect();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        ...state,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
