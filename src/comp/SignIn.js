import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../config";

const SignIn = ({ setName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const emptyForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${API_BASE_URL}/users/login`, {
      email: email,
      password: password,
    }, {withCredentials: true})
      .then((response) => {
        if (response.status === 200) {
          setName(response.data.name);
          history.push("/home");
          window.location.reload();
        } else {
          throw new Error("there is not a user");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("הפרטים שהזנת שגויים");
        setTimeout(() => {
          setError("");
        }, 3000);
        emptyForm();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="email"
        label="אימייל"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        required={true}
        sx={{
          "& label": {
            left: "unset",
            right: "1.75rem",
            transformOrigin: "right",
            fontSize: "1rem",
          },
          "& legend": {
            textAlign: "right",
            fontSize: "1rem",
          },
        }}
      />
      <TextField
        type="password"
        label="סיסמה"
        fullWidth
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
        required={true}
        inputProps={{ minLength: 6 }}
        sx={{
          "& label": {
            left: "unset",
            right: "1.75rem",
            transformOrigin: "right",
            fontSize: "1rem",
          },
          "& legend": {
            textAlign: "right",
            fontSize: "1rem",
          },
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
          size="large"
        >
          היכנס
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          color="error"
          style={{ fontWeight: "bold" }}
        >
          {error}
        </Typography>
      </div>
    </form>
  );
};

export default SignIn;
