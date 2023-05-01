import { ErrorContext } from "@/store/error";
import { useContext, useEffect } from "react";

let timeout: NodeJS.Timeout;
const TIMEOUT_LIFETIME = 3000;

const Error = () => {
  const { message, clearState } = useContext(ErrorContext);

  useEffect(() => {
    timeout = setTimeout(() => {
      clearState();
    }, TIMEOUT_LIFETIME);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="fixed w-1/2 md:w-1/3 p-3 bg-red-400 text-white shadow-md shadow-red-200 tracking-widest right-5 top-5 rounded-md">
      {message}
    </div>
  );
};

export { Error };
