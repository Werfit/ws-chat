import { useContext } from "react";

import { AuthenticationContext } from "@/store/authentication";
import { MessageProvider } from "@/store/messages";
import { ErrorContext } from "@/store/error";

import { Dialog } from "./dialog";
import { Chat } from "./chat";
import { Error } from "./error";

const App = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  const { isError } = useContext(ErrorContext);

  return (
    <MessageProvider>
      {isError && <Error />}
      <div className="flex mx-auto h-screen items-center justify-center bg-gray-50 w-screen selection:bg-sky-200 text-gray-700 box-content">
        {isAuthenticated ? <Chat /> : <Dialog />}
      </div>
    </MessageProvider>
  );
};

export { App };
