import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Typography, Grid, Paper, Button, TextField } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Cookies from 'js-cookie';

const NewRequest = ({ name, setName, id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  /* eslint-disable no-restricted-globals */
  const logout = () => {
    if (confirm("אתה בטוח שאתה רוצה להתנתק?")) {
      axios
        .post(
          `${API_BASE_URL}/users/logout`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setName("");
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  /* eslint-enable no-restricted-globals */

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const emptyForm = () => {
    setDescription("");
    setTitle("");
  };

  const sendMail = () => {
    axios.post(`${API_BASE_URL}/send-email`, {
      recipientEmail: "maormarhum9400@gmail.com",
      subject: `בקשה חדשה`,
      message: `יש לך בקשה חדשה מאת: ${name}`
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: id,
        title: title,
        description: description,
        name: name,
      }),
    };
    fetch(`${API_BASE_URL}/requests/create`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          alert("בקשה נוצרה בהצלחה");
          emptyForm();
          sendMail()
          history.push("/home");
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("There was an error:", error);
        alert(
          "An error occurred while submitting the request. Please try again later."
        );
      });
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography align="right" variant="h5" style={{ margin: "1rem" }}>
          ברוך הבא, {name}!
        </Typography>
        <Button variant="contained" size="small" color="error" onClick={logout}>
          התנתק
        </Button>
      </div>
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Typography align="center" variant="h5" gutterBottom>
              בקשה חדשה
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="כותרת"
                fullWidth
                margin="normal"
                value={title}
                onChange={handleTitleChange}
                required="true"
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
                label="תיאור"
                fullWidth
                margin="normal"
                value={description}
                onChange={handleDescChange}
                required="true"
                multiline
                rows={3}
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
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  component={Link}
                  to="/home"
                >
                  חזרה
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  type="submit"
                >
                  הגש בקשה
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default NewRequest;
