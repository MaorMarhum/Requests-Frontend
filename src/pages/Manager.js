import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Typography,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Manager = ({ id }) => {
  const [requests, setRequests] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/requests/all`, { withCredentials: true })
      .then((response) => {
        setRequests(response.data.requests);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting requests:", error);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const sendEmail = (requestId) => {
    axios.post(`${API_BASE_URL}/send-update`, {
      id: requestId,
    });
  };

  const handleSave = (requestId) => {
    axios
      .put(`${API_BASE_URL}/requests/update-status/${requestId}`, {
        id: requestId,
        status: selectedOption,
      })
      .then((response) => {
        const updatedRequests = requests.map((request) => {
          if (request.id === requestId) {
            return { ...request, ...response.data };
          }
          return request;
        });
        setRequests(updatedRequests);
        sendEmail(requestId);
        alert("הבקשה עודכנה בהצלחה");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating request status:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requests.length === 0) {
    return <div>אין לך בקשות</div>;
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Typography align="center" variant="h5" gutterBottom>
              הבקשות שלי
            </Typography>
            <div>
              {requests
                .sort((a, b) => a.status - b.status)
                .map((request) => (
                  <Accordion key={request.id}>
                    <AccordionSummary
                      expandIcon={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <ExpandMoreIcon />
                        </div>
                      }
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                          <p>{request.title}</p>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                          <Chip
                            label={
                              request.status === 1
                                ? "ממתינה"
                                : request.status === 2
                                ? "בטיפול"
                                : request.status === 3
                                ? "טופלה"
                                : "נדחתה"
                            }
                            style={{
                              backgroundColor:
                                request.status === 1
                                  ? "#FFCC00"
                                  : request.status === 2
                                  ? "#2196F3"
                                  : request.status === 3
                                  ? "#4CAF50"
                                  : "red",
                              color: "black",
                              fontWeight: "bold",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <h4 style={{ marginBottom: "1rem" }}>
                        בקשה מאת: {request.name}
                      </h4>
                      <p>{request.description}</p>
                    </AccordionDetails>
                    <div style={{ textAlign: "left" }}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor={`select-${request.id}`}>
                          בחר סטטוס
                        </InputLabel>
                        <Select
                          value={selectedOption}
                          onChange={handleOptionChange}
                          native
                          inputProps={{
                            name: "option",
                            id: `select-${request.id}`,
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value={"1"}>ממתינה</option>
                          <option value={"2"}>בטיפול</option>
                          <option value={"3"}>טופלה</option>
                          <option value={"4"}>נדחתה</option>
                        </Select>
                      </FormControl>
                      <IconButton onClick={() => handleSave(request.id)}>
                        <SaveIcon />
                      </IconButton>
                    </div>
                  </Accordion>
                ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Manager;
