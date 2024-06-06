import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
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
import { Grid } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


const generateDummyData = () => {
    const patientNames = [
        "Arjun Reddy", "Bhavana Nair", "Chitra Kumar", "Deepak Reddy", "Eshwar Iyer",
        "Farida Khan", "Gopal Krishna", "Hari Narayan", "Indira Varma", "Jayant Rao",
        "Kavita Reddy", "Lakshmi Menon", "Manoj Kumar", "Nidhi Reddy", "Om Prakash",
        "Pavan Kumar", "Ravi Shankar", "Sita Ram", "Tara Iyer", "Uma Maheshwari",
        "Vijay Reddy", "Yashwanth Kumar", "Zara Khan", "Asha Iyer", "Balaji Rao",
        "Chandrika Iyer", "Divya Reddy", "Eknath Reddy", "Firoz Khan", "Gauri Menon",
        "Hema Kumar", "Isha Reddy", "Jaya Kumar", "Kiran Menon", "Lalita Rao",
        "Mohan Reddy", "Nalini Iyer", "Omkara Rao", "Padmini Reddy", "Ramesh Kumar",
        "Sanjay Reddy", "Tejas Rao", "Usha Reddy", "Vikram Kumar", "Yamini Iyer",
        "Ananya Menon", "Bharat Kumar", "Chandan Rao", "Dhruv Reddy", "Esha Nair"
    ];

    const labTechnicianNames = [
        "Lab Tech Anand", "Lab Tech Bhanu", "Lab Tech Chitra", "Lab Tech Deepak", "Lab Tech Eswar",
        "Lab Tech Farhan", "Lab Tech Geeta", "Lab Tech Hari", "Lab Tech Indu", "Lab Tech Jay",
        "Lab Tech Kavita", "Lab Tech Lakshmi", "Lab Tech Manoj", "Lab Tech Nandini", "Lab Tech Omkar",
        "Lab Tech Preethi", "Lab Tech Rakesh", "Lab Tech Sunil", "Lab Tech Tara", "Lab Tech Uma",
        "Lab Tech Vikas", "Lab Tech Yash", "Lab Tech Zoya", "Lab Tech Ananya", "Lab Tech Bharat"
    ];

    const dummyData = [];
    for (let i = 1; i <= 50; i++) {
        dummyData.push({
            testName: i % 2 === 0 ? "Blood Test" : "Urine Test",
            patientName: patientNames[i % patientNames.length],
            testDate: `2024-05-${(i % 30) + 1}`,
            labResults: {
                resultDate: `2024-06-${(i % 30) + 1}`,
                testResult: i % 2 === 0 ? "Normal" : "Abnormal",
                labTechnicianName: labTechnicianNames[i % labTechnicianNames.length],
                notes: "No issues",
            },
        });
    }
    return dummyData;
};

