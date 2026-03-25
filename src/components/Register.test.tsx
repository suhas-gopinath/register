import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from "./Register";

import * as validation from "../utils/validation";
import * as submitModule from "../utils/submit";

jest.mock("../utils/validation");
jest.mock("../utils/submit");

jest.mock("./ValidationMessage", () => ({
  ValidationMessage: () => <div data-testid="validation-message" />,
}));

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockAllValidations = (value: boolean) => {
    (validation.isUsernameLengthValid as jest.Mock).mockReturnValue(value);
    (validation.isUsernamePatternValid as jest.Mock).mockReturnValue(value);
    (validation.isPasswordMatch as jest.Mock).mockReturnValue(value);
    (validation.hasWhitespace as jest.Mock).mockReturnValue(!value);
    (validation.isStrongPassword as jest.Mock).mockReturnValue(value);
    (validation.isPasswordLengthValid as jest.Mock).mockReturnValue(value);
  };

  test("renders inputs and button when message is empty", () => {
    render(<Register />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retype password/i)).toBeInTheDocument();
    expect(screen.getByTestId("validation-message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i }),
    ).toBeInTheDocument();
  });

  test("username is lowercased and trimmed", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText(/username/i);

    await userEvent.type(usernameInput, "  TESTUser  ");

    expect(usernameInput).toHaveValue("testuser");
  });

  test("password fields update correctly", async () => {
    render(<Register />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const retypeInput = screen.getByLabelText(/retype password/i);

    await userEvent.type(passwordInput, "Password123!");
    await userEvent.type(retypeInput, "Password123!");

    expect(passwordInput).toHaveValue("Password123!");
    expect(retypeInput).toHaveValue("Password123!");
  });

  test("button is disabled when validations fail", () => {
    mockAllValidations(false);

    render(<Register />);
    const button = screen.getByRole("button", { name: /register/i });

    expect(button).toBeDisabled();
  });

  test("button is enabled when validations pass", () => {
    mockAllValidations(true);

    render(<Register />);
    const button = screen.getByRole("button", { name: /register/i });

    expect(button).toBeEnabled();
  });

  test("calls submit with correct values when clicked", async () => {
    mockAllValidations(true);

    const submitMock = submitModule.submit as jest.Mock;

    render(<Register />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const button = screen.getByRole("button", { name: /register/i });

    await userEvent.type(usernameInput, "TestUser");
    await userEvent.type(passwordInput, "Password123!");
    await userEvent.click(button);

    expect(submitMock).toHaveBeenCalledWith(
      "testuser",
      "Password123!",
      expect.any(Function),
    );
  });

  test("renders success message when message state is set", async () => {
    mockAllValidations(true);

    (submitModule.submit as jest.Mock).mockImplementation(
      (_username, _password, setMessage) => {
        setMessage("Registration successful");
      },
    );

    render(<Register />);

    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText("Registration successful")).toBeInTheDocument();
  });
});