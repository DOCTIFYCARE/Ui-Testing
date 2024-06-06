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
  MenuItem,
  Paper,
  Snackbar,
} from "@material-ui/core";
// import { Visibility, VisibilityOff } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import styled from "@emotion/styled";
import MuiAlert from "@material-ui/lab/Alert";
import {
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto",
    paddingTop: theme.spacing(4),
  },
  paper: {
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(3),
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    marginTop: "40px",
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
    border: "none",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
    borderRadius: 5,
    "& .MuiToggleButton-root": {
      border: "none",
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

const AddStaff = () => {
  const classes = useStyles();

  const initialFormData = {
    department: "",
    designation: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);

  const department = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Oncology",
    "Gastroenterology",
    "Psychiatry",
    "Ophthalmology",
    "Radiology",
    "Endocrinology",
    "Rheumatology",
    "Urology",
    "Nephrology",
    "Pulmonology",
  ];

  const designation = [
    "Hospitalist",
    "Consultant",
    "Medical Director",
    "Chief Medical Officer",
    "Clinical Researcher",
    "Academic Physician",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "department") {
      if (value === "") {
        setFilteredDepartments([]);
      } else {
        setFilteredDepartments(
          department.filter((department) =>
            department.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    }

    if (name === "designation") {
      if (value === "") {
        setFilteredDesignations([]);
      } else {
        setFilteredDesignations(
          designation.filter((designation) =>
            designation.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    }
  };

  const handleSelectDepartment = (department) => {
    setFormData({ ...formData, department });
    setFilteredDepartments([]);
  };

  const handleSelectDesignation = (designation) => {
    setFormData({ ...formData, designation });
    setFilteredDesignations([]);
  };

  // const handleSearchChange = (e) => {
  //   const value = e.target.value;
  //   setSearchQuery(value);
  //   if (value === "") {
  //     setSearchResults([]);
  //   } else {
  //     setSearchResults(
  //       staffList.filter(
  //         (staff) =>
  //           staff.name.toLowerCase().includes(value.toLowerCase()) ||
  //           staff.id.toString().includes(value)
  //       )
  //     );
  //   }
  // };

  const [staffInfo, setStaffInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    jobType: "",
    email: "",
    doj: "",
    gender: "male",
    address: "",
    mobileNumber: "",
    emergencyContact: "",
    department: "",
    designation: "",
    basicsalary: "",
    photo: null,
  });
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    doj: "",
    mobileNumber: "",
    emergencyContact: "",
    photo: "",
    gender: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [staffData, setStaffData] = useState({});
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const calculateAgeFromDateOfJoining = (doj) => {
    const dojDate = new Date(doj);
    const currentDate = new Date();

    if (dojDate.getFullYear() < 1800 || dojDate > currentDate) {
      return -1;
    }

    let age = currentDate.getFullYear() - dojDate.getFullYear();

    if (
      currentDate.getMonth() < dojDate.getMonth() ||
      (currentDate.getMonth() === dojDate.getMonth() &&
        currentDate.getDate() < dojDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "doj") {
      const age = calculateAgeFromDateOfJoining(value);
      if (age === -1) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: "Invalid date of Joining",
        }));
      } else {
        setStaffInfo((prevInfo) => ({
          ...prevInfo,
          age: age.toString(),
          doj: value,
        }));
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
      setStaffInfo((prevInfo) => ({
        ...prevInfo,
        age: age.toString(),
        doj: value,
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
        setStaffInfo((prevInfo) => ({
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
        case "Name":
        case "lastName":
          const isNameValid = /^[a-zA-Z\s]*$/.test(value);
          if (isNameValid || value === "") {
            setStaffData({ ...staffData, [name]: value });
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
      setStaffInfo((prevInfo) => ({
        ...prevInfo,
        [name]: name === "photo" ? event.target.files[0] : value,
      }));

      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    }
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

    console.log("Adding Staff:", staffInfo);

    setStaffInfo({
      firstName: "",
      lastName: "",
      age: "",
      jobType: "",
      email: "",
      doj: "",
      gender: "male",
      address: "",
      mobileNumber: "",
      emergencyContact: "",
      department: "",
      basicsalary: "",
      allowances: "",
      deductions: "",
      education: "",
      certifications: "",
      skills: "",
      photo: null,
    });

    setFormSubmitted(true);

    setSnackbarMessage("staff added successfully");
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
          <Grid item xs={12}>
            <Typography
              variant="h4"
              gutterBottom
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontFamily: "Georgia, serif",
              }}
              className={classes.heading}
            >
              Add Staff
            </Typography>
          </Grid>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  textAlign: "left",
                  padding: "5px",
                  marginLeft: "20px",
                  fontFamily: "Georgia, serif",
                }}
                className={classes.heading}
              >
                Personal Details :
              </Typography>
              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  value={staffInfo.firstName}
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
                  value={staffInfo.lastName}
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
                  label="Mobile Number"
                  type="tel"
                  name="mobileNumber"
                  variant="outlined"
                  value={staffInfo.mobileNumber}
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
                  value={staffInfo.emergencyContact}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.emergencyContact}
                  helperText={errorMessages.emergencyContact}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  variant="outlined"
                  value={staffInfo.email}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.email}
                  helperText={errorMessages.email}
                  className={classes.outlinedInput}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel variant="subtitle1">Gender</InputLabel>
                <ToggleButtonGroup
                  value={staffInfo.gender}
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
                  value={staffInfo.address}
                  onChange={handleChange}
                  error={!!errorMessages.address}
                  helperText={errorMessages.address}
                  multiline
                  rows={2}
                  className={classes.outlinedInput}
                />
              </Grid>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  textAlign: "left",
                  margin: "20px",
                  fontFamily: "Georgia, serif",
                }}
                className={classes.heading}
              >
                Employement Details :
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  variant="outlined"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Enter Department name"
                  sx={{
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
                    "& .MuiInputLabel-root": {
                      color: "black",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                  }}
                />
                {filteredDepartments.length > 0 && (
                  <List>
                    {filteredDepartments.map((department, index) => (
                      <ListItem
                        button
                        key={index}
                        onClick={() => handleSelectDepartment(department)}
                      >
                        <ListItemText primary={department} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  variant="outlined"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter Designation"
                  sx={{
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
                    "& .MuiInputLabel-root": {
                      color: "black",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                  }}
                />
                {filteredDesignations.length > 0 && (
                  <List>
                    {filteredDesignations.map((designation, index) => (
                      <ListItem
                        button
                        key={index}
                        onClick={() => handleSelectDesignation(designation)}
                      >
                        <ListItemText primary={designation} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Date of Joining"
                  type="date"
                  name="doj"
                  variant="outlined"
                  value={staffInfo.doj}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.doj}
                  helperText={errorMessages.doj}
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

              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Job Type"
                  name="jobType"
                  variant="outlined"
                  value={staffInfo.jobType}
                  onChange={handleChange}
                  required
                  error={!!errorMessages.jobType}
                  helperText={errorMessages.jobType}
                  select
                  className={classes.outlinedInput}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          width: "auto",
                          maxHeight: "80px",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">Select Job Type</MenuItem>
                  <MenuItem value="fulltime">Full Time</MenuItem>
                  <MenuItem value="parttime">Part Time</MenuItem>
                </CssTextField>
              </Grid>

              <Typography
                variant="h6"
                gutterBottom
                style={{
                  textAlign: "left",
                  margin: "20px",
                  fontFamily: "Georgia, serif",
                }}
                className={classes.heading}
              >
                Salary Details :
              </Typography>
              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  label="Basic Salary"
                  name="basicsalary"
                  variant="outlined"
                  value={staffInfo.basicsalary}
                  onChange={handleChange}
                  required
                ></CssTextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Allowances "
                  name="allowances"
                  variant="outlined"
                  value={staffInfo.allowances}
                  onChange={handleChange}
                  required
                ></CssTextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Deductions "
                  name="deductions"
                  variant="outlined"
                  value={staffInfo.deductions}
                  onChange={handleChange}
                  required
                ></CssTextField>
              </Grid>

              <Typography
                variant="h6"
                gutterBottom
                style={{
                  textAlign: "left",
                  margin: "20px",
                  fontFamily: "Georgia, serif",
                }}
                className={classes.heading}
              >
                Education Details :
              </Typography>
              <Grid item xs={12}>
                <CssTextField
                  fullWidth
                  label="Education "
                  name="education"
                  variant="outlined"
                  value={staffInfo.education}
                  onChange={handleChange}
                  required
                ></CssTextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Certification "
                  name="certification"
                  variant="outlined"
                  value={staffInfo.certification}
                  onChange={handleChange}
                  required
                ></CssTextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssTextField
                  fullWidth
                  label="Skills "
                  name="skills"
                  variant="outlined"
                  value={staffInfo.skills}
                  onChange={handleChange}
                  required
                ></CssTextField>
              </Grid>

              <Grid item xs={12}>
                <div className="form-group">
                  <div className="input-wrapper">
                    <label htmlFor="photo">Photo:</label>
                    <input
                      type="file"
                      id="photo"
                      accept="image/png, image/jpeg"
                      onChange={handleChange}
                      name="photo"
                      required
                    />
                  </div>
                  {!!errorMessages.photo && (
                    <Typography variant="caption" color="error">
                      {errorMessages.photo}
                    </Typography>
                  )}
                  {!staffInfo.photo && formSubmitted && (
                    <Typography variant="caption" color="error">
                      Photo is required
                    </Typography>
                  )}
                  {staffInfo.photo && (
                    <img
                      src={URL.createObjectURL(staffInfo.photo)}
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
                  Add Staff
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

export default AddStaff;