const dummyTestData = generateDummyData();

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
    const [, setVisibilityDialogOpen] = useState(false);
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
        setSnackbarMessage("Test deleted successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        handleCloseDeleteDialog();
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
            <TableRow sx={{ "& > *": { borderBottom: "unset", height: "24px" }, ...rowStyle }}>

                <TableCell align="center" sx={{ display: { xs: "table-cell", md: "table-cell" } }}>
                    {row.testName}
                </TableCell>

                <TableCell align="center" sx={{ display: { xs: "table-cell", md: "table-cell" } }}>
                    {row.patientName}
                </TableCell>

                {!isMobile && (
                    <React.Fragment>

                        <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
                            {row.labResults.resultDate}
                        </TableCell>
                        <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
                            {row.labResults.labTechnicianName}
                        </TableCell>
                        <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
                            {row.labResults.testResult}
                        </TableCell>
                        <TableCell align="center" sx={{ display: { xs: "none", md: "table-cell" } }}>
                            {row.labResults.notes}
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
                        <IconButton aria-label="visibility" onClick={() => handleEditClick(row)}>
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
                    Edit Test Details: {editRowData ? editRowData.serialNumber : ""}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit the details of the test:</DialogContentText>

                    {editRowData && (
                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    autoFocus
                                    margin="dense"
                                        label="Test Name"
                                        value={editRowData ? editRowData.testName : ""}
                                        onChange={(e) =>
                                            setEditRowData((prev) => ({
                                                ...prev,
                                                testName: e.target.value,
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: 'black',
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
                                        autoFocus
                                        margin="dense"
                                        label="Patient Name"
                                        value={editRowData ? editRowData.patientName : ""}
                                        onChange={(e) =>
                                            setEditRowData((prev) => ({
                                                ...prev,
                                                patientName: e.target.value,
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: 'black',
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
                                        label="Test Date"
                                        type="date"
                                        value={editRowData ? editRowData.testDate : ""}
                                        onChange={(e) =>
                                            setEditRowData((prev) => ({
                                                ...prev,
                                                testDate: e.target.value,
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: 'black',
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
                                        label="Lab Technician Name"
                                        value={editRowData ? editRowData.labResults.labTechnicianName : ""}
                                        onChange={(e) =>
                                            setEditRowData((prev) => ({
                                                ...prev,
                                                labResults: {
                                                    ...prev.labResults,
                                                    labTechnicianName: e.target.value,
                                                },
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: 'black',
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
                                        label="Test Result"
                                        value={editRowData ? editRowData.labResults.testResult : ""}
                                        onChange={(e) =>
                                            setEditRowData((prev) => ({
                                                ...prev,
                                                labResults: {
                                                    ...prev.labResults,
                                                    testResult: e.target.value,
                                                },
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: 'black',
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
                                        label="Notes"
                                        value={editRowData ? editRowData.labResults.notes : ""}
                                        onChange={(e) =>
                                            setEditRowData((prev) => ({
                                                ...prev,
                                                labResults: {
                                                    ...prev.labResults,
                                                    notes: e.target.value,
                                                },
                                            }))
                                        }
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: 'black',
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
                        </Box>
                    )}
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
                        Are you sure you want to delete the test: {row.testName}?
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
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>View Test Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here are the details of the test: {row.testName}
                    </DialogContentText>
                    <Box>
                        <Typography variant="body1">
                            <strong>Test Name:</strong> {row.testName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Patient Name:</strong> {row.patientName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Test Date:</strong> {row.testDate}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Lab Technician Name:</strong> {row.labResults.labTechnicianName}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Test Result:</strong> {row.labResults.testResult}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Notes:</strong> {row.labResults.notes}
                        </Typography>
                    </Box>
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
        testName: PropTypes.string.isRequired,
        patientName: PropTypes.string.isRequired,
        testDate: PropTypes.string.isRequired,
        labResults: PropTypes.shape({
            testName: PropTypes.string.isRequired,
            patientName: PropTypes.string.isRequired,
            resultDate: PropTypes.string.isRequired,
            testResult: PropTypes.string.isRequired,
            labTechnicianName: PropTypes.string.isRequired,
            notes: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    handleSaveChanges: PropTypes.func.isRequired,
    handleDeleteRow: PropTypes.func.isRequired,
    setSnackbarOpen: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

function LaboratoryResults() {
    const [rows, setRows] = useState(dummyTestData);
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
        setSnackbarMessage("Test deleted successfully.");
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

    const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/laboratoryForm");
  };

    return (
        <ThemeProvider theme={createTheme()}>
            <div style={{ marginTop:"60px", width:"100%" }}>
                <div style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)" }}>
                <IconButton onClick={handleBackClick} sx={{ marginBottom: 2 }}>
            <ArrowBack />
          </IconButton>
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
                        Laboratory Results
                    </Typography>

                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'gray' }}>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                              '& fieldset': {
                                                borderColor: 'black',
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
                                        Test Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ display: { xs: 'table-cell', md: 'table-cell' } }}
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Merriweather, serif',
                                            fontWeight: 'bold',
                                            height: '35px',
                                        }}
                                    >
                                        Patient Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Merriweather, serif',
                                            fontWeight: 'bold',
                                            height: '35px',
                                        }}
                                    >
                                        Result Date
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Merriweather, serif',
                                            fontWeight: 'bold',
                                            height: '35px',
                                        }}
                                    >
                                        Test Result
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Merriweather, serif',
                                            fontWeight: 'bold',
                                            height: '35px',
                                        }}
                                    >
                                        Lab Technician Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Merriweather, serif',
                                            fontWeight: 'bold',
                                            height: '35px',
                                        }}
                                    >
                                        Notes
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ display: { xs: 'table-cell', md: 'table-cell' } }}
                                        style={{
                                            fontSize: '18px',
                                            fontFamily: 'Merriweather, serif',
                                            fontWeight: 'bold',
                                            height: '35px',
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

export default LaboratoryResults;
