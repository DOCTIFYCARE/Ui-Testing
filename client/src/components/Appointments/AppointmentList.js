import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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


const generateDummyData = () => {
  const dummyData = [];
  for (let i = 1; i <= 50; i++) {
    dummyData.push({
      serialNumber: i,
      doctor: `Dr. ${String.fromCharCode(64 + (i % 26))} ${i}`,
      date: `2024-05-${(i % 30) + 1}`,
      time: `${(i % 12) + 1}:00 ${i % 2 === 0 ? "AM" : "PM"}`,
      healthProblems: `Problem ${i}`,
      history: [
        {
          date: `2024-04-${(i % 30) + 1}`,
          description: `Past Appointment ${i}`,
          notes: `Notes for past appointment ${i}`,
        },
        {
          date: `2024-06-${(i % 30) + 1}`,
          description: `Upcoming Appointment ${i}`,
          notes: `Notes for upcoming appointment ${i}`,
        },
      ],
    });
  }
  return dummyData;
};

const dummyAppointmentData = generateDummyData();

function Row(props) {
  const {
    row,
    handleSaveChanges,
    handleDeleteRow,
    setSnackbarOpen,
    index,
  } = props;

  const [open, setOpen] = useState(false);
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
    setSnackbarMessage("Appointment deleted successfully.");
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
        <TableCell align="center"
          sx={{ display: { xs: "table-cell", md: "table-cell" } }}
        >
          {row.serialNumber}
        </TableCell>
        <TableCell align="center"
          sx={{ display: { xs: "table-cell", md: "table-cell" } }}
        >
          {row.doctor}
        </TableCell>
        {!isMobile && (
          <React.Fragment>
            <TableCell align="center"
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              {row.date}
            </TableCell>
            <TableCell align="center"
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              {row.time}
            </TableCell>
            <TableCell align="center"
              sx={{ display: { xs: "none", md: "table-cell" } }}
            >
              {row.healthProblems}
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

          {!isMobile && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ fontFamily: "Georgia, serif", paddingLeft: "50px" }}
              >
                Appointment History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "gray",
                    }}
                  >
                    <TableCell
                      align="center"
                      style={{
                        paddingLeft: "80px", fontWeight: "bold", fontSize: "18px",
                        fontFamily: "Merriweather, serif",
                        height: "35px",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell align="center" style={{
                      fontWeight: "bold", fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      height: "35px",
                    }}>
                      Description
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        paddingRight: "135px", fontWeight: "bold", fontSize: "18px",
                        fontFamily: "Merriweather, serif",
                        height: "35px",
                      }}
                    >
                      Notes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" style={{ paddingLeft: "80px" }}>
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.description}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ paddingRight: "135px" }}
                      >
                        {historyRow.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Edit Appointment Details: {editRowData ? editRowData.serialNumber : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the details of the appointment:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="doctor"
            label="Doctor"
            type="text"
            fullWidth
            value={editRowData ? editRowData.doctor : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                doctor: e.target.value,
              }))
            }
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
            id="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editRowData ? editRowData.date : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                date: e.target.value,
              }))
            }
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
            id="time"
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editRowData ? editRowData.time : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                time: e.target.value,
              }))
            }
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
            id="healthProblems"
            label="Health Problems"
            type="text"
            fullWidth
            value={editRowData ? editRowData.healthProblems : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                healthProblems: e.target.value,
              }))
            }
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
         
          <Typography variant="h6" gutterBottom component="div" mt={2}>
            Appointment History
          </Typography>

          {editRowData &&
            editRowData.history.map((historyRow, index) => (
              <div key={index}>
                <TextField
                  margin="dense"
                  id={`description-${index}`}
                  label="Description"
                  type="text"
                  fullWidth
                  value={historyRow.description || ""}
                  onChange={(e) =>
                    setEditRowData((prevData) => ({
                      ...prevData,
                      history: prevData.history.map((item, idx) =>
                        idx === index
                          ? { ...item, description: e.target.value }
                          : item
                      ),
                    }))
                  }
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
                  id={`notes-${index}`}
                  label="Notes"
                  type="text"
                  fullWidth
                  value={historyRow.notes || ""}
                  onChange={(e) =>
                    setEditRowData((prevData) => ({
                      ...prevData,
                      history: prevData.history.map((item, idx) =>
                        idx === index ? { ...item, notes: e.target.value } : item
                      ),
                    }))
                  }
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
              </div>
            ))}
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
            Are you sure you want to delete this appointment?
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
          Appointment Details: {row.serialNumber} - {row.doctor}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Serial Number: {row.serialNumber}</Typography>
          <Typography variant="subtitle1">Doctor: {row.doctor}</Typography>
          <Typography variant="subtitle1">Date: {row.date}</Typography>
          <Typography variant="subtitle1">Time: {row.time}</Typography>
          <Typography variant="subtitle1">Health Problems: {row.healthProblems}</Typography>
          <Typography variant="h6" gutterBottom>Appointment History</Typography>
          {row.history.map((historyRow, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1">Date: {historyRow.date}</Typography>
              <Typography variant="subtitle1">Description: {historyRow.description}</Typography>
              <Typography variant="subtitle1">Notes: {historyRow.notes}</Typography>
            </Box>
          ))}
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
    doctor: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    healthProblems: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        notes: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  snackbarOpen: PropTypes.bool.isRequired,
  setSnackbarOpen: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

function AppointmentList() {

  const [rows, setRows] = useState(dummyAppointmentData);
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
    setRows((prevRows) => prevRows.filter((row) => row.serialNumber !== serialNumber));
    setSnackbarMessage("Appointment deleted successfully.");
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
      <div style={{  width:"100%", marginTop:"60px" }}>
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
            Appointments Table
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
                    sx={{ display: { xs: "none", md: "table-cell" } }} 
                    style={{
                      fontSize: "18px",
                      fontFamily: "Merriweather, serif",
                      fontWeight: "bold",
                      height: "35px",
                    }}
                  >
                    Doctor
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
                    Date
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
                    Time
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
                    Health Problems
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
              horizontal: "right"
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
export default AppointmentList;