import React from "react";
import { createRoot } from "react-dom/client";
import { Register } from "./components/Register";
import "./index.css";

const App = () => (
  <div className="container">
    <div>Register Child App Standalone</div>
    <Register />
  </div>
);

const rootElement = document.getElementById("app");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
