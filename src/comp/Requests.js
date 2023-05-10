import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  TextField,
  Grid,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { API_BASE_URL } from '../config';

const Requests = ({ id, setMessage }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/requests/${id}`)
      .then((response) => {
        setRequests(response.data.requests);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);
  /* eslint-disable no-restricted-globals */
  const deleteRequest = (id) => {
    if (confirm("אתה בטוח שאתה רוצה למחוק את הבקשה?")) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      axios
        .delete(`${API_BASE_URL}/requests/delete/${id}`, requestOptions)
        .then(() => {
          setRequests(requests.filter((request) => request.id !== id));
          setMessage("הבקשה נמחקה בהצלחה");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting request:", error);
        });
    }
  };

  /* eslint-enable no-restricted-globals */
  const updateRequest = (id) => {
    axios
      .put(`${API_BASE_URL}/requests/update/${id}`, {
        title: title,
        description: description,
      })
      .then((response) => {
        const updatedRequests = requests.map((request) => {
          if (request.id === id) {
            return { ...request, ...response.data };
          }
          return request;
        });
        setRequests(updatedRequests);
        setEditId(null);
        alert("הבקשה עודכנה בהצלחה");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating request:", error);
      });
  };

  const handleEdit = (request) => {
    setEditId(request.id);
    setTitle(request.title);
    setDescription(request.description);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (requests.length === 0) {
    return <div>אין לך בקשות</div>;
  }

  return (
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
              {editId === request.id ? (
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  defaultValue={title}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
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
              )}
            </AccordionSummary>
            <AccordionDetails>
              {editId === request.id ? (
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  multiline
                  defaultValue={description}
                  rows={3}
                  fullWidth
                />
              ) : (
                <p>{request.description}</p>
              )}
            </AccordionDetails>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <IconButton onClick={() => deleteRequest(request.id)}>
                  <DeleteIcon style={{ color: "#C31135" }} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    if (request.status === 1) {
                      handleEdit(request);
                    } else {
                      alert("לא ניתן לערוך את הבקשה מכיוון שהיא כבר בטיפול");
                    }
                  }}
                >
                  <EditIcon style={{ color: "#eab676" }} />
                </IconButton>
              </div>
              <div>
                {editId === request.id ? (
                  <IconButton onClick={() => updateRequest(request.id)}>
                    <SaveIcon />
                  </IconButton>
                ) : null}
              </div>
            </div>
          </Accordion>
        ))}
    </div>
  );
};

export default Requests;
