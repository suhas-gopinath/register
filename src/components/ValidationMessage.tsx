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
    <>
      <div
        style={{
          fontSize: "20px",
          color: isUsernameLengthValid(username) ? "green" : "red",
        }}
      >
        Username should have minimum 6 and maximum 30 characters
      </div>
      <div
        style={{
          fontSize: "20px",
          color: isUsernamePatternValid(username) ? "green" : "red",
        }}
      >
        Username can only contain Alphanumeric and ._- characters
      </div>
      <div
        style={{
          fontSize: "20px",
          color: isPasswordLengthValid(password1) ? "green" : "red",
        }}
      >
        Password should have minimum 8 and maximum 64 characters
      </div>
      <div
        style={{
          fontSize: "20px",
          color: hasWhitespace(password1) ? "red" : "green",
        }}
      >
        Password cannot contain whitespace
      </div>
      <div
        style={{
          fontSize: "20px",
          color: isStrongPassword(password1) ? "green" : "red",
        }}
      >
        Password should contain lowercase, uppercase, digit and a special
        character(@$!%*?&)
      </div>
      <div
        style={{
          fontSize: "20px",
          color: isPasswordMatch(password1, password2) ? "green" : "red",
        }}
      >
        Passwords should match
      </div>
    </>
  );
};
