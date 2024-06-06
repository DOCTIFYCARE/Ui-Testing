import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

const PatientBillingDashboard = ({ bill, onMarkAsPaid }) => {
  if (!bill) {
    return <Typography variant="h5">Select a bill to view details</Typography>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>Patient Billing Dashboard</Typography>
      <Typography>Patient Name: {bill.patientName}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Patient ID: {bill.patientID}</Typography>
        <Typography>Total Amount Due: ${bill.totalAmountDue}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Bill Date: {bill.billDate}</Typography>
        <Typography>Status: {bill.status}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onMarkAsPaid(bill.id)}
        disabled={bill.status === 'Paid'}
        sx={{ background: 'black', mt: 1 }}
      >
        Mark as Paid
      </Button>
    </Paper>
  );
};

export default PatientBillingDashboard;

