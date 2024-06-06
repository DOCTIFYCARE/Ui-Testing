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
import dummyMedData from "./dummyMedData";

function Row(props) {
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
    handleDeleteRow(row.serialNumber);
    setSnackbarMessage("Medicine deleted successfully.");
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
          {row.medicineName}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {row.dosageForm}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {row.quantity}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {row.unitPrice}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {row.availabilityStatus}
        </TableCell>
        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {row.prescriptionRequired}
        </TableCell>
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
                      Date
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
                      Description
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
                      Manufacturer
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
                      Batch Number
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
                      Expiration Date
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
                      Supplier Information
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
                      <TableCell align="center">
                        {historyRow.manufacturer}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.batchNumber}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow.expirationDate}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ paddingRight: "135px" }}
                      >
                        {historyRow.supplierInformation}
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
          Edit Medicine Details: {editRowData ? editRowData.serialNumber : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the medicine:
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="medicineName"
            label="Medicine Name"
            type="text"
            fullWidth
            value={editRowData ? editRowData.medicineName : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                medicineName: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="dosageForm"
            label="Dosage Form"
            type="text"
            fullWidth
            value={editRowData ? editRowData.dosageForm : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                dosageForm: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={editRowData ? editRowData.quantity : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                quantity: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="unitPrice"
            label="Unit Price"
            type="number"
            fullWidth
            value={editRowData ? editRowData.unitPrice : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                unitPrice: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="availabilityStatus"
            label="Availability Status"
            type="text"
            fullWidth
            value={editRowData ? editRowData.availabilityStatus : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                availabilityStatus: e.target.value,
              }))
            }
          />
          <TextField
            margin="dense"
            id="prescriptionRequired"
            label="Prescription Required"
            type="text"
            fullWidth
            value={editRowData ? editRowData.prescriptionRequired : ""}
            onChange={(e) =>
              setEditRowData((prevData) => ({
                ...prevData,
                prescriptionRequired: e.target.value,
              }))
            }
          />

          <Typography variant="h6" gutterBottom component="div" mt={2}>
            Additional Details
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
                />
                <TextField
                  margin="dense"
                  id={`manufacturer-${index}`}
                  label="Manufacturer"
                  type="text"
                  fullWidth
                  value={historyRow.manufacturer || ""}
                  onChange={(e) =>
                    setEditRowData((prevData) => ({
                      ...prevData,
                      history: prevData.history.map((item, idx) =>
                        idx === index
                          ? { ...item, manufacturer: e.target.value }
                          : item
                      ),
                    }))
                  }
                />
                <TextField
                  margin="dense"
                  id={`batchNumber-${index}`}
                  label="Batch Number"
                  type="text"
                  fullWidth
                  value={historyRow.batchNumber || ""}
                  onChange={(e) =>
                    setEditRowData((prevData) => ({
                      ...prevData,
                      history: prevData.history.map((item, idx) =>
                        idx === index
                          ? { ...item, batchNumber: e.target.value }
                          : item
                      ),
                    }))
                  }
                />
                <TextField
                  margin="dense"
                  id={`expirationDate-${index}`}
                  label="Expiration Date"
                  type="text"
                  fullWidth
                  value={historyRow.expirationDate || ""}
                  onChange={(e) =>
                    setEditRowData((prevData) => ({
                      ...prevData,
                      history: prevData.history.map((item, idx) =>
                        idx === index
                          ? { ...item, expirationDate: e.target.value }
                          : item
                      ),
                    }))
                  }
                />
                <TextField
                  margin="dense"
                  id={`supplierInformation-${index}`}
                  label="Supplier Information"
                  type="text"
                  fullWidth
                  value={historyRow.supplierInformation || ""}
                  onChange={(e) =>
                    setEditRowData((prevData) => ({
                      ...prevData,
                      history: prevData.history.map((item, idx) =>
                        idx === index
                          ? { ...item, supplierInformation: e.target.value }
                          : item
                      ),
                    }))
                  }
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
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this medicine?
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
          Medicine Details: {row.serialNumber} - {row.medicineName}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Dosage Form: {row.dosageForm}
          </Typography>
          <Typography variant="subtitle1">Quantity: {row.quantity}</Typography>
          <Typography variant="subtitle1">
            Unit Price: {row.unitPrice}
          </Typography>
          <Typography variant="subtitle1">
            Availability Status: {row.availabilityStatus}
          </Typography>
          <Typography variant="subtitle1">
            Prescription Required: {row.prescriptionRequired}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Additional Details
          </Typography>
          {row.history.map((historyRow, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1">
                Date: {historyRow.date}
              </Typography>
              <Typography variant="subtitle1">
                Description: {historyRow.description}
              </Typography>
              <Typography variant="subtitle1">
                Manufacturer: {historyRow.manufacturer}
              </Typography>
              <Typography variant="subtitle1">
                Batch Number: {historyRow.batchNumber}
              </Typography>
              <Typography variant="subtitle1">
                Expiration Date: {historyRow.expirationDate}
              </Typography>
              <Typography variant="subtitle1">
                Supplier Information: {historyRow.supplierInformation}
              </Typography>
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
    medicineName: PropTypes.string.isRequired,
    dosageForm: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    unitPrice: PropTypes.number.isRequired,
    availabilityStatus: PropTypes.string.isRequired,
    prescriptionRequired: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        manufacturer: PropTypes.string.isRequired,
        batchNumber: PropTypes.string.isRequired,
        expirationDate: PropTypes.string.isRequired,
        supplierInformation: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  snackbarOpen: PropTypes.bool.isRequired,
  setSnackbarOpen: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

function CollapsibleTable() {
  const [currentRows, setCurrentRows] = useState(dummyMedData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(1);

  const handleSaveChanges = (rowData) => {
    setCurrentRows((prevRows) =>
      prevRows.map((row) =>
        row.serialNumber === rowData.serialNumber ? rowData : row
      )
    );
    setSnackbarMessage("Changes saved successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleDeleteRow = (serialNumber) => {
    setCurrentRows((prevRows) => {
      const updatedRows = prevRows.filter(
        (row) => row.serialNumber !== serialNumber
      );
      setSnackbarMessage("Data deleted successfully.");
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

  const rowsPerPage = 10;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRowsPage = currentRows.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "20px", marginTop:"60px" }}>
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
          Pharmacy Inventory
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "gray",
                }}
              >
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
                  Medicine Name
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
                  Dosage Form
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
                  Quantity
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
                  Unit Price
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
                  Availability Status
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
                  Prescription Required
                </TableCell>
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
                <Row
                  key={row.serialNumber}
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
                <TableCell colSpan={9} align="center">
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
                    Prev
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

export default CollapsibleTable;
