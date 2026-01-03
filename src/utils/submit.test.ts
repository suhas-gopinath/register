import { submit } from "./submit";

global.fetch = jest.fn();
global.alert = jest.fn();

describe("submit()", () => {
  const mockSetMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls setMessage when response is ok", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: "User registered" }),
    });

    await submit("user1", "pass123", mockSetMessage);
    await Promise.resolve();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:90/users/register",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "user1",
          password: "pass123",
        }),
      })
    );

    expect(mockSetMessage).toHaveBeenCalledWith("User registered");
    expect(alert).not.toHaveBeenCalled();
  });

  it("alerts error message when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Username exists" }),
    });

    await submit("user1", "pass123", mockSetMessage);
    await Promise.resolve();

    expect(alert).toHaveBeenCalledWith("Username exists");
    expect(mockSetMessage).not.toHaveBeenCalled();
  });

  it("alerts generic message on fetch failure", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await submit("user1", "pass123", mockSetMessage);
    await Promise.resolve();

    expect(alert).toHaveBeenCalledWith("Something went wrong");
    expect(mockSetMessage).not.toHaveBeenCalled();
  });
});
