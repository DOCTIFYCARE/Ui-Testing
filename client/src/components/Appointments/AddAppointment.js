import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Appointment = () => {
  const initialFormData = {
    doctor: "",
    time: "",
    date: "",
    healthProblem: "",
    patient: "",
    department: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const doctors = [
    { id: 1, name: "Dr. Arjun Reddy", specialty: "Cardiology", experience: "15 years", education: "MBBS, MD Cardiology" },
    { id: 2, name: "Dr. Kavya Nair", specialty: "Dermatology", experience: "10 years", education: "MBBS, MD Dermatology" },
    { id: 3, name: "Dr. Naveen Menon", specialty: "Neurology", experience: "12 years", education: "MBBS, DM Neurology" },
    { id: 4, name: "Dr. Lakshmi Iyer", specialty: "Pediatrics", experience: "8 years", education: "MBBS, MD Pediatrics" },
    { id: 5, name: "Dr. Srinivas Rao", specialty: "Orthopedics", experience: "20 years", education: "MBBS, MS Orthopedics" },
    { id: 6, name: "Dr. Anitha Choudhary", specialty: "Oncology", experience: "14 years", education: "MBBS, MD Oncology" },
    { id: 7, name: "Dr. Vijay Kumar", specialty: "Gastroenterology", experience: "11 years", education: "MBBS, DM Gastroenterology" },
    { id: 8, name: "Dr. Meena Natarajan", specialty: "Psychiatry", experience: "9 years", education: "MBBS, MD Psychiatry" },
    { id: 9, name: "Dr. Ramesh Prasad", specialty: "Ophthalmology", experience: "18 years", education: "MBBS, MS Ophthalmology" },
    { id: 10, name: "Dr. Swathi Rajan", specialty: "Radiology", experience: "7 years", education: "MBBS, MD Radiology" },
    { id: 11, name: "Dr. Bala Krishnan", specialty: "Endocrinology", experience: "13 years", education: "MBBS, DM Endocrinology" },
    { id: 12, name: "Dr. Priya Rangan", specialty: "Rheumatology", experience: "10 years", education: "MBBS, DM Rheumatology" },
    { id: 13, name: "Dr. Karthik Raju", specialty: "Urology", experience: "17 years", education: "MBBS, MCh Urology" },
    { id: 14, name: "Dr. Aishwarya Narayanan", specialty: "Nephrology", experience: "15 years", education: "MBBS, DM Nephrology" },
    { id: 15, name: "Dr. Sudhir Balaji", specialty: "Pulmonology", experience: "9 years", education: "MBBS, MD Pulmonology" },
  ];
  
  
  const patients = [
    { id: 1, name: "Ajay Reddy", age: 30, gender: 'Male', disease: 'Diabetes' },
    { id: 2, name: "Divya Nair", age: 28, gender: 'Female', disease: 'Hypertension' },
    { id: 3, name: "Rahul Menon", age: 28, gender: 'Male', disease: 'Asthma' },
    { id: 4, name: "Sneha Iyer", age: 23, gender: 'Female', disease: 'Migraine' },
    { id: 5, name: "Kiran Rao", age: 25, gender: 'Female', disease: 'Arthritis' },
    { id: 6, name: "Lavanya Choudhary", age: 40, gender: 'Female', disease: 'Eczema' },
    { id: 7, name: "Vignesh Kumar", age: 35, gender: 'Male', disease: 'Obesity' },
    { id: 8, name: "Anjali Natarajan", age: 45, gender: 'Female', disease: 'Hypertension' },
    { id: 9, name: "Ravi Prasad", age: 50, gender: 'Male', disease: 'Osteoporosis' },
    { id: 10, name: "Sangeetha Rajan", age: 60, gender: 'Female', disease: 'Cancer' },
  ];  
  
  const departments = [
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "doctor") {
      if (value === "") {
        setFilteredDoctors([]);
      } else {
        setFilteredDoctors(
          doctors.filter(
            (doctor) =>
              doctor.name.toLowerCase().includes(value.toLowerCase()) ||
              doctor.id.toString().includes(value)
          )
        );
      }
    }

    if (name === "patient") {
      if (value === "") {
        setFilteredPatients([]);
      } else {
        setFilteredPatients(
          patients.filter(
            (patient) =>
              patient.name.toLowerCase().includes(value.toLowerCase()) ||
              patient.id.toString().includes(value)
          )
        );
      }
    }

    if (name === "department") {
      if (value === "") {
        setFilteredDepartments([]);
      } else {
        setFilteredDepartments(
          departments.filter((department) =>
            department.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
    }
  };

  const handleSelectDoctor = (doctor) => {
    setFormData({ ...formData, doctor: `${doctor.name} (${doctor.specialty})` });
    setFilteredDoctors([]);
  };

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient: `${patient.name} (ID: ${patient.id})` });
    setFilteredPatients([]);
  };

  const handleSelectDepartment = (department) => {
    setFormData({ ...formData, department });
    setFilteredDepartments([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpenSnackbar("Appointment confirmed successfully", "success");
    setFormData(initialFormData);
  };

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%"  width="80%">
      <Grid item xs={12}>
        <Paper
          elevation={6}
          sx={{
            padding: "20px",
            marginTop:"60px",
            backgroundColor: "#f0f0f0",
            height: "auto",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontFamily: "Georgia, serif",
            }}
          >
            Book Appointment
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  placeholder="Enter Doctor name or ID"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',
                      '&.Mui-focused': {
                        color: 'black',
                      },
                    },
                  }}
                />
                {filteredDoctors.length > 0 && (
                  <List>
                    {filteredDoctors.map((doctor) => (
                      <ListItem
                        button
                        key={doctor.id}
                        onClick={() => handleSelectDoctor(doctor)}
                      >
                        <ListItemText primary={`${doctor.name} (${doctor.specialty})`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Enter Department name"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',
                      '&.Mui-focused': {
                        color: 'black',
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
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',
                      '&.Mui-focused': {
                        color: 'black',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',
                      '&.Mui-focused': {
                        color: 'black',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Patient"
                  name="patient"
                  value={formData.patient}
                  onChange={handleInputChange}
                  placeholder="Enter Patient name or ID"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',
                      '&.Mui-focused': {
                        color: 'black',
                      },
                    },
                  }}
                />
                {filteredPatients.length > 0 && (
                  <List>
                    {filteredPatients.map((patient) => (
                      <ListItem
                        button
                        key={patient.id}
                        onClick={() => handleSelectPatient(patient)}
                      >
                        <ListItemText primary={`${patient.name} (ID: ${patient.id})`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Health Problem"
                  name="healthProblem"
                  multiline
                  rows={3}
                  value={formData.healthProblem}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '',
                      },
                      '&:hover fieldset': {
                        borderColor: 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black',
                      '&.Mui-focused': {
                        color: 'black',
                      },
                    },
                  }}
                />
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
                    marginTop: "15px",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Confirm Appointment
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
        onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Appointment;