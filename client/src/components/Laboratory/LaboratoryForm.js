import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LaboratoryModule = () => {
  const [focusedField, setFocusedField] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lab, setlab] = useState("");
  const [testType, setTestType] = useState("");
  const [selectResult, setSelectResult] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("warning");

  const navigate = useNavigate();

  const handleFocusChange = (field) => {
    setFocusedField(field);
  };

  const handleSearch = () => {

    console.log("Search Keyword:", searchKeyword);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Test Type:", testType);
    console.log("Result Status:", selectResult);

    const searchResults = []; 
    if (searchResults.length === 0 ) {
      setSnackbarMessage("No data found");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    console.log("Search Keyword:", searchKeyword);
    console.log("Lab:", lab);

    
    if (lab === "Test") {
      navigate("/LaboratoryTest");
    } else if (lab === "Result") {
      navigate("/LaboratoryResult");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const navigateToLabTest = () => {
    navigate("/LabTest");
  };

  const navigateToLabResult = () => {
    navigate("/LabResult");
  };

  return (
    <Container maxWidth="lg" sx={{marginTop:"60px" }}>
      <Box my={4}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Roboto, sans-serif", fontWeight: "bold" }}
        >
          Laboratory Module Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: "center",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontFamily: "Roboto, sans-serif" }}
              >
               Number of Tests Conduct   
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Roboto, sans-serif" }}
              >
                
                200
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: "center",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontFamily: "Roboto, sans-serif" }}
              >
                Pending Results
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: "Roboto, sans-serif" }}
              >
               
                100
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box my={4}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              marginBottom: 3,
            }}
          >
            Search and Filter
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Search by name or ID"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onFocus={() => handleFocusChange("searchKeyword")}
                onBlur={() => handleFocusChange("")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: focusedField === "searchKeyword" ? "black" : null,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="From Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true, style: { color: "black" } }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onFocus={() => handleFocusChange("startDate")}
                onBlur={() => handleFocusChange("")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: focusedField === "startDate" ? "black" : null,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="To Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true, style: { color: "black" } }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onFocus={() => handleFocusChange("endDate")}
                onBlur={() => handleFocusChange("")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: focusedField === "endDate" ? "black" : null,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Test Type"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                onFocus={() => handleFocusChange("testType")}
                onBlur={() => handleFocusChange("")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: focusedField === "testType" ? "black" : null,
                  },
                }}
              >
                <MenuItem value="">Select Test Type</MenuItem>
                <MenuItem value="Blood">Blood Test</MenuItem>
                <MenuItem value="Urine">Urine Test</MenuItem>
                <MenuItem value="Stool">Stool Test</MenuItem>
                <MenuItem value="MRI">MRI Scan</MenuItem>
                <MenuItem value="XRay">X-Ray</MenuItem>
                <MenuItem value="CT">CT Scan</MenuItem>
                <MenuItem value="COVID">COVID-19 Test</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Result Status"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                value={selectResult}
                onChange={(e) => setSelectResult(e.target.value)}
                onFocus={() => handleFocusChange("resultStatus")}
                onBlur={() => handleFocusChange("")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: focusedField === "selectResult" ? "black" : null,
                  },
                }}
              >
                <MenuItem value="">Select Result</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Lab"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                value={lab}
                onChange={(e) => setlab(e.target.value)}
                onFocus={() => handleFocusChange("lab")}
                onBlur={() => handleFocusChange("")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: focusedField === "Lab" ? "black" : null,
                  },
                }}
              >
                <MenuItem value="">Select Lab</MenuItem>
                <MenuItem value="Test">Test</MenuItem>
                <MenuItem value="Result">Result</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              startIcon={<Search />}
              style={{
                backgroundColor: "rgb(41, 39, 39)",
                color: "white",
                borderRadius: "20px",
                padding: "8px 18px",
                marginTop: "15px",
                marginBottom: "15px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "Merriweather, serif",
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="space-between" mb={4}>
          <Button
            variant="contained"
            startIcon={<Add />}
            style={{
              backgroundColor: "rgb(41, 39, 39)",
              color: "white",
              borderRadius: "20px",
              padding: "8px 18px",
              marginTop: "15px",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
            onClick={navigateToLabTest}
          >
            Lab Test
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            style={{
              backgroundColor: "rgb(41, 39, 39)",
              color: "white",
              borderRadius: "20px",
              padding: "8px 18px",
              marginTop: "15px",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "Merriweather, serif",
            }}
            onClick={navigateToLabResult}
          >
            Lab Results
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LaboratoryModule;