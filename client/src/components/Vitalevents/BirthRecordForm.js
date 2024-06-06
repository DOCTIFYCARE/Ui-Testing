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

const BirthRecordForm = () => {
  const initialFormData = {
    childName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    gender: "",
    weight: "",
    motherName: "",
    motherID: "",
    fatherName: "",
    fatherID: "",
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

    if (name === "weight") {
      if (!/^\d*\.?\d*$/.test(value)) {
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

    if (!data.childName.trim()) {
      warnings.childName = "Child's Name is required";
    }

    if (!data.dateOfBirth) {
      warnings.dateOfBirth = "Date of Birth is required";
    }

    if (!data.timeOfBirth) {
      warnings.timeOfBirth = "Time of Birth is required";
    }

    if (!data.gender.trim()) {
      warnings.gender = "Gender is required";
    }

    if (!data.weight.trim()) {
      warnings.weight = "Weight is required";
    }

    if (!data.motherName.trim()) {
      warnings.motherName = "Mother's Name is required";
    }

    if (!data.doctorName.trim()) {
      warnings.doctorName = "Doctor's Name is required";
    }

    if (!data.hospitalName.trim()) {
      warnings.hospitalName = "Hospital Name is required";
    }

    return warnings;
  };

  return (
    <Grid container justifyContent="center" alignItems="center"  width="100%" marginTop="30px">
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
            Add Birth Record
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Child's Name"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("childName")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.childName}
                  helperText={errors.childName}
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
                      color: focusedField === "childName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("dateOfBirth")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
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
                      color: focusedField === "dateOfBirth" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time of Birth"
                  name="timeOfBirth"
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("timeOfBirth")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.timeOfBirth}
                  helperText={errors.timeOfBirth}
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
                      color: focusedField === "timeOfBirth" ? "black" : null,
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
                  label="Weight (xx.x kg)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("weight")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.weight}
                  helperText={errors.weight}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9.]*" }}
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
                      color: focusedField === "weight" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mother's Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("motherName")}
                  onBlur={() => setFocusedField("")}
                  error={!!errors.motherName}
                  helperText={errors.motherName}
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
                      color: focusedField === "motherName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mother's ID"
                  name="motherID"
                  value={formData.motherID}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("motherID")}
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
                      color: focusedField === "motherID" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("fatherName")}
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
                      color: focusedField === "fatherName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Father's ID"
                  name="fatherID"
                  value={formData.fatherID}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("fatherID")}
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
                      color: focusedField === "fatherID" ? "black" : null,
                    },
                  }}
                />
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
              <Grid item xs={12}>
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

export default BirthRecordForm;
