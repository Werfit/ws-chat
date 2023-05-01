import React from "react";
import ReactDOM from "react-dom/client";

import { AuthenticationProvider } from "@/store/authentication";
import { ErrorProvider } from "@/store/error";
import { App } from "@/components/app";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorProvider>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </ErrorProvider>
  </React.StrictMode>
);
