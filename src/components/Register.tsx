import React, { useState } from "react";
import { ValidationMessage } from "./ValidationMessage";
import { submit } from "../utils/submit";
import {
  hasWhitespace,
  isPasswordLengthValid,
  isPasswordMatch,
  isStrongPassword,
  isUsernameLengthValid,
  isUsernamePatternValid,
} from "../utils/validation";
import "./Register.css";

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  if (message == "") {
    return (
      <div className="register-container">
        <div className="register-layout">
          <div className="register-form">
            <h2 className="register-title">Create Account</h2>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().trim())
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="retypePassword" className="form-label">
                Retype Password
              </label>
              <input
                type="password"
                id="retypePassword"
                className="form-input"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <button
              className="register-button"
              disabled={
                !isUsernameLengthValid(username) ||
                !isUsernamePatternValid(username) ||
                !isPasswordMatch(password, password2) ||
                hasWhitespace(password) ||
                !isStrongPassword(password) ||
                !isPasswordLengthValid(password)
              }
              onClick={() => submit(username, password, setMessage)}
            >
              Register
            </button>
          </div>

          <div className="validation-panel">
            <h3 className="validation-title">Requirements</h3>
            <div className="validation-section">
              <ValidationMessage
                username={username}
                password1={password}
                password2={password2}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="register-container">
        <div className="success-message">{message}</div>
      </div>
    );
  }
};
