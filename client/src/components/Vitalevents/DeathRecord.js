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
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useMediaQuery } from "@mui/material";
import deathRecords from "./DeathDummyData";
import { useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";

function DeathRow(props) {
  const { row, handleSaveChanges, handleDeleteRow, setSnackbarOpen, index } =
    props;
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
    handleDeleteRow(row.id);
    setSnackbarMessage("Record deleted successfully.");
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
        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">{row.deceasedName}</TableCell>
        {!isMobile && (
          <>
            <TableCell align="center">{row.dod}</TableCell>
            <TableCell align="center">{row.tod}</TableCell>
            <TableCell align="center">{row.gender}</TableCell>
            <TableCell align="center">{row.age}</TableCell>
            <TableCell align="center">{row.causeOfDeath}</TableCell>
          </>
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
      {!isMobile && (
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
                  Additional Details
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
                          paddingLeft: "80px",
                          fontWeight: "bold",
                          fontSize: "18px",
                          fontFamily: "Merriweather, serif",
                          height: "35px",
                        }}
                      >
                        Doctor's Name
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          fontFamily: "Merriweather, serif",
                          height: "35px",
                        }}
                      >
                        Hospital Name
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          fontFamily: "Merriweather, serif",
                          height: "35px",
                        }}
                      >
                        Room Number
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          paddingRight: "135px",
                          fontWeight: "bold",
                          fontSize: "18px",
                          fontFamily: "Merriweather, serif",
                          height: "35px",
                        }}
                      >
                        Notes
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" style={{ paddingLeft: "80px" }}>
                        {row.doctorName}
                      </TableCell>
                      <TableCell align="center">{row.hospitalName}</TableCell>
                      <TableCell align="center">{row.roomNumber}</TableCell>
                      <TableCell
                        align="center"
                        style={{ paddingRight: "135px" }}
                      >
                        {row.notes}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Edit Death Record Details: {editRowData ? editRowData.id : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the death record:
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="deceasedName"
            label="Deceased's Name"
            type="text"
            fullWidth
            value={editRowData ? editRowData.deceasedName : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                deceasedName: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="dod"
            label="Date of Death"
            type="date"
            fullWidth
            value={editRowData ? editRowData.dod : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                dod: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="tod"
            label="Time of Death"
            type="time"
            fullWidth
            value={editRowData ? editRowData.tod : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                tod: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="gender"
            label="Gender"
            type="text"
            fullWidth
            value={editRowData ? editRowData.gender : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                gender: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="age"
            label="Age"
            type="text"
            fullWidth
            value={editRowData ? editRowData.age : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                age: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="causeOfDeath"
            label="Cause of Death"
            type="text"
            fullWidth
            value={editRowData ? editRowData.causeOfDeath : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                causeOfDeath: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="doctorName"
            label="Doctor's Name"
            type="text"
            fullWidth
            value={editRowData ? editRowData.doctorName : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                doctorName: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="hospitalName"
            label="Hospital Name"
            type="text"
            fullWidth
            value={editRowData ? editRowData.hospitalName : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                hospitalName: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="roomNumber"
            label="Room Number"
            type="text"
            fullWidth
            value={editRowData ? editRowData.roomNumber : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                roomNumber: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="notes"
            label="Notes"
            type="text"
            fullWidth
            value={editRowData ? editRowData.notes : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                notes: e.target.value,
              }))
            }
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
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this death record?
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
          Death Record Details: {row.id} - {row.deceasedName}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Date of Death: {row.dod}</Typography>
          <Typography variant="subtitle1">Time of Death: {row.tod}</Typography>
          <Typography variant="subtitle1">Gender: {row.gender}</Typography>
          <Typography variant="subtitle1">Age: {row.age}</Typography>
          <Typography variant="subtitle1">
            Cause of Death: {row.causeOfDeath}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Additional Details
          </Typography>
          <Typography variant="subtitle1">
            Doctor's Name: {row.doctorName}
          </Typography>
          <Typography variant="subtitle1">
            Hospital Name: {row.hospitalName}
          </Typography>
          <Typography variant="subtitle1">
            Room Number: {row.roomNumber}
          </Typography>
          <Typography variant="subtitle1">Notes: {row.notes}</Typography>
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

DeathRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    deceasedName: PropTypes.string.isRequired,
    dod: PropTypes.string.isRequired,
    tod: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    causeOfDeath: PropTypes.string.isRequired,
    doctorName: PropTypes.string.isRequired,
    hospitalName: PropTypes.string.isRequired,
    roomNumber: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  snackbarOpen: PropTypes.bool.isRequired,
  setSnackbarOpen: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

function DeathRecordsTable() {
  const [currentRows, setCurrentRows] = useState(deathRecords);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleSaveChanges = (rowData) => {
    setCurrentRows((prevRows) =>
      prevRows.map((row) => (row.id === rowData.id ? rowData : row))
    );
    setSnackbarMessage("Changes saved successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleDeleteRow = (id) => {
    setCurrentRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);
      setSnackbarMessage("Record deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      return updatedRows;
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClickNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleClickPrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/vital-events");
  };

  const rowsPerPage = 10;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRowsPage = currentRows.slice(startIndex, endIndex);

  return (
    <div style={{ marginTop:"60px" }}>
      <div style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" }}>
        <IconButton
          onClick={handleBackClick}
          sx={{ marginBottom: -7, marginLeft: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            fontFamily: "Georgia, serif",
            height: "40px",
            paddingTop: "5px",
          }}
        >
          Death Records
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
                  ID
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
                  Deceased's Name
                </TableCell>
                {!isMobile && (
                  <>
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
                      Date of Death
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
                      Time of Death
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
                      Gender
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
                      Age
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
                      Cause of Death
                    </TableCell>
                  </>
                )}
                <TableCell
                  align="center"
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
              {currentRowsPage.map((row, index) => (
                <DeathRow
                  key={row.id}
                  row={row}
                  handleSaveChanges={handleSaveChanges}
                  handleDeleteRow={handleDeleteRow}
                  snackbarOpen={snackbarOpen}
                  setSnackbarOpen={setSnackbarOpen}
                  index={index}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Button
                    onClick={handleClickPrev}
                    disabled={page === 1}
                    sx={{
                      backgroundColor: "lightgray",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#c0c0c0",
                      },
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleClickNext}
                    disabled={currentRows.length <= page * rowsPerPage}
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
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}

export default DeathRecordsTable;
