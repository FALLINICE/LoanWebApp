"use client";
import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const UserProfile = ({ params }) => {
  const { id } = params;
  const [userData, setUserData] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = async (id) => {
    try {
      const userResponse = await fetch(`http://localhost:3001/getById/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const user = await userResponse.json();

      const loansResponse = await fetch(`http://localhost:3001/loan/user/${id}`);
      if (!loansResponse.ok) throw new Error('Failed to fetch loans data');

      const loanData = await loansResponse.json();

      setLoans(loanData.data || []);
      setUserData(user.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="p-6 bg-gray-100 rounded-lg shadow-md">
      {userData && (
        <>
          <Typography variant="h4" className="text-blue-700 font-bold mb-4">User Profile</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <Typography className="text-gray-800 font-medium"><strong>Name:</strong> {userData.full_name}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Email:</strong> {userData.email}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Phone:</strong> {userData.phone}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Credit Score:</strong> {userData.credit_score}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Employment Status:</strong> {userData.employment_status}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Income:</strong> {userData.income}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Gender:</strong> {userData.gender}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Marital Status:</strong> {userData.marital_status}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Bank Name:</strong> {userData.bank_name}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>IFSC Code:</strong> {userData.ifsc_code}</Typography>
            <Typography className="text-gray-800 font-medium"><strong>Date of Birth:</strong> {new Date(userData.dob).toLocaleDateString()}</Typography>
          </div>

          <Typography variant="h5" className="text-blue-600 font-semibold mb-2">Loans</Typography>
          <List className="bg-white rounded-lg shadow-inner">
            {loans.length > 0 ? (
                loans.map((loan) => (
                <ListItem key={loan._id} className="border-b border-gray-200 py-4 hover:bg-blue-50 transition duration-200">
                    <ListItemText
                    primary={
                        <span className="text-blue-800 font-semibold">
                        {`Loan Amount: ${loan.loan_amount}`} 
                        <span className="mx-2">|</span> {/* Add space between entities */}
                        {`Loan Type: ${loan.loan_type}`} 
                        <span className="mx-2">|</span> {/* Add space between entities */}
                        {`Status: ${loan.loan_status}`}
                        <span className="mx-2">|</span>
                        {`                    Probability of Loan Default : ${(loan.model_probability*100).toFixed(2)}%`}
                        </span>
                    }
                    secondary={
                        <span className="text-gray-600 mt-1 block"> {/* Add margin top for separation */}
                        {`Requested Tenure: ${loan.requested_tenure} months`}
                        </span>
                    }
                    />
                </ListItem>
                ))
            ) : (
                <Typography className="text-gray-600 text-center py-4">No loans found for this user.</Typography>
            )}
            </List>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
