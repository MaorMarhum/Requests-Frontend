import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const emptyForm = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${API_BASE_URL}/users/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("חשבון נוצר בהצלחה");
          emptyForm();
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography align="center" variant="h4" gutterBottom>
            הירשם
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="שם"
              fullWidth
              margin="normal"
              value={name}
              onChange={handleNameChange}
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
                הירשם
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "1rem" }}
                component={Link}
                to="/"
              >
                חזרה לדף הבית
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
