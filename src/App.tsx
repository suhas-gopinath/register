import React from "react";
import ReactDOM from "react-dom";
import { Register } from "./components/Register";
import "./index.css";

const App = () => (
  <div className="container">
    <div>Register Child App Standalone</div>
    <Register />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
