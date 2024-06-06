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
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  InputLabel,
  Grid,
  ToggleButton,
  useMediaQuery,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { dummyData } from "./DummyData";

export default function DoctorTable() {
  const isMobileView = useMediaQuery("(max-width: 600px)");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedAge, setEditedAge] = useState("");
  const [editedDepartment, setEditedDepartment] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [rows, setRows] = useState(dummyData);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEdit = (id) => {
    const doctor = rows.find((doc) => doc.id === id);
    setEditDoctor(doctor);
    setEditedName(doctor.fullName);
    setEditedAge(doctor.age);
    setEditedDepartment(doctor.department);
    setEditedStatus(doctor.status);
  };

  const saveEditedDoctor = () => {
    if (editedName.trim() === "" || editedAge.toString().trim() === "") {
      handleOpenSnackbar("Full Name and Age cannot be empty", "warning");
      return;
    }

    const updatedDoctor = {
      ...editDoctor,
      fullName: editedName,
      age: editedAge,
      department: editedDepartment,
      status: editedStatus,
    };

    const updatedRows = rows.map((doc) =>
      doc.id === updatedDoctor.id ? updatedDoctor : doc
    );

    setRows(updatedRows);

    setEditDoctor(null);

    handleOpenSnackbar("Doctor details saved successfully", "success");
  };

  const handleDelete = (id) => {
    setConfirmDelete(true);
    setDoctorToDelete(id);
  };

  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((doc) => doc.id !== doctorToDelete);

    setRows(updatedRows);

    setConfirmDelete(false);

    handleOpenSnackbar("Doctor deleted successfully", "success");
  };

  const handleCloseDialog = () => {
    setConfirmDelete(false);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(newName)) {
      setEditedName(newName);
    }
  };

  const handleAgeChange = (event) => {
    setEditedAge(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setEditedDepartment(event.target.value);
  };

  const handleStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div style={{  marginTop:"60px", width:"100%" }}>
      <div>
        <TableContainer component={Paper}>
          <Typography
            variant="h4"
            gutterBottom
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
              fontFamily: "Georgia, serif",
            }}
          >
            Doctor's List
          </Typography>
          <Table
            sx={{
              ...(isMobileView && { maxWidth: 400 }),
              minWidth: 300,
            }}
            aria-label="doctor table"
          >
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "gray",
                }}
              >
                <TableCell
                  align="center"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Merriweather, serif",
                    fontWeight: "bold",
                    height: "35px",
                  }}
                >
                  Doctor ID
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Merriweather, serif",
                    fontWeight: "bold",
                  }}
                >
                  Full Name
                </TableCell>
                {isMobileView && (
                  <TableCell
                    align="center"
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                    }}
                  >
                    Actions
                  </TableCell>
                )}
                {!isMobileView && (
                  <>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "18px",
                        fontFamily: "Merriweather, serif",
                        fontWeight: "bold",
                      }}
                    >
                      Age
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "18px",
                        fontFamily: "Merriweather, serif",
                        fontWeight: "bold",
                      }}
                    >
                      Department
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "18px",
                        fontFamily: "Merriweather, serif",
                        fontWeight: "bold",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "18px",
                        fontFamily: "Merriweather, serif",
                        fontWeight: "bold",
                      }}
                    >
                      Actions
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={
                      index % 2 === 1 ? { backgroundColor: "lightgray" } : null
                    }
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.fullName}</TableCell>
                    {isMobileView && (
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                    {!isMobileView && (
                      <>
                        <TableCell align="center">{row.age}</TableCell>
                        <TableCell align="center">{row.department}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEdit(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {(isMobileView || !isMobileView) && (
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <ToggleButton
                value="prev"
                onChange={() => handleChangePage(page - 1)}
                disabled={page === 0}
                size="small"
                sx={{
                  
                  backgroundColor: "lightgray",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#c0c0c0",
                  },
                }}
              >
                Prev
              </ToggleButton>
              <ToggleButton
                value="next"
                onChange={() => handleChangePage(page + 1)}
                disabled={(page + 1) * rowsPerPage >= rows.length}
                size="small"
                sx={{
                  
                  backgroundColor: "lightgray",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#c0c0c0",
                  },
                }}
              >
                Next
              </ToggleButton>
            </Grid>
          )}
        </TableContainer>
      </div>

      <Dialog open={confirmDelete} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this doctor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justifyContent="center"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <ToggleButton
              value="cancel"
              onClick={handleCloseDialog}
              size="small"
              sx={{
                marginRight: 1,
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "#c0c0c0",
                },
              }}
            >
              Cancel
            </ToggleButton>
            <ToggleButton
              value="delete"
              onClick={handleConfirmDelete}
              size="small"
              sx={{
                marginRight: 1,
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "#c0c0c0",
                },
              }}
            >
              Delete
            </ToggleButton>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog open={!!editDoctor} onClose={() => setEditDoctor(null)}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Doctor ID: {editDoctor && editDoctor.id}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            value={editedName}
            onChange={handleNameChange}
            InputProps={{
              style: {
                borderColor: "black",
                "&:focus": {
                  borderColor: "black",
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: "black",
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
          />
          <TextField
            margin="dense"
            id="department"
            label="Department"
            select
            fullWidth
            value={editedDepartment}
            onChange={handleDepartmentChange}
          >
            <InputLabel>Department</InputLabel>
            <MenuItem value="Cardiology">Cardiology</MenuItem>
            <MenuItem value="Neurology">Neurology</MenuItem>
            <MenuItem value="Orthopedics">Orthopedics</MenuItem>
            <MenuItem value="Pediatrics">Pediatrics</MenuItem>
            <MenuItem value="Oncology">Oncology</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="status"
            label="Status"
            select
            fullWidth
            value={editedStatus}
            onChange={handleStatusChange}
          >
            <InputLabel>Status</InputLabel>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Grid
            container
            justifyContent="center"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <ToggleButton
              value="cancel"
              onClick={() => setEditDoctor(null)}
              size="small"
              sx={{
                marginRight: 1,
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "#c0c0c0",
                },
              }}
            >
              Cancel
            </ToggleButton>
            <ToggleButton
              value="save"
              onClick={saveEditedDoctor}
              size="small"
              sx={{
                marginRight: 1,
                backgroundColor: "lightgray",
                color: "black",
                "&:hover": {
                  backgroundColor: "#c0c0c0",
                },
              }}
            >
              Save
            </ToggleButton>
          </Grid>
        </DialogActions>
      </Dialog>

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
    </div>
  );
}
