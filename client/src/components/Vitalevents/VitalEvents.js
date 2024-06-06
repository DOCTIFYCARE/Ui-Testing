import React, { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import birthRecords from "./BirthDummyData.js";
import deathRecords from "./DeathDummyData.js";

const VitalEvents = () => {
  const [focusedField, setFocusedField] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gender, setGender] = useState("");
  const [hospital, setHospital] = useState("");
  const [event, setEvent] = useState("");
  const [filteredBirths, setFilteredBirths] = useState([]);
  const [filteredDeaths, setFilteredDeaths] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("warning");

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredBirths(birthRecords);
    setFilteredDeaths(deathRecords);
  }, []);

  useEffect(() => {
    if (searchClicked) {
      if (event === "Birth") {
        navigate("/birthrecords");
      } else if (event === "Death") {
        navigate("/deathrecords");
      }
    }
  }, [filteredBirths, filteredDeaths, event, searchClicked, navigate]);

  const handleFocusChange = (field) => {
    setFocusedField(field);
  };

  const handleSearch = () => {
    if (!event) {
      setSnackbarMessage("Event selection is mandatory");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    console.log("Search Keyword:", searchKeyword);
    console.log("Event:", event);

    let filteredRecords = [];
    if (event === "Birth") {
      console.log("Birth Records:", birthRecords);

      filteredRecords = birthRecords.filter(
        (record) =>
          (searchKeyword === "" ||
            record.id.toString().includes(searchKeyword) ||
            record.childName
              .toLowerCase()
              .includes(searchKeyword.toLowerCase())) &&
          (gender === "" || record.gender === gender) &&
          (hospital === "" ||
            record.hospitalName
              .toLowerCase()
              .includes(hospital.toLowerCase())) &&
          (startDate === "" || new Date(record.dob) >= new Date(startDate)) &&
          (endDate === "" || new Date(record.dob) <= new Date(endDate))
      );

      console.log("Filtered Birth Records:", filteredRecords);

      setFilteredBirths(filteredRecords);
    } else if (event === "Death") {
      console.log("Death Records:", deathRecords);

      filteredRecords = deathRecords.filter(
        (record) =>
          (searchKeyword === "" ||
            record.id.toString().includes(searchKeyword) ||
            record.deceasedName
              .toLowerCase()
              .includes(searchKeyword.toLowerCase())) &&
          (gender === "" || record.gender === gender) &&
          (hospital === "" ||
            record.hospitalName
              .toLowerCase()
              .includes(hospital.toLowerCase())) &&
          (startDate === "" || new Date(record.dod) >= new Date(startDate)) &&
          (endDate === "" || new Date(record.dod) <= new Date(endDate))
      );

      console.log("Filtered Death Records:", filteredRecords);

      setFilteredDeaths(filteredRecords);
    }

    setSearchClicked(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx= {{marginTop:"60px"}}>
      <Box my={4}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Roboto, sans-serif", fontWeight: "bold" }}
        >
          Vital Events Dashboard
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
                Total Births
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: "Roboto, sans-serif" }}
              >
                {birthRecords.length}
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
                Total Deaths
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: "Roboto, sans-serif" }}
              >
                {deathRecords.length}
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
                onFocus={() => handleFocusChange("firstName")}
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
                    color: focusedField === "firstName" ? "black" : null,
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
                onFocus={() => handleFocusChange("firstName")}
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
                    color: focusedField === "firstName" ? "black" : null,
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
                onFocus={() => handleFocusChange("firstName")}
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
                    color: focusedField === "firstName" ? "black" : null,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Event"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                onFocus={() => handleFocusChange("firstName")}
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
                    color: focusedField === "firstName" ? "black" : null,
                  },
                }}
              >
                <MenuItem value="">Select Event</MenuItem>
                <MenuItem value="Birth">Birth</MenuItem>
                <MenuItem value="Death">Death</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Gender"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onFocus={() => handleFocusChange("firstName")}
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
                    color: focusedField === "firstName" ? "black" : null,
                  },
                }}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Hospital"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "black" } }}
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                onFocus={() => handleFocusChange("firstName")}
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
                    color: focusedField === "firstName" ? "black" : null,
                  },
                }}
              />
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
          <Link to="/birthrecords/add" style={{ textDecoration: "none" }}>
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
            >
              Birth Record
            </Button>
          </Link>
          <Link to="/deathrecords/add" style={{ textDecoration: "none" }}>
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
            >
              Death Record
            </Button>
          </Link>
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

export default VitalEvents;
