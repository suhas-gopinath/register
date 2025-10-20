import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    fetch("http://localhost:90/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((data) => {
        console.log(data);
        if (data.status == 201) {
          setMessage("Success");
        }
        if (data.status == 400) {
          alert("Username already exists");
        }
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  if (message == "") {
    return (
      <>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label=" Re-type Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {(password != password2 || password.length < 8) && (
          <div style={{ fontSize: "20px", color: "red" }}>
            Minimum 8 characters for password and passwords should match
          </div>
        )}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          disabled={password != password2 || password.length < 8 ? true : false}
          onClick={() => handleRegister()}
        >
          Register
        </Button>
      </>
    );
  } else {
    return <div style={{ paddingTop: "20px", color: "green" }}>Success!</div>;
  }
};
