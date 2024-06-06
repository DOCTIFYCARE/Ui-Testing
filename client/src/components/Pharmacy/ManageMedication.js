import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const PharmacyItemsForm = () => {
  const initialFormData = {
    brandName: "",
    dosageForm: "",
    description: "",
    manufacturer: "",
    batchNumber: "",
    expirationDate: "",
    unitPrice: "",
    quantity: "",
    supplierName: "",
    supplierContact: "",
    receivedDate: "",
    availabilityStatus: "",
    prescriptionRequired: "",
  };

  const [focusedField, setFocusedField] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate if the value contains only numbers
    if (
      name === "unitPrice" ||
      name === "quantity" ||
      name === "supplierContact"
    ) {
      if (!/^\d*$/.test(value)) {
        // If the value contains non-numeric characters, do not update the state
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationWarnings = validateForm(formData);
    if (Object.keys(validationWarnings).length > 0) {
      handleOpenSnackbar("Invalid Inputs. Please review.", "warning");
      setErrors(validationWarnings);
    } else {
      handleOpenSnackbar("Form submitted successfully", "success");
      setFormData(initialFormData);
    }
  };

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setErrors({});
  };

  const validateForm = (data) => {
    let warnings = {};

    if (!data.brandName.trim()) {
      warnings.brandName = "Brand Name is required";
    }

    if (!data.dosageForm.trim()) {
      warnings.dosageForm = "Dosage Form is required";
    }

    if (!data.description.trim()) {
      warnings.description = "Description is required";
    }

    if (!data.manufacturer.trim()) {
      warnings.manufacturer = "Manufacturer is required";
    }

    if (!data.batchNumber.trim()) {
      warnings.batchNumber = "Batch Number is required";
    }

    if (!data.expirationDate) {
      warnings.expirationDate = "Expiration Date is required";
    }

    if (!data.unitPrice.trim()) {
      warnings.unitPrice = "Unit Price is required";
    }

    if (!data.quantity.trim()) {
      warnings.quantity = "Quantity is required";
    }

    if (!data.supplierName.trim()) {
      warnings.supplierName = "Supplier Name is required";
    }

    if (!data.supplierContact.trim()) {
      warnings.supplierContact = "Supplier Contact is required";
    }

    if (!data.receivedDate) {
      warnings.receivedDate = "Received Date is required";
    }

    if (!data.availabilityStatus.trim()) {
      warnings.availabilityStatus = "Availability Status is required";
    }

    if (!data.prescriptionRequired.trim()) {
      warnings.prescriptionRequired = "Prescription Required is required";
    }

    return warnings;
  };

  return (
    <Grid container justifyContent="center" width="80%" >
      <Grid item xs={12} >
        <Paper
          elevation={6}
          sx={{
            padding:"20px",
            marginTop:"60px",
            height: "auto",
            backgroundColor:"#f0f0f0",
            
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            style={{
                fontFamily: "Georgia, serif",
                height: "60px",
                paddingTop: "15px",
              }}
          >
            Add Medicine or Pharmacy Item
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Brand Name"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("brandName")}
                  onBlur={() => setFocusedField("")}
                  error={errors.brandName}
                  helperText={errors.brandName}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dosage Form"
                  name="dosageForm"
                  value={formData.dosageForm}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("dosageForm")}
                  onBlur={() => setFocusedField("")}
                  error={errors.dosageForm}
                  helperText={errors.dosageForm}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Batch Number"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("batchNumber")}
                  onBlur={() => setFocusedField("")}
                  error={errors.batchNumber}
                  helperText={errors.batchNumber}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("manufacturer")}
                  onBlur={() => setFocusedField("")}
                  error={errors.manufacturer}
                  helperText={errors.manufacturer}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField("")}
                  error={errors.description}
                  helperText={errors.description}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Unit Price"
                  name="unitPrice"
                  type="text"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("unitPrice")}
                  onBlur={() => setFocusedField("")}
                  error={errors.unitPrice}
                  helperText={errors.unitPrice}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("quantity")}
                  onBlur={() => setFocusedField("")}
                  error={errors.quantity}
                  helperText={errors.quantity}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Received Date"
                  name="receivedDate"
                  type="date"
                  value={formData.receivedDate}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("receivedDate")}
                  onBlur={() => setFocusedField("")}
                  error={errors.receivedDate}
                  helperText={errors.receivedDate}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "black" },
                  }}
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                    min: "2000-01-01",
                    style: { color: "black" },
                  }}
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
                      color: focusedField === "receivedDate" ? "black" : null,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiration Date"
                  name="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("expirationDate")}
                  onBlur={() => setFocusedField("")}
                  error={errors.expirationDate}
                  helperText={errors.expirationDate}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "black" },
                  }}
                  inputProps={{
                    min: "2000-01-01",
                    max: "2034-01-01",
                    style: { color: "black" },
                  }}
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
                      color: focusedField === "expirationDate" ? "black" : null,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Supplier Name"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("supplierName")}
                  onBlur={() => setFocusedField("")}
                  error={errors.supplierName}
                  helperText={errors.supplierName}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Supplier Contact"
                  name="supplierContact"
                  value={formData.supplierContact}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("supplierContact")}
                  onBlur={() => setFocusedField("")}
                  error={errors.supplierContact}
                  helperText={errors.supplierContact}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Availability Status"
                  name="availabilityStatus"
                  value={formData.availabilityStatus}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("availabilityStatus")}
                  onBlur={() => setFocusedField("")}
                  error={errors.availabilityStatus}
                  helperText={errors.availabilityStatus}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
                  <MenuItem value="">Select Availability</MenuItem>
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Not Available">Not Available</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Prescription Required"
                  name="prescriptionRequired"
                  value={formData.prescriptionRequired}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("prescriptionRequired")}
                  onBlur={() => setFocusedField("")}
                  error={errors.prescriptionRequired}
                  helperText={errors.prescriptionRequired}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
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
                  <MenuItem value="">Select Prescription Requirement</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "rgb(41, 39, 39)",
                    color: "white",
                    borderRadius: "20px",
                    padding: "8px 18px",
                    marginTop: "15px",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </Button>
              </div>
            </Grid>
          </form>
        </Paper>
      </Grid>
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
    </Grid>
  );
};

export default PharmacyItemsForm;
