import React, { useState } from 'react';
import { TextField } from '@mui/material';

const PatientSearch = ({ onSelectPatient }) => {
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <TextField
        label="Search Patients"
        variant="outlined"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 1, width: '40%' }} 
      />
    </div>
  );
};

export default PatientSearch;

