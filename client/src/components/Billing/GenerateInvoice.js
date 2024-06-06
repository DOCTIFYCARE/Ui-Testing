import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button, Box } from '@mui/material';


const GenerateInvoice = ({ bill }) => {
  const handleGenerateInvoice = () => {
    if (!bill) {
      alert('Please select a bill to generate an invoice.');
      return;
    }

    const doc = new jsPDF();
     

    
    doc.setFillColor(200, 200, 200); 
    doc.rect(0, 10, 210, 20, 'F'); 

    
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0); 
    doc.text('Doctifycare', 105, 25, null, null, 'center'); 

    
    doc.autoTable({
      startY: 40,
      head: [
        [
          { content: 'Patient ID', styles: { fillColor: [200, 200, 200] } },
          { content: 'Bill Date', styles: { fillColor: [200, 200, 200] } },
          { content: 'Total Amount Due', styles: { fillColor: [200, 200, 200] } },
          { content: 'Status', styles: { fillColor: [200, 200, 200] } }
        ]
      ],
      body: [
        [bill.patientID, bill.billDate, `$${bill.totalAmountDue}`, bill.status]
      ],
      styles: {
        cellPadding: 5,
        fontSize: 12,
      },
    });

    doc.save('invoice.pdf');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="10vh"
    >
      <Button
        variant="contained"
        onClick={handleGenerateInvoice}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: 'black',
            alignContent: 'center',
          },
        }}
      >
        Generate Invoice
      </Button>
    </Box>
  );
};

export default GenerateInvoice;

