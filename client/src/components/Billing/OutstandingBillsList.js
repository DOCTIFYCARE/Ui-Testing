import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination } from '@mui/material';

const OutstandingBillsList = ({ onSelectBill }) => {
  const [bills, setBills] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('patientName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    
    const dummyBills = [
      { id: 1, patientName: 'John Doe', patientID: 'P001', billDate: '2024-05-01', totalAmountDue: 200, status: 'Unpaid' },
      { id: 2, patientName: 'Jane Smith', patientID: 'P002', billDate: '2024-04-15', totalAmountDue: 150, status: 'Partially Paid' },
      { id: 3, patientName: 'Alice Johnson', patientID: 'P003', billDate: '2024-04-20', totalAmountDue: 300, status: 'Unpaid' },
      { id: 4, patientName: 'Bob Brown', patientID: 'P004', billDate: '2024-05-10', totalAmountDue: 250, status: 'Paid' },
      { id: 5, patientName: 'Charlie Davis', patientID: 'P005', billDate: '2024-03-30', totalAmountDue: 400, status: 'Unpaid' },
      { id: 6, patientName: 'Daniel Evans', patientID: 'P006', billDate: '2024-04-01', totalAmountDue: 220, status: 'Unpaid' },
      { id: 7, patientName: 'Eva Green', patientID: 'P007', billDate: '2024-04-03', totalAmountDue: 180, status: 'Partially Paid' },
      { id: 8, patientName: 'Frank Harris', patientID: 'P008', billDate: '2024-05-02', totalAmountDue: 320, status: 'Unpaid' },
      { id: 9, patientName: 'Grace Irving', patientID: 'P009', billDate: '2024-05-05', totalAmountDue: 210, status: 'Paid' },
      { id: 10, patientName: 'Henry Johnson', patientID: 'P010', billDate: '2024-03-25', totalAmountDue: 350, status: 'Unpaid' },
      { id: 11, patientName: 'Isla King', patientID: 'P011', billDate: '2024-04-07', totalAmountDue: 260, status: 'Unpaid' },
      { id: 12, patientName: 'Jack Lee', patientID: 'P012', billDate: '2024-04-10', totalAmountDue: 270, status: 'Partially Paid' },
      { id: 13, patientName: 'Karen Moore', patientID: 'P013', billDate: '2024-05-03', totalAmountDue: 280, status: 'Unpaid' },
      { id: 14, patientName: 'Liam Nelson', patientID: 'P014', billDate: '2024-05-08', totalAmountDue: 240, status: 'Paid' },
      { id: 15, patientName: 'Mia Owen', patientID: 'P015', billDate: '2024-03-28', totalAmountDue: 310, status: 'Unpaid' },
      { id: 16, patientName: 'Noah Parker', patientID: 'P016', billDate: '2024-04-12', totalAmountDue: 330, status: 'Unpaid' },
      { id: 17, patientName: 'Olivia Quinn', patientID: 'P017', billDate: '2024-04-14', totalAmountDue: 350, status: 'Partially Paid' },
      { id: 18, patientName: 'Paul Roberts', patientID: 'P018', billDate: '2024-05-04', totalAmountDue: 370, status: 'Unpaid' },
      { id: 19, patientName: 'Quinn Smith', patientID: 'P019', billDate: '2024-05-06', totalAmountDue: 290, status: 'Paid' },
      { id: 20, patientName: 'Ruby Thompson', patientID: 'P020', billDate: '2024-03-27', totalAmountDue: 410, status: 'Unpaid' },
      { id: 21, patientName: 'Sam Underwood', patientID: 'P021', billDate: '2024-04-05', totalAmountDue: 320, status: 'Unpaid' },
      { id: 22, patientName: 'Tina Vargas', patientID: 'P022', billDate: '2024-04-08', totalAmountDue: 360, status: 'Partially Paid' },
      { id: 23, patientName: 'Uma Walker', patientID: 'P023', billDate: '2024-05-09', totalAmountDue: 380, status: 'Unpaid' },
      { id: 24, patientName: 'Vince Xu', patientID: 'P024', billDate: '2024-05-07', totalAmountDue: 400, status: 'Paid' },
      { id: 25, patientName: 'Wendy Yates', patientID: 'P025', billDate: '2024-03-29', totalAmountDue: 420, status: 'Unpaid' },
    ];
    setBills(dummyBills);
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedBills = [...bills].sort((a, b) => {
    if (orderBy === 'patientName') {
      return order === 'asc' ? a.patientName.localeCompare(b.patientName) : b.patientName.localeCompare(a.patientName);
    }
    
    return 0;
  });

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'patientName' ? order : false} style={{background:'gray'}}>
                <TableSortLabel
                  active={orderBy === 'patientName'}
                  direction={orderBy === 'patientName' ? order : 'asc'}
                  onClick={() => handleRequestSort('patientName')}
                >
                  Patient Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{background:'gray'}}>Patient ID</TableCell>
              <TableCell style={{background:'gray'}}>Bill Date</TableCell>
              <TableCell style={{background:'gray'}}>Total Amount Due</TableCell>
              <TableCell style={{background:'gray'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bill, index) => (
              <TableRow key={bill.id} onClick={() => onSelectBill(bill)} style={{background: index % 2 === 0 ? 'white' : 'lightgray'}}>
                <TableCell>{bill.patientName}</TableCell>
                <TableCell>{bill.patientID}</TableCell>
                <TableCell>{bill.billDate}</TableCell>
                <TableCell>${bill.totalAmountDue}</TableCell>
                <TableCell>{bill.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={bills.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OutstandingBillsList;
