import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '40vh',
    padding:"20px",
  },
  formContainer: {
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      marginTop: '60px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: theme.spacing(3),
    '&:hover': {
      backgroundColor: '#333',
    },
  },
  errorText: {
    color: 'red',
    marginTop: theme.spacing(1),
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  statusLabel: {
    marginRight: theme.spacing(2),
  },
  statusButton: {
    margin: theme.spacing(1),
    minWidth: '100px',
    '&.selected': {
      backgroundColor: 'grey',
      color: 'white',
      '&:hover': {
        backgroundColor: 'grey',
      },
    },
  },
  outlinedInput: {
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
  },
}));

const AddDepartmentForm = () => {
  const classes = useStyles();

  const [departmentData, setDepartmentData] = useState({
    DepartmentName: '',
    Description: '',
    Status: false,
  });

  const [errors, setErrors] = useState({
    DepartmentName: '',
    Description: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isValid = /^[a-zA-Z\s]*$/.test(value);
    if (isValid || value === '') {
      setDepartmentData({ ...departmentData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    } else {
      setErrors({ ...errors, [name]: 'Please enter only alphabetic characters' });
      setSnackbarMessage('Please enter only alphabetic characters');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleStatusChange = (status) => {
    setDepartmentData({ ...departmentData, Status: status });
  };

  const handleSave = () => {
    const { DepartmentName, Description } = departmentData;
    const newErrors = {};
    if (!DepartmentName.trim()) {
      newErrors.DepartmentName = 'Please enter Department Name';
    }
    if (!Description.trim()) {
      newErrors.Description = 'Please enter Description';
    }
    if (Object.keys(newErrors).length > 0) {
      setSnackbarMessage('Please fill out all required fields');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    if (DepartmentName === 'Invalid') {
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to add department. Please try again later.');
      setSnackbarOpen(true);
      return;
    }
    setDepartmentData({
      DepartmentName: '',
      Description: '',
      Status: false,
    });
    setSnackbarSeverity('success');
    setSnackbarMessage('Department added successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' , marginBottom: "20px",fontFamily: "Georgia, serif", }}>Add Department</Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="DepartmentName"
                name="DepartmentName"
                label="Department Name"
                variant="outlined"
                value={departmentData.DepartmentName}
                onChange={handleChange}
                error={!!errors.DepartmentName}
                className={classes.outlinedInput}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="Description"
                name="Description"
                label="Description (optional)"
                variant="outlined"
                multiline
                rows={3}
                value={departmentData.Description}
                onChange={handleChange}
                error={!!errors.Description}
                className={classes.outlinedInput}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.statusContainer}>
              <Typography variant="body1" className={classes.statusLabel}>Status:</Typography>
              <Button
                variant="contained"
                className={`${classes.statusButton} ${!departmentData.Status ? 'selected' : ''}`}
                onClick={() => handleStatusChange(false)}
              >
                Inactive
              </Button>
              <Button
                variant="contained"
                className={`${classes.statusButton} ${departmentData.Status ? 'selected' : ''}`}
                onClick={() => handleStatusChange(true)}
              >
                Active
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
              <Button className={classes.button} variant="contained" onClick={handleSave}>
                Add Department
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddDepartmentForm;
