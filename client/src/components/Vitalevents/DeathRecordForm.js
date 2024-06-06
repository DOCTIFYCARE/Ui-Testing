import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem,
  IconButton,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const DeathRecordForm = () => {
  const initialFormData = {
    deceasedName: "",
    dateOfDeath: "",
    timeOfDeath: "",
    gender: "",
    age: "",
    causeOfDeath: "",
    doctorName: "",
    hospitalName: "",
    roomNumber: "",
    notes: "",
  };

  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationWarnings = validateForm(formData);
    if (Object.keys(validationWarnings).length > 0) {
      handleOpenSnackbar("Invalid Inputs. Please review.", "warning");
      setErrors(validationWarnings);
    } else {
      handleOpenSnackbar("Form submitted successfully", "success");
      setFormData(initialFormData);
    }
  };

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setErrors({});
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/vital-events");
  };

  const validateForm = (data) => {
    let warnings = {};

    if (!data.deceasedName.trim()) {
      warnings.deceasedName = "Deceased's Name is required";
    }

    if (!data.dateOfDeath) {
      warnings.dateOfDeath = "Date of Death is required";
    }

    if (!data.timeOfDeath) {
      warnings.timeOfDeath = "Time of Death is required";
    }

    if (!data.gender.trim()) {
      warnings.gender = "Gender is required";
    }

    if (!data.age.trim()) {
      warnings.age = "Age is required";
    }

    if (!data.causeOfDeath.trim()) {
      warnings.causeOfDeath = "Cause of Death is required";
    }

    if (!data.doctorName.trim()) {
      warnings.doctorName = "Doctor's Name is required";
    }

    return warnings;
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh" width="100%" marginTop="30px">
      <Grid item xs={12} sm={8} md={8} >
        <Paper
          elevation={6}
          sx={{
            padding: 3,
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 8px .5px",
            backgroundColor: "white",
            height: "auto",
          }}
        >
          <IconButton onClick={handleBackClick} sx={{ marginBottom: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontFamily: "Georgia, serif", marginBottom: "20px" }}
          >
            Add Death Record
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Deceased's Name"
                  name="deceasedName"
                  value={formData.deceasedName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("deceasedName")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.deceasedName}
                  helperText={errors.deceasedName}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "deceasedName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Death"
                  name="dateOfDeath"
                  type="date"
                  value={formData.dateOfDeath}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("dateOfDeath")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.dateOfDeath}
                  helperText={errors.dateOfDeath}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "black" },
                  }}
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                    min: "2000-01-01",
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "dateOfDeath" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time of Death"
                  name="timeOfDeath"
                  type="time"
                  value={formData.timeOfDeath}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("timeOfDeath")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.timeOfDeath}
                  helperText={errors.timeOfDeath}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "black" },
                  }}
                  inputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "timeOfDeath" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("gender")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.gender}
                  helperText={errors.gender}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "gender" ? "black" : null,
                    },
                  }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age (xx years)"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("age")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.age}
                  helperText={errors.age}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "age" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cause of Death"
                  name="causeOfDeath"
                  value={formData.causeOfDeath}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("causeOfDeath")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.causeOfDeath}
                  helperText={errors.causeOfDeath}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "causeOfDeath" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Hospital Name"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("hospitalName")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.hospitalName}
                  helperText={errors.hospitalName}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "hospitalName" ? "black" : null,
                    },
                  }}
                >
                  <MenuItem value="">Select Hospital</MenuItem>
                  <MenuItem value="City Hospital">City Hospital</MenuItem>
                  <MenuItem value="County Hospital">County Hospital</MenuItem>
                  <MenuItem value="General Hospital">General Hospital</MenuItem>
                  <MenuItem value="Regional Medical Center">
                    Regional Medical Center
                  </MenuItem>
                  <MenuItem value="University Hospital">
                    University Hospital
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Doctor's Name"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("doctorName")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.doctorName}
                  helperText={errors.doctorName}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "doctorName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Room Number"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("roomNumber")}
                  onBlur={() => setFocusedField("")}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: focusedField === "roomNumber" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("notes")}
                  onBlur={() => setFocusedField("")}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(41, 39, 39)",
                      color: "white",
                      borderRadius: "20px",
                      padding: "8px 18px",
                      marginTop: "15px",
                      fontSize: "13px",
                      cursor: "pointer",
                      minWidth: "100px",
                    }}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default DeathRecordForm;
