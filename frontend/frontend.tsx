/**
 * This file is the entry point for the React app. It mounts the App component
 * to the #root element in index.html.
 *
 * React Fast Refresh (HMR) is provided automatically by @vitejs/plugin-react.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
