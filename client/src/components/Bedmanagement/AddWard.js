import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'; 
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding:'10px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '40vh',
  },
  formContainer: {
    width:'100%',
    backgroundColor: '#f0f0f0',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
  outlinedInput: {
    '& $notchedOutline': {
      borderColor: 'black',
    },
    '&:hover $notchedOutline': {
      borderColor: 'black',
    },
    '&$focused $notchedOutline': {
      borderColor: 'black',
    },
  },
  notchedOutline: {},
  focused: {},
  inputLabel: {
    '&$focused': {
      color: 'black',
    },
  },
  snackbar: {
    top: '1rem',
    right: '1rem',
    position: 'fixed',
    background: 'green',
  },
}));

const AddWardForm = () => {
  const classes = useStyles();

  const [wardData, setWardData] = useState({
    wardName: '',
    wardType: '',
    floor: '',
    roomNumbers: '',
    capacity: '',
    bedType: '',
    bedNumber: '',
    status: '',
    description: '',
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWardData({ ...wardData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', wardData);
    setSnackbarMessage('Ward added successfully');
    setSnackbarSeverity('success');
    setShowSnackbar(true); 
   
    setWardData({
        wardName: '',
        wardType: '',
        floor: '',
        roomNumbers: '',
        capacity: '',
        bedType: '',
        bedNumber: '',
        status: '',
        description: '',
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.formContainer} style={{width:"80%",marginTop:"60px"}}>
        <Typography variant="h4" gutterBottom align="center" style={{   fontFamily: "Georgia, serif", 
                height: "40px",
                paddingTop: "15px", }}>Add Ward</Typography>
        <Typography variant="body1" gutterBottom style={{ marginBottom: '20px' }}></Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                fullWidth
                required
                id="wardName"
                name="wardName"
                label="Ward Name"
                variant="outlined"
                value={wardData.wardName}
                onChange={handleChange}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.focused,
                  },
                }}
              />
            </Grid>
          
             <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="WardType"
                name="wardtype"
                label="Ward Type"
                variant="outlined"
                value={wardData.wardtype}
                onChange={handleChange}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.focused,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="floor"
                name="floor"
                label="Floor"
                variant="outlined"
                value={wardData.floor}
                onChange={handleChange}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.focused,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                fullWidth
                required
                id="roomNumbers"
                name="roomNumbers"
                label="Room Numbers"
                variant="outlined"
                value={wardData.roomNumbers}
                onChange={handleChange}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.focused,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="capacity"
                name="capacity"
                label="Capacity"
                variant="outlined"
                value={wardData.capacity}
                onChange={handleChange}
                type="number"
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.focused,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={wardData.description}
                onChange={handleChange}
                InputProps={{
                  classes: {
                    root: classes.outlinedInput,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: classes.focused,
                  },
                }}
              />
            </Grid>
           
            <Grid item xs={12} className={classes.buttonContainer}>
              <Button type="submit" className={classes.button} variant="contained">
                Add Ward
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
        open={showSnackbar}
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
  );
};

export default AddWardForm;
