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
  Grid,
} from "@mui/material";

function createData(serialNo, name, description) {
  return { serialNo, name, description };
}

const generateDummyData = () => {
  const data = [];
  let counter = 1;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
      data.push(createData(counter, `Department ${counter}`, `Description for Department ${counter}`));
      counter++;
    }
  }
  return data;
};

const DepartmentList = () => {
  const [rows, setRows] = useState(generateDummyData());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [editDepartment, setEditDepartment] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [page, setPage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const rowsPerPage = 10;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleEdit = (serialNo) => {
    const department = rows.find((dept) => dept.serialNo === serialNo);
    setEditDepartment(department);
    setEditedName(department.name);
    setEditedDescription(department.description);
  };

  const saveEditedDepartment = () => {
    const updatedDepartment = {
      ...editDepartment,
      name: editedName,
      description: editedDescription,
    };

    const updatedRows = rows.map((dept) =>
      dept.serialNo === updatedDepartment.serialNo ? updatedDepartment : dept
    );

    setRows(updatedRows);
    setEditDepartment(null);
    setSuccessMessage("Department information saved successfully");
  };

  const handleDelete = (serialNo) => {
    setConfirmDelete(true);
    setDepartmentToDelete(serialNo);
  };

  const handleConfirmDelete = () => {
    const updatedRows = rows.filter((dept) => dept.serialNo !== departmentToDelete);
    setRows(updatedRows);
    setConfirmDelete(false);
    setErrorMessage("Department deleted successfully");
  };

  const handleCloseDialog = () => {
    setConfirmDelete(false);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
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
        
        overflowX: "auto",
        textAlign: "center",
        width: "100%",
        marginTop:"60px",
      }}
    >
      <div>
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
            Department List
          </Typography>
          <Table aria-label="department table">
            <TableHead style={{ backgroundColor: "grey" }}>
              <TableRow>
                <TableCell align="center" style={{ color: "white" }}>
                  SI No.
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Department Name
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Description
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
                    <TableCell align="center">{row.description}</TableCell>
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
          <Grid container justifyContent="center" style={{ marginTop: "20px", marginBottom:"20px" }}>
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
            Are you sure you want to delete this department?
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

      <Dialog open={!!editDepartment} onClose={() => setEditDepartment(null)}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            SI No.: {editDepartment && editDepartment.serialNo}
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
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={editedDescription}
            onChange={handleDescriptionChange}
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
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setEditDepartment(null)}
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
            onClick={saveEditedDepartment}
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

export default DepartmentList;
