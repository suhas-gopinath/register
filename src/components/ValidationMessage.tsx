import React from "react";
import {
  isUsernameLengthValid,
  isUsernamePatternValid,
  isPasswordLengthValid,
  hasWhitespace,
  isPasswordMatch,
  isStrongPassword,
} from "../utils/validation";

export type Props = {
  username: string;
  password1: string;
  password2: string;
};

export const ValidationMessage = ({
  username,
  password1,
  password2,
}: Props) => {
  return (


    <ul style={{ listStyleType: "disc", paddingLeft: "20px", margin: 0 }}>
      <li
        style={{
          fontSize: "20px",
          color: isUsernameLengthValid(username) ? "green" : "red",
          marginBottom: "8px",
        }}
      >
        Username should have minimum 6 and maximum 30 characters


      </li>
      <li
        style={{
          fontSize: "20px",
          color: isUsernamePatternValid(username) ? "green" : "red",
          marginBottom: "8px",
        }}
      >
        Username can only contain Alphanumeric and ._- characters


      </li>
      <li
        style={{
          fontSize: "20px",
          color: isPasswordLengthValid(password1) ? "green" : "red",
          marginBottom: "8px",
        }}
      >
        Password should have minimum 8 and maximum 64 characters


      </li>
      <li
        style={{
          fontSize: "20px",
          color: hasWhitespace(password1) ? "red" : "green",
          marginBottom: "8px",
        }}
      >
        Password cannot contain whitespace


      </li>
      <li
        style={{
          fontSize: "20px",
          color: isStrongPassword(password1) ? "green" : "red",
          marginBottom: "8px",
        }}
      >
        Password should contain lowercase, uppercase, digit and a special
        character(@$!%*?&)


      </li>
      <li
        style={{
          fontSize: "20px",
          color: isPasswordMatch(password1, password2) ? "green" : "red",
        }}
      >
        Passwords should match


      </li>
    </ul>
  );
};
