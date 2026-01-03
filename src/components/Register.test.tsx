import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Register } from "./Register";
import { submit } from "../utils/submit";

jest.mock("../utils/submit", () => ({
  submit: jest.fn(),
}));

describe("Register component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all input fields and register button initially", () => {
    render(<Register />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/re-type password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("updates username input in lowercase and trimmed", () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText(/username/i);

    fireEvent.change(usernameInput, {
      target: { value: "  JohnDoe  " },
    });

    expect(usernameInput).toHaveValue("johndoe");
  });

  test("updates password and confirm password fields", () => {
    render(<Register />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/re-type password/i);

    fireEvent.change(passwordInput, {
      target: { value: "Password@123" },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password@123" },
    });

    expect(passwordInput).toHaveValue("Password@123");
    expect(confirmPasswordInput).toHaveValue("Password@123");
  });

  test("calls submit with correct arguments on register click", () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "user123" },
    });

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "Password@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(submit).toHaveBeenCalledTimes(1);

    expect(submit).toHaveBeenCalledWith(
      "user123",
      "Password@123",
      expect.any(Function)
    );
  });

  test("displays success message when message state is set", () => {
    (submit as jest.Mock).mockImplementation(
      (_u: string, _p: string, setMessage: Function) => {
        setMessage("Registration successful");
      }
    );

    render(<Register />);

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText("Registration successful")).toBeInTheDocument();
  });
});
