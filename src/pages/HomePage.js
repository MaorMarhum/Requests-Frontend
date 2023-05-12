import React, { useState, useEffect } from "react";
import SignUp from "../comp/SignUp";
import SignIn from "../comp/SignIn";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserHome from "./UserHome";
import NewRequest from "./NewRequest";
import Manager from "./Manager";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
const HomePage = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

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

  const renderHomePage = () => {
    if (name) {
      return <UserHome id={id} name={name} setName={setName} />;
    }
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
              ברוכים הבאים לאפליקציית הבקשות של מאור
            </Typography>
            <SignIn setName={setName} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Typography align="right" variant="h5">
                אין לך חשבון?
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                to="/signup"
                component={Link}
              >
                הירשם
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={renderHomePage} />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/home"
          render={() => <UserHome id={id} name={name} setName={setName} />}
        />
        <Route
          path="/new"
          render={() => <NewRequest id={id} name={name} setName={setName} />}
        />
        <Route path="/manager" id={id} component={Manager} />
      </Switch>
    </Router>
  );
};

export default HomePage;
