import React from "react";
import { createRoot } from "react-dom/client";
import { Register } from "./components/Register";
import { MessageProvider } from "container/useMessage";
import MessageDisplay from "container/MessageDisplay";
import "./index.css";

const App = () => (
  <MessageProvider>
    <MessageDisplay />
    <div className="container">
      <Register />
    </div>
  </MessageProvider>
);

const rootElement = document.getElementById("app");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
