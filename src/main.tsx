import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ModalProvider from "./components/modal-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { router } from "./lib/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors position="top-center" />
    <ModalProvider />
  </StrictMode>
);
