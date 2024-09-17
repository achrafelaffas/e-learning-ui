import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./components/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AutheProvider from "./components/AutheProvider";

const isisSignedIn = localStorage.getItem("accessToken") ? true : false;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AutheProvider isSignedIn={isisSignedIn}>
        <RouterProvider router={router} />
      </AutheProvider>
    </ThemeProvider>
  </StrictMode>
);
