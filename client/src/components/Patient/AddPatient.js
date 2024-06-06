import React, { useState } from "react";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Grid,
  Container,
  Paper,
  MenuItem,
  IconButton,
  InputAdornment,
  Snackbar
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import styled from "@emotion/styled";
import MuiAlert from "@material-ui/lab/Alert";
import { InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto",
    paddingTop: theme.spacing(4),
  },
  paper: {
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(3),
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    marginTop:"40px",
  },
  form: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  whiteButton: {
    color: "black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  heading: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  snackbar: {
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  radio: {
    "&$checked": {
      color: "black",
    },
  },
  checked: {},
  outlinedInput: {
    "& input": {
      color: "black",
    },
  },
  toggleButtonGroup: {
    border: 'none',
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2)', 
    borderRadius: 5, 
    '& .MuiToggleButton-root': {
      border: 'none',
      borderRadius: 0, 
    },
  },
}));

const customTheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "black",
        },
        "&:hover $notchedOutline": {
          borderColor: "black",
        },
        "&.Mui-focused $notchedOutline": {
          borderColor: "black",
        },
      },
    },
  },
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& input": {
    color: "black",
  },
});

const YourComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [patientInfo, setPatientInfo] = useState({ password: "" });
  const [errorMessages, setErrorMessages] = useState({ password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatientInfo({ ...patientInfo, [name]: value });

    if (value.length < 8) {
      setPasswordStrength("weak");
      setErrorMessages({ ...errorMessages, password: "Password is too weak" });
    } else {
      setPasswordStrength("strong");
      setErrorMessages({ ...errorMessages, password: '' });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid item xs={12}>
      <CssTextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        variant="outlined"
        value={patientInfo.password}
        onChange={handleChange}
        required
        error={!!errorMessages.password}
        helperText={
          errorMessages.password ||
          (passwordStrength === "weak" ? "Weak password" : "Strong password")
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

const AddPatient = () => {
  const classes = useStyles();

  const [patientInfo, setPatientInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    bloodGroup: "",
    email: "",
    password: "",
    dob: "",
    gender: "male",
    address: "",
    mobileNumber: "",
    emergencyContact: "",
    photo: null,
  });
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    dob: "",
    mobileNumber: "",
    emergencyContact: "",
    photo: "",
    gender: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const calculateAgeFromDateOfBirth = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();

    if (dobDate.getFullYear() < 1800 || dobDate > currentDate) {
      return -1;
    }

    let age = currentDate.getFullYear() - dobDate.getFullYear();

    if (
      currentDate.getMonth() < dobDate.getMonth() ||
      (currentDate.getMonth() === dobDate.getMonth() &&
        currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "dob") {
      const age = calculateAgeFromDateOfBirth(value);
      if (age === -1) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid date of birth",
        }));
      } else {
        setPatientInfo((prevInfo) => ({
          ...prevInfo,
          age: age.toString(),
          dob: value,
        }));
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
      setPatientInfo((prevInfo) => ({
        ...prevInfo,
        age: age.toString(),
        dob: value,
      }));
    } else if (name === "photo") {
      const file = event.target.files[0];
      if (!file) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: "Required field",
        }));
      } else {
        const allowedFormats = ["image/jpeg", "image/png"];
        const maxFileSize = 5 * 1024 * 1024;
        let errorMessage = "";
        if (!allowedFormats.includes(file.type)) {
          errorMessage = "Allowed file formats: JPG, PNG";
        } else if (file.size > maxFileSize) {
          errorMessage = "Maximum file size: 5MB";
        }
        setPatientInfo((prevInfo) => ({
          ...prevInfo,
          [name]: file,
        }));
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: errorMessage,
        }));
      }
    } else {
      let errorMessage = "";
      switch (name) {
        case "firstName":
        case "lastName":
          const isNameValid = /^[a-zA-Z\s]*$/.test(value);
          if (isNameValid || value === "") {
            setPatientData({ ...patientData, [name]: value });
            setErrors({ ...errors, [name]: "" });
          } else {
            setErrors({ ...errors, [name]: "Please enter only characters" });
            setSnackbarMessage("Please enter only characters");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
          break;
        case "age":
          if (value.trim() === "") {
            errorMessage = "Required field";
          } else if (
            isNaN(value) ||
            parseInt(value) < 0 ||
            parseInt(value) > 150
          ) {
            errorMessage = "Numeric value between 0 and 150 expected";
          }
          break;
        case "email":
          if (value.trim() === "") {
            errorMessage = "Required field";
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            errorMessage = "Invalid email format";
          }
          break;
        case "password":
          if (value.trim() === "") {
            errorMessage = "Required field";
          } else if (value.length < 6) {
            errorMessage = "Minimum length: 6 characters";
          }
          break;
        case "address":
          if (value.length > 255) {
            setSnackbarMessage("Maximum length: 255 characters");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
          break;
        case "mobileNumber":
        case "emergencyContact":
          if (name === "mobileNumber" || name === "emergencyContact") {
            if (!/^[0-9]*$/.test(value)) {
              setSnackbarMessage("Only numeric values are allowed");
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
              return;
            }
            if (value.length > 10) {
              setSnackbarMessage("Exactly 10 digits expected");
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
              return;
            }
          }

          break;

        case "gender":
          if (!value) {
            errorMessage = "Please select a gender";
          }
          break;
        default:
          break;
      }
      setPatientInfo((prevInfo) => ({
        ...prevInfo,
        [name]: name === "photo" ? event.target.files[0] : value,
      }));

      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    }
  };

  const handleFileChange = (event) => {
    handleChange(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasErrors = Object.values(errorMessages).some(
      (message) => message !== ""
    );

    if (hasErrors) {
      console.error("Please fill in all required fields correctly");
      return;
    }

    console.log("Adding patient:", patientInfo);

    setPatientInfo({
      firstName: "",
      lastName: "",
      age: "",
      bloodGroup: "",
      email: "",
      password: "",
      dob: "",
      gender: "male",
      address: "",
      mobileNumber: "",
      emergencyContact: "",
      photo: null,
    });

    setFormSubmitted(true);

    setSnackbarMessage("Patient added successfully");
    setSnackbarSeverity("success");

    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container className={classes.root}>
       
        <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' , marginBottom: "20px",fontFamily: "Georgia, serif", }} className={classes.heading}>
          Add Patient
        </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  value={patientInfo.firstName}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.firstName}
                  helperText={errorMessages.firstName}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={patientInfo.lastName}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.lastName}
                  helperText={errorMessages.lastName}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Age"
                  type="number"
                  name="age"
                  variant="outlined"
                  value={patientInfo.age}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.age}
                  helperText={errorMessages.age}
                  inputProps={{ min: 0, max: 150 }}
                  className={classes.outlinedInput}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Blood Group"
                  name="bloodGroup"
                  variant="outlined"
                  value={patientInfo.bloodGroup}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.bloodGroup}
                  helperText={errorMessages.bloodGroup}
                  select
                  className={classes.outlinedInput}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          width: 'auto',
                          maxHeight: '80px',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">Select Blood Group</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </CssTextField>
              </Grid>

              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  variant="outlined"
                  value={patientInfo.email}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.email}
                  helperText={errorMessages.email}
                  className={classes.outlinedInput}
                />
              </Grid>
              <YourComponent />
              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  variant="outlined"
                  value={patientInfo.dob}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.dob}
                  helperText={errorMessages.dob}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: {
                      max: new Date().toISOString().split("T")[0],
                      min: "1800-01-01",
                    },
                  }}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel variant="subtitle1">Gender</InputLabel>
                <ToggleButtonGroup
                  value={patientInfo.gender}
                  exclusive
                  onChange={(event, newGender) => {
                    if (newGender !== null) {
                      handleChange({
                        target: { name: "gender", value: newGender },
                      });
                    }
                  }}
                  aria-label="gender"
                  className={classes.toggleButtonGroup}
                >
                  <ToggleButton value="Male" aria-label="Male">
                    Male
                  </ToggleButton>
                  <ToggleButton value="Female" aria-label="Female">
                    Female
                  </ToggleButton>
                  <ToggleButton value="Other" aria-label="Other">
                    Other
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  label="Address"
                  name="address"
                  variant="outlined"
                  value={patientInfo.address}
                  onChange={handleChange}
                  error={!!errorMessages.address}
                  helperText={errorMessages.address}
                  multiline
                  rows={2}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Mobile Number"
                  type="tel"
                  name="mobileNumber"
                  variant="outlined"
                  value={patientInfo.mobileNumber}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.mobileNumber}
                  helperText={errorMessages.mobileNumber}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Emergency Contact"
                  type="tel"
                  name="emergencyContact"
                  variant="outlined"
                  value={patientInfo.emergencyContact}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.emergencyContact}
                  helperText={errorMessages.emergencyContact}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="form-group">
                  <div className="input-wrapper">
                    <label htmlFor="photo">Photo:</label>
                    <input
                      type="file"
                      id="photo"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                      name="photo"
                      required
                    />
                  </div>
                  {!!errorMessages.photo && (
                    <Typography variant="caption" color="error">
                      {errorMessages.photo}
                    </Typography>
                  )}
                  {!patientInfo.photo && formSubmitted && (
                    <Typography variant="caption" color="error">
                      Photo is required
                    </Typography>
                  )}
                  {patientInfo.photo && (
                    <img
                      src={URL.createObjectURL(patientInfo.photo)}
                      alt="Uploaded"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  type="submit"
                  className={classes.submitButton}
                >
                  Add Patient
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        className={classes.snackbar}
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
    </ThemeProvider>
  );
};

export default AddPatient;