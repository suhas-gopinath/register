import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
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

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  if (message == "") {
    return (
      <>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          data-testid="username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
        />
        <TextField
          label="Password"
          type="password"
          data-testid="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label=" Re-type Password"
          type="password"
          data-testid="retypePassword"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <ValidationMessage
          username={username}
          password1={password}
          password2={password2}
        />
        <Button
          color="primary"
          variant="contained"
          disabled={
            !isUsernameLengthValid(username) ||
            !isUsernamePatternValid(username) ||
            !isPasswordMatch(password, password2) ||
            hasWhitespace(password) ||
            !isStrongPassword(password) ||
            !isPasswordLengthValid(password)
          }
          fullWidth
          onClick={() => submit(username, password, setMessage)}
        >
          Register
        </Button>
      </>
    );
  } else {
    return <div style={{ paddingTop: "20px", color: "green" }}>{message}</div>;
  }
};
