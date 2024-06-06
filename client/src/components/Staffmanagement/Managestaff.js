import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableFooter } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const generateRandomPhoneNumber = () => {
  let phoneNumber = "";
  for (let i = 0; i < 10; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
};

const generateDummyData = () => {
  const dummyData = [];
  for (let i = 1; i <= 50; i++) {
    dummyData.push({
      serialNumber: i,
      staffName: `Staff ${i}`,
      department: `Department ${i}`,
      designation: ` ${String.fromCharCode(64 + (i % 26))} ${i}`,
      contactNumber: generateRandomPhoneNumber(),
      joiningDate: `2024-05-${(i % 30) + 1}`,
    });
  }
  return dummyData;
};

const dummyStaffData = generateDummyData();

function Row(props) {
  const { row, handleSaveChanges, handleDeleteRow, setSnackbarOpen, index } =
    props;

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [visibilityDialogOpen, setVisibilityDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [, setSnackbarMessage] = useState("");
  const [, setSnackbarSeverity] = useState("success");

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleEditClick = (rowData) => {
    setEditRowData(rowData);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveChangesLocal = () => {
    if (editRowData) {
      handleSaveChanges(editRowData);
      setSnackbarMessage("Changes saved successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseEditDialog();
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteRow(row.serialNumber);
    setSnackbarMessage("Staff Details deleted successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    handleCloseDeleteDialog();
  };

  const handleVisibilityClick = () => {
    setVisibilityDialogOpen(true);
  };

  const handleCloseVisibilityDialog = () => {
    setVisibilityDialogOpen(false);
  };

  const rowStyle =
    index % 2 === 0
      ? { backgroundColor: "white" }
      : { backgroundColor: "lightgray" };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset", height: "24px" }, ...rowStyle }}
      >
        <TableCell
          align="center"
          sx={{ display: { xs: "table-cell", md: "table-cell" } }}
        >
          {row.serialNumber}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "table-cell", md: "table-cell" } }}
        >
          {row.staffName}
        </TableCell>
        {!isMobile && (
          <React.Fragment>
            <TableCell
              align="center"
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              {row.department}
            </TableCell>
            <TableCell
              align="center"
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              {row.designation}
            </TableCell>
            <TableCell
              align="center"
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              {row.contactNumber}
            </TableCell>
            <TableCell
              align="center"
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              {row.joiningDate}
            </TableCell>
          </React.Fragment>
        )}
        <TableCell align="center">
          {!isMobile && (
            <IconButton aria-label="edit" onClick={() => handleEditClick(row)}>
              <EditIcon />
            </IconButton>
          )}
          {isMobile && (
            <IconButton aria-label="visibility" onClick={handleVisibilityClick}>
              <VisibilityIcon />
            </IconButton>
          )}
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Edit Staff Details: {editRowData ? editRowData.serialNumber : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the details of the Staff:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="staffName"
            label="Staff Name"
            type="text"
            fullWidth
            value={editRowData ? editRowData.staffName : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                staffName: e.target.value,
              }))
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "",
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
          <TextField
            margin="dense"
            id="department"
            label=" Department"
            type="text"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editRowData ? editRowData.department : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                department: e.target.value,
              }))
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "",
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
          <TextField
            margin="dense"
            id="designation"
            label="Designation"
            type="text"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editRowData ? editRowData.designation : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                designation: e.target.value,
              }))
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "",
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
          <TextField
            margin="dense"
            id="contactNumber"
            label="Contact Number"
            type="text"
            fullWidth
            value={editRowData ? editRowData.contactNumber : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                contactNumber: e.target.value,
              }))
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "",
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
          <TextField
            margin="dense"
            id="joiningDate"
            label="Joining Date"
            type="joiningDate"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editRowData ? editRowData.joiningDate : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                joiningDate: e.target.value,
              }))
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "",
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditDialog}
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
          </Button>
          <Button
            onClick={handleSaveChangesLocal}
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
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
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
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              marginRight: 1,
              backgroundColor: "lightgray",
              color: "black",
              "&:hover": {
                backgroundColor: "#c0c0c0",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={visibilityDialogOpen} onClose={handleCloseVisibilityDialog}>
        <DialogTitle>
          Staff Details: {row.serialNumber} - {row.staffName}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Serial Number: {row.serialNumber}
          </Typography>
          <Typography variant="subtitle1">
            Staff Name: {row.staffName}
          </Typography>
          <Typography variant="subtitle1">
            Department: {row.department}
          </Typography>
          <Typography variant="subtitle1">
            Designation: {row.designation}
          </Typography>
          <Typography variant="subtitle1">
            Contact Number: {row.contactNumber}
          </Typography>
          <Typography variant="subtitle1">
            Joining Date: {row.joiningDate}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => handleEditClick(row)}
            sx={{
              marginRight: 1,
              backgroundColor: "lightgray",
              color: "black",
              "&:hover": {
                backgroundColor: "#c0c0c0",
              },
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleCloseVisibilityDialog}
            sx={{
              marginRight: 1,
              backgroundColor: "lightgray",
              color: "black",
              "&:hover": {
                backgroundColor: "#c0c0c0",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    serialNumber: PropTypes.number.isRequired,
    staffName: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    joiningDate: PropTypes.string.isRequired,
  }).isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  setSnackbarOpen: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

function StaffList() {
  const [rows, setRows] = useState(dummyStaffData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSaveChanges = (updatedRow) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.serialNumber === updatedRow.serialNumber ? updatedRow : row
      )
    );
    setSnackbarMessage("Changes saved successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleDeleteRow = (serialNumber) => {
    setRows((prevRows) =>
      prevRows.filter((row) => row.serialNumber !== serialNumber)
    );
    setSnackbarMessage("Details deleted successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <ThemeProvider theme={createTheme()}>
      <div style={{ width: "100%", marginTop: "60px" }}>
        <div style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{
              fontFamily: "Georgia, serif",
              height: "40px",
              paddingTop: "15px",
            }}
          >
            Staff List
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ backgroundColor: "gray" }}>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "table-cell", md: "table-cell" } }}
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Serial Number
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "table-cell", md: "table-cell" } }}
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Staff Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Department
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Designation
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Contact Number
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Joining Date
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: { xs: "table-cell", md: "table-cell" } }}
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {currentRows.map((row, index) => (
                  <Row
                    key={row.serialNumber}
                    row={row}
                    handleSaveChanges={handleSaveChanges}
                    handleDeleteRow={handleDeleteRow}
                    setSnackbarOpen={setSnackbarOpen}
                    index={index}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Button
                      onClick={() => handleChangePage(currentPage - 1)}
                      disabled={currentPage === 1}
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
                      onClick={() => handleChangePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
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
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={snackbarOpen}
            autoHideDuration={3000}
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
      </div>
    </ThemeProvider>
  );
}

export default StaffList;
