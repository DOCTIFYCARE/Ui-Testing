import React, { useState, useEffect } from 'react';
import {
  Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Snackbar, SnackbarContent, useTheme, useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width:'100%',
    marginTop:'60px',
    overflow:'auto',
  },
  tableContainer: {
   
    margin: 'auto',
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
    
    },
  },
  tableRow: {
    alignItems:'center',
    '&:nth-child(even)': {
      backgroundColor: '#f0f0f0',
    },
  },
  cellAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordion: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '247%',
    },
  },
  accordionSummary: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  accordionDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  pageButton: {
    minWidth: 'unset',
    padding: theme.spacing(1),
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
}));

const WardList = () => {
  const [wards, setWards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedBed, setSelectedBed] = useState(null);
  const [editWard, setEditWard] = useState(null);
  const [editBed, setEditBed] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const itemsPerPage = 10;
  const totalPages = Math.ceil(50 / itemsPerPage); 
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const wardTypes = ['ICU', 'Maternity', 'General', 'Surgery','Mortuary','Emergency',];
    
    const dummyWards = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `Ward ${index + 1}`,
      description: `Description ${index + 1}`,
      type: wardTypes[index % wardTypes.length],
      floor: `Floor ${index + 1}`,
      capacity: Math.floor(Math.random() * 20) + 10, 
      roomNumbers: Array.from({ length: 1 }, (_, i) => `${index * 3 + i + 1}`),
      beds: Array.from({ length: 3 }, (_, i) => ({
        bedType: `Bed ${i + 1}`,
        bedNumber: index * 3 + i + 1,
        status: 'Available',
      })) || [], 
    }));
    setWards(dummyWards);
  }, []);

  const handleDeleteWard = (id) => {
    setSelectedWard(id);
  };

  const handleDeleteBed = (bedNumber) => {
    setSelectedBed(bedNumber);
  };

  const handleEditWard = (ward) => {
    setEditWard(ward);
  };

  const handleEditBed = (bed) => {
    setEditBed(bed);
  };


  const confirmDeleteWard = () => {
    
    setWards(prevWards => prevWards.filter(ward => ward.id !== selectedWard));
    setSelectedWard(null); 
    setShowSnackbar(true);
    setSnackbarMessage('Ward deleted successfully');
  };

  const confirmDeleteBed = () => {
    
    const updatedWards = wards.map(ward => ({
      ...ward,
      beds: ward.beds.filter(bed => bed.bedNumber !== selectedBed),
    }));
    setWards(updatedWards);
    setSelectedBed(null); 
    setShowSnackbar(true);
    setSnackbarMessage('Bed deleted successfully');
  };

  const handleSaveWard = () => {
    
    setWards(prevWards =>
      prevWards.map(ward =>
        ward.id === editWard.id ? { ...ward, ...editWard } : ward
      )
    );
    setEditWard(null); 
    setShowSnackbar(true); 
    setSnackbarMessage('Ward saved successfully');
  };

  const handleSaveBed = () => {
    
    const updatedWards = wards.map(ward =>
      ward.id === editBed.wardId
        ? {
            ...ward,
            beds: ward.beds.map(bed =>
              bed.bedNumber === editBed.bedNumber ? { ...bed, ...editBed } : bed
            ),
          }
        : ward
    );
    setWards(updatedWards);
    setEditBed(null); 
    setShowSnackbar(true); 
    setSnackbarMessage('Bed saved successfully');
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const renderPagination = () => (
    <div className={classes.pagination}>
      <Button
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={classes.pageButton}
        style={{ backgroundColor: 'lightgrey', color: 'black' }}
      >
        Prev
      </Button>
      <div style={{ margin: '0 10px' }}></div>
      <Button
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={classes.pageButton}
        style={{ backgroundColor: 'lightgrey', color: 'black' }}
      >
        Next
      </Button>
    </div>

  );

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Ward List
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead style={{ backgroundColor: "gray", color: "white" }}>
            <TableRow >
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell >Room Numbers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wards
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((ward, index) => (
                <React.Fragment key={index}>
                  <TableRow className={classes.tableRow}>
                    <TableCell>{ward.name}</TableCell>
                    <TableCell>{ward.description}</TableCell>
                    <TableCell>{ward.type}</TableCell>
                    <TableCell>{ward.floor}</TableCell>
                    <TableCell>{ward.capacity}</TableCell>
                    <TableCell>{ward.roomNumbers.join(', ')}</TableCell>
                    <TableCell className={classes.cellAction}>
                      <IconButton onClick={() => handleEditWard(ward)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteWard(ward.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordionSummary}>
                      <Typography variant="subtitle1" align="center">Bed Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead style={{ backgroundColor: "lightgray", color: "black" }}>
                            <TableRow>
                              <TableCell>Bed Type</TableCell>
                              <TableCell>Bed Number</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {ward.beds.map((bed, index) => (
                              <TableRow key={index}>
                                <TableCell>{bed.bedType}</TableCell>
                                <TableCell>{bed.bedNumber}</TableCell>
                                <TableCell>{bed.status}</TableCell>
                                <TableCell className={classes.cellAction}>
                                  <IconButton onClick={() => handleEditBed(bed)}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton onClick={() => handleDeleteBed(bed.bedNumber)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
        {renderPagination()}
      </TableContainer>

      
      <Dialog open={Boolean(editWard)} onClose={() => setEditWard(null)}>
        <DialogTitle>Edit Ward</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editWard?.name || ''}
            onChange={(e) => setEditWard({ ...editWard, name: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
          <TextField
            label="Description"
            value={editWard?.description || ''}
            onChange={(e) => setEditWard({ ...editWard, description: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
          <TextField
            label="Type"
            value={editWard?.type || ''}
            onChange={(e) => setEditWard({ ...editWard, type: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
          <TextField
            label="Floor"
            value={editWard?.floor || ''}
            onChange={(e) => setEditWard({ ...editWard, floor: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
          <TextField
            label="Capacity"
            value={editWard?.capacity || ''}
            onChange={(e) => setEditWard({ ...editWard, capacity: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
          <TextField
            label="Room Numbers"
            value={editWard?.roomNumbers.join(', ') || ''}
            onChange={(e) =>
              setEditWard({ ...editWard, roomNumbers: e.target.value.split(',').map((room) => room.trim()) })
            }
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditWard(null)} color="black">
            Cancel
          </Button>
          <Button onClick={handleSaveWard} color="black">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(editBed)} onClose={() => setEditBed(null)}>
        <DialogTitle>Edit Bed</DialogTitle>
        <DialogContent>
          <TextField
            label="Bed Type"
            value={editBed?.bedType || ''}
            onChange={(e) => setEditBed({ ...editBed, bedType: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
          <TextField
            label="Bed Number"
            value={editBed?.bedNumber || ''}
            onChange={(e) => setEditBed({ ...editBed, bedNumber: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
          <TextField
            label="Status"
            value={editBed?.status || ''}
            onChange={(e) => setEditBed({ ...editBed, status: e.target.value })}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.inputLabel,
                focused: classes.focused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.outlinedInput,
                notchedOutline: classes.notchedOutline,
                focused: classes.focused,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditBed(null)} color="black">
            Cancel
          </Button>
          <Button onClick={handleSaveBed} color="black">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(selectedWard)} onClose={() => setSelectedWard(null)}>
        <DialogTitle>Confirm Delete Ward</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this ward?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedWard(null)} color="black">
            Cancel
          </Button>
          <Button onClick={confirmDeleteWard} color="black">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(selectedBed)} onClose={() => setSelectedBed(null)}>
        <DialogTitle>Confirm Delete Bed</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this bed?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedBed(null)} color="black">
            Cancel
          </Button>
          <Button onClick={confirmDeleteBed} color="black">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{ backgroundColor: 'green', color: 'white' }}
        />
      </Snackbar>
    </div>
  );
};

export default WardList;

