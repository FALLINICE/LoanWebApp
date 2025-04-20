"use client";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // Corrected import

const columns = [
  { id: '_id', label: 'ID', minWidth: 50 },
  { id: 'full_name', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email ID', minWidth: 170 },
  { id: 'dob', label: 'DOB', minWidth: 50, align: 'right' },
  { id: 'applicationStatus', label: 'Application Status', minWidth: 170 },
  { id: 'model_probability', label: 'ML Score', minWidth: 100, align: 'right' },
  { id: 'view', label: 'View', minWidth: 50 },
];

export default function StickyHeadTable() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]); // Use state for rows
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getApplicationStatus = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/loan/user/${userId}`);
      const data = await response.json();
      console.log("DATA:- ",data.data);
      const { loan_status, model_probability } = data.data[0];
      console.log("Loan stauts: ",loan_status,"Model_prob: ",model_probability);
      return { loan_status, model_probability };
    } catch (error) {
      console.error("Error fetching application status:", error);
      return { loan_status: 'Pending', model_probability: 'N/A' }; // Return default values in case of error
    }
  };

  const getalldata = async () => {
    try {
      const data = await fetch("http://localhost:3001/getAllUsers");
      const response = await data.json();
      const users = response.data;

      // Fetch application status for each user
      const updatedUsers = await Promise.all(
        users.map(async (user) => {
          const {model_probability,loan_status} = await getApplicationStatus(user._id);
          const prob = (model_probability*100).toFixed(2)
          return { ...user, model_probability: prob,loan_status}; // Add the application status to the user data
        })
      );

      setRows(updatedUsers); // Store updated users with application status
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getalldata();
  }, []);

  const handleViewClick = (userId) => {
    // Logic for viewing user details
    router.push(`/profile/${userId}`); // Navigate to the user's profile
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box textAlign="center" mt={4} mb={2}>
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          Applications
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }} className="m-[20px] border-2 border-gray-300">
        {loading ? (
          <Typography variant="h6" component="div" align="center" sx={{ padding: 4 }}>
            Loading data...
          </Typography>
        ) : error ? (
          <Typography variant="h6" component="div" align="center" sx={{ padding: 4, color: 'red' }}>
            {error}
          </Typography>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        let value = row[column.id];
                        
                        if (column.id === 'applicationStatus') {
                          // Safely access loan_status and model_probability from the applicationStatus object
                          value = row.applicationStatus ? 
                            `${row.applicationStatus.loan_status} (ML Score: ${(row.applicationStatus.model_probability*100).toFixed(2)})%` 
                            : 'Pending';
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'view' ? (
                              <IconButton onClick={() => handleViewClick(row._id)}>
                                <VisibilityIcon />
                              </IconButton>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
