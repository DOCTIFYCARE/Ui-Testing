import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  FormLabel,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const DoctorsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    department: "",
    email: "",
    password: "",
    languagesKnown: [],
    status: "Active",
    dob: "",
    gender: "Male",
    address: "",
    mobileNumber: "",
    photo: null,
  });

  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      const isValidInput = /^[a-zA-Z]*$/.test(value);
      if (isValidInput || value === "") {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === "dob") {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setFormData({
        ...formData,
        [name]: value,
        age: age.toString(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({
        ...formData,
        photo: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFocusChange = (field) => {
    setFocusedField(field);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      handleOpenSnackbar("Form submitted successfully", "success");
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;

    if (field === "status" || field === "gender") {
      setFormData({
        ...formData,
        [field]: value,
      });
    } else if (field === "languagesKnown") {
      const updatedLanguages = e.target.checked
        ? [...formData.languagesKnown, value]
        : formData.languagesKnown.filter((lang) => lang !== value);

      setFormData({
        ...formData,
        languagesKnown: updatedLanguages,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleMobileNumberChange = (e) => {
    const inputValue = e.target.value;
    const numericRegex = /^[0-9]*$/;

    if (numericRegex.test(inputValue)) {
      setFormData({
        ...formData,
        mobileNumber: inputValue,
      });
    } else {
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!data.dob) {
      errors.dob = "Date of Birth is required";
    }

    if (!data.age) {
      errors.age = "Age is required";
    }

    if (!data.department) {
      errors.department = "Department is required";
    }

    if (data.languagesKnown.length === 0) {
      errors.languagesKnown = "At least one language must be selected";
    }

    if (!formData.mobileNumber) {
      errors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d+$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile Number must contain only numbers";
    }

    if (!data.address.trim()) {
      errors.address = "Address is required";
    }

    return errors;
  };

  return (
    <Grid container justifyContent="center" alignItems="center" width="80%" height="100vh" padding="10px">
      <Grid item xs={12} >
        <Paper
          elevation={6}
          sx={{
            padding: "20px",
            marginTop: "60px",
            backgroundColor: "#f0f0f0",
            
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontFamily: "Georgia, serif",height: "40px",
            paddingTop: "15px", }}
          >
            Add Doctor
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("firstName")}
                  onBlur={() => handleFocusChange("")}
                  error={errors.firstName}
                  helperText={errors.firstName}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("lastName")}
                  onBlur={() => handleFocusChange("")}
                  error={errors.lastName}
                  helperText={errors.lastName}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("email")}
                  onBlur={() => handleFocusChange("")}
                  error={errors.email}
                  helperText={errors.email}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("password")}
                  onBlur={() => handleFocusChange("")}
                  error={errors.password}
                  helperText={errors.password}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("dob")}
                  onBlur={() => handleFocusChange("")}
                  InputLabelProps={{ shrink: true }}
                  error={errors.dob}
                  helperText={errors.dob}
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                    min: "1800-01-01",
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("age")}
                  onBlur={() => handleFocusChange("")}
                  error={errors.age}
                  helperText={errors.age}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("department")}
                  onBlur={() => handleFocusChange("")}
                  variant="outlined"
                  error={errors.department}
                  helperText={errors.department}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                >
                  <MenuItem value="">Select Department</MenuItem>
                  <MenuItem value="Cardiology">Cardiology</MenuItem>
                  <MenuItem value="Neurology">Neurology</MenuItem>
                  <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Languages Known"
                  name="languagesKnown"
                  value={formData.languagesKnown}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("languagesKnown")}
                  onBlur={() => handleFocusChange("")}
                  variant="outlined"
                  error={errors.languagesKnown}
                  helperText={errors.languagesKnown}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                >
                  <MenuItem value="">Select Language</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ color: "black" }}>
                    Status
                  </FormLabel>
                  <ToggleButtonGroup
                    value={formData.status}
                    onChange={(e, value) => handleChange(e, "status")}
                    aria-label="status"
                  >
                    <ToggleButton
                      value="Active"
                      sx={{
                        color: "black",
                        "&.Mui-selected": { color: "black" },
                      }}
                    >
                      Active
                    </ToggleButton>
                    <ToggleButton
                      value="Inactive"
                      sx={{
                        color: "black",
                        "&.Mui-selected": { color: "black" },
                      }}
                    >
                      Inactive
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ color: "black" }}>
                    Gender
                  </FormLabel>
                  <ToggleButtonGroup
                    value={formData.gender}
                    onChange={(e, value) => handleChange(e, "gender")}
                    aria-label="gender"
                  >
                    <ToggleButton
                      value="Male"
                      sx={{
                        color: "black",
                        "&.Mui-selected": { color: "black" },
                      }}
                    >
                      Male
                    </ToggleButton>
                    <ToggleButton
                      value="Female"
                      sx={{
                        color: "black",
                        "&.Mui-selected": { color: "black" },
                      }}
                    >
                      Female
                    </ToggleButton>
                    <ToggleButton
                      value="Other"
                      sx={{
                        color: "black",
                        "&.Mui-selected": { color: "black" },
                      }}
                    >
                      Other
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleMobileNumberChange}
                  onFocus={() => handleFocusChange("mobileNumber")}
                  onBlur={() => handleFocusChange("")}
                  error={errors.mobileNumber}
                  helperText={errors.mobileNumber}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  onFocus={() => handleFocusChange("address")}
                  onBlur={() => handleFocusChange("")}
                  error={errors.address}
                  helperText={errors.address}
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
                      color: focusedField === "firstName" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Profile Photo
                </Typography>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {formData.photo && (
                  <img
                    src={formData.photo}
                    alt="Profile"
                    style={{
                      maxWidth: "80px",
                      maxHeight: "100px",
                    }}
                  />
                )}
              </Grid>
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
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </Button>
              </div>
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

export default DoctorsForm;
