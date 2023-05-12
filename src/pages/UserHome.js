import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import Requests from "../comp/Requests";
import Cookies from 'js-cookie';


const UserHome = ({ name, setName, id }) => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  /* eslint-disable no-restricted-globals */
  const logout = () => {
    if (confirm("אתה בטוח שאתה רוצה להתנתק?")) {
      Cookies.remove('token')
      setName("");
      history.push("/");
      window.location.reload()
    }
  };
  /* eslint-enable no-restricted-globals */

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/users/user`,{token: Cookies.get('token')}, {
        withCredentials: true,
      })
      .then((response) => {
        setName(response.data[0].name);
        setId(response.data[0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

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
