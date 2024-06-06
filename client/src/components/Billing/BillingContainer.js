import React, { useState } from 'react';
import { Container } from '@mui/material';
import PatientSearch from './PatientSearch';
import OutstandingBillsList from './OutstandingBillsList';
import PatientBillingDashboard from './PatientBillingDashboard';
import GenerateInvoice from './GenerateInvoice';

const BillingContainer = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSelectedBill(null);
  };

  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleMarkAsPaid = (billId) => {
    setSelectedBill((prevBill) => (prevBill.id === billId ? { ...prevBill, status: 'Paid' } : prevBill));
  };

  return (
    <Container>
      <PatientSearch onSelectPatient={handleSelectPatient} />
      <OutstandingBillsList onSelectBill={handleSelectBill} />
      <PatientBillingDashboard bill={selectedBill} onMarkAsPaid={handleMarkAsPaid} />
      <GenerateInvoice bill={selectedBill} />
    </Container>
  );
};

export default BillingContainer;
