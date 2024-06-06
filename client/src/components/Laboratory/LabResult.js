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
    Paper,
    IconButton,
    Snackbar
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styled from "@emotion/styled";
import MuiAlert from "@material-ui/lab/Alert";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "700px",
        margin: "0 auto",
        paddingTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        border: "1px solid #e0e0e0",
        borderRadius: "5px",
    },
    form: {
        marginTop: theme.spacing(2),
    },
    input: {
        marginBottom: theme.spacing(2),
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
    outlinedInput: {
        "& input": {
            color: "black",
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

const LabResult = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [patientInfo, setPatientInfo] = useState({
        testName: "",
        patientName: "",
        resultDate: "",
        testResult: "",
        labTechniciansName: "",
        note: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        testName: "",
        patientName: "",
        resultDate: "",
        testResult: "",
        labTechniciansName: "",
        note: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatientInfo({ ...patientInfo, [name]: value });

        if (name === "patientName" || name === "labTechniciansName") {
            const isNameValid = /^[a-zA-Z\s]*$/.test(value);
            if (!isNameValid) {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Please enter only characters",
                }));
                setSnackbarMessage("Please enter only characters");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            } else {
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
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

        console.log("Add result:", patientInfo);

        setPatientInfo({
            testName: "",
            patientName: "",
            resultDate: "",
            testResult: "",
            labTechniciansName: "",
            note: "",
        });

        setSnackbarMessage("Lab Result added successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleBackClick = () => {
        navigate("/laboratoryForm");
    };

    return (
        <ThemeProvider theme={customTheme}>
            <Container className={classes.root}>
                <Paper className={classes.paper}>
                    <IconButton onClick={handleBackClick} sx={{ marginBottom: 2 }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography
                        variant="h4"
                        gutterBottom
                        className={classes.heading}
                    >
                        Laboratory Result Management
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CssTextField
                                    fullWidth
                                    label="Test Name"
                                    name="testName"
                                    variant="outlined"
                                    value={patientInfo.testName}
                                    onChange={handleChange}
                                    required
                                    error={!!errorMessages.testName}
                                    helperText={errorMessages.testName}
                                    className={classes.outlinedInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CssTextField
                                    fullWidth
                                    label="Patient Name"
                                    name="patientName"
                                    variant="outlined"
                                    value={patientInfo.patientName}
                                    onChange={handleChange}
                                    required
                                    error={!!errorMessages.patientName}
                                    helperText={errorMessages.patientName}
                                    className={classes.outlinedInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    label="Result Date"
                                    type="date"
                                    name="resultDate"
                                    variant="outlined"
                                    value={patientInfo.resultDate}
                                    onChange={handleChange}
                                    required
                                    error={!!errorMessages.resultDate}
                                    helperText={errorMessages.resultDate}
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
                                    label="Test Result"
                                    name="testResult"
                                    variant="outlined"
                                    value={patientInfo.testResult}
                                    onChange={handleChange}
                                    required
                                    error={!!errorMessages.testResult}
                                    helperText={errorMessages.testResult}
                                    className={classes.outlinedInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CssTextField
                                    fullWidth
                                    label="Lab Technicians Name"
                                    name="labTechniciansName"
                                    variant="outlined"
                                    value={patientInfo.labTechniciansName}
                                    onChange={handleChange}
                                    required
                                    error={!!errorMessages.labTechniciansName}
                                    helperText={errorMessages.labTechniciansName}
                                    className={classes.outlinedInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssTextField
                                    fullWidth
                                    label="Note"
                                    name="note"
                                    variant="outlined"
                                    value={patientInfo.note}
                                    onChange={handleChange}
                                    error={!!errorMessages.note}
                                    helperText={errorMessages.note}
                                    multiline
                                    rows={2}
                                    className={classes.outlinedInput}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className={classes.submitButton}
                                >
                                    Add Lab Result
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

export default LabResult;