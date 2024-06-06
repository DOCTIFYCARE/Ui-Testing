import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";

function createData(serialNo, name, age, gender) {
  return { serialNo, name, age, gender };
}

const generateDummyData = () => {
  const data = [];
  let counter = 1;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
      const age =
        j % 2 === 0
          ? Math.floor(Math.random() * 100)
          : Math.floor(Math.random() * 18) + 1;
      const gender =
        Math.random() < 0.5
          ? "Male"
          : Math.random() < 0.75
          ? "Female"
          : "Other";
      data.push(createData(counter, `Patient ${counter}`, age, gender));
      counter++;
    }
  }
  return data;
};

const PatientList = () => {
  const [rows, setRows] = useState(generateDummyData());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [editPatient, setEditPatient] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedAge, setEditedAge] = useState("");
  const [editedGender, setEditedGender] = useState("");
  const [page, setPage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const rowsPerPage = 10;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEdit = (serialNo) => {
    const patient = rows.find((pat) => pat.serialNo === serialNo);
    setEditPatient(patient);
    setEditedName(patient.name);
    setEditedAge(patient.age);
    setEditedGender(patient.gender);
  };

  const saveEditedPatient = () => {
    const updatedPatient = {
      ...editPatient,
      name: editedName,
      age: editedAge,
      gender: editedGender,
    };

    const updatedRows = rows.map((pat) =>
      pat.serialNo === updatedPatient.serialNo ? updatedPatient : pat
    );

    setRows(updatedRows);

    setEditPatient(null);

    setSuccessMessage("Patient information saved successfully");
  };

  const handleDelete = (serialNo) => {
    setConfirmDelete(true);
    setPatientToDelete(serialNo);
  };

  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((pat) => pat.serialNo !== patientToDelete);

    setRows(updatedRows);

    setConfirmDelete(false);

    setErrorMessage("Patient deleted successfully");
  };

  const handleCloseDialog = () => {
    setConfirmDelete(false);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setEditedAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setEditedGender(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const getRowStyle = (index) => ({
    backgroundColor: index % 2 === 0 ? 'white' : 'lightgrey',
  });

  return (
    <div
      style={{
       
        marginTop: "60px",
        overflowX: "auto",
        textAlign: "center",
        width:"100%",
      }}
    >
      <div style={{  }}>
        <TableContainer component={Paper}>
          <Typography
            variant="h4"
            gutterBottom
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontFamily: "Georgia, serif",
            }}
          >
            Patient List
          </Typography>
          <Table aria-label="patient table">
            <TableHead style={{ backgroundColor: "grey" }}>
              <TableRow>
                <TableCell align="center" style={{ color: "white" }}>
                  SI No.
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Name
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Age
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Gender
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.serialNo} style={getRowStyle(index)}>
                    <TableCell align="center">{row.serialNo}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                    <TableCell align="center">{row.gender}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(row.serialNo)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(row.serialNo)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Grid container justifyContent="center" style={{ marginTop: "20px" , marginBottom:"20px" }}>
            <Button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              sx={{
               
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "#c0c0c0",
                },
              }}
            >
              Prev
            </Button>
            <Button
              onClick={() => handleChangePage(page + 1)}
              disabled={(page + 1) * rowsPerPage >= rows.length}
              sx={{
              
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "#c0c0c0",
                },
              }}
            >
              Next
            </Button>
          </Grid>
        </TableContainer>
      </div>

      <Dialog open={confirmDelete} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this patient?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
              "&:active": {
                backgroundColor: "lightgray",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            variant="contained"
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
              "&:active": {
                backgroundColor: "lightgray",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!editPatient} onClose={() => setEditPatient(null)}>
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            SI No.: {editPatient && editPatient.serialNo}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={editedName}
            onChange={handleNameChange}
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
          <TextField
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            value={editedAge}
            onChange={handleAgeChange}
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
          <TextField
            margin="dense"
            id="gender"
            label="Gender"
            select
            fullWidth
            value={editedGender}
            onChange={handleGenderChange}
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
          >
            <InputLabel>Gender</InputLabel>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setEditPatient(null)}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
              "&:active": {
                backgroundColor: "lightgray",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={saveEditedPatient}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "gray",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgray",
              },
              "&:active": {
                backgroundColor: "lightgray",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PatientList;