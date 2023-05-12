import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import Requests from "../comp/Requests";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Cookies from 'js-cookie';


const UserHome = ({ name, setName, id }) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  /* eslint-disable no-restricted-globals */
  const logout = () => {
    if (confirm("אתה בטוח שאתה רוצה להתנתק?")) {
      // axios
      //   .post(`${API_BASE_URL}/users/logout`, {}, {
      //     withCredentials: true,
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   .then((response) => {
      //     if (response.status === 200) {
      //       setName("");
      //       history.push("/");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      Cookies.remove('token')
      setName("");
      history.push("/");
    }
  };
  /* eslint-enable no-restricted-globals */

  // useEffect(() => {
  //   if (!name) {
  //     history.push("/");
  //   }
  // }, [name, history]);

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
              הבקשות שלי
            </Typography>
            <div style={{ marginBottom: "1rem" }}>
              <Requests setMessage={setMessage} id={id} />
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
                color="green"
                style={{ fontWeight: "bold" }}
              >
                {message}
              </Typography>
            </div>
            <div>
              <Button
                variant="contained"
                size="small"
                color="success"
                to="/new"
                component={Link}
              >
                בקשה חדשה
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UserHome;
