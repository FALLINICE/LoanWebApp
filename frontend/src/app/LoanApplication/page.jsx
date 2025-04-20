"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useUser } from "../utils/userContext";

const LoanApplication = () => {
  const router = useRouter();
  const {user} = useUser();
  const [formData, setFormData] = useState({
    loan_type: "",
    loan_amount: "",
    requested_tenure: "",
  });
  console.log("User ID: ", user.userId);
  const [userDetails, setUserDetails] = useState(null);
  const userId = user.userId; // Replace this with actual user ID logic

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3001/getById/${userId}`); // Use query parameter
        const data = await res.json();
        console.log("Data: ",data);
        setUserDetails(data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Error fetching user details");
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const response = await fetch('http://localhost:3001/loan/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userId, // Include userId in the request
          }),
        });

        if (!response.ok) throw new Error('Failed to submit application');

        const result = await response.json();
        toast.success("Form submitted successfully");
        router.push("/");
      } catch (error) {
        console.error("Error submitting loan application:", error);
        toast.error("Failed to submit application");
      }
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  const isFormValid = () => {
    return formData.loan_type && formData.loan_amount && formData.requested_tenure;
  };

  if (!userDetails) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Loan Application Form
        </h2>

        {/* Form Grid for 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name - Static Display */}
          <div className="flex flex-col">
            <label className="text-gray-700">Full Name</label>
            <p className="bg-gray-100 p-2 rounded-md">
              {userDetails.full_name}
            </p>
          </div>

          {/* Email - Static Display */}
          <div className="flex flex-col">
            <label className="text-gray-700">Email</label>
            <p className="bg-gray-100 p-2 rounded-md">
              {userDetails.email}
            </p>
          </div>

          {/* Phone Number - Static Display */}
          <div className="flex flex-col">
            <label className="text-gray-700">Phone Number</label>
            <p className="bg-gray-100 p-2 rounded-md">
              {userDetails.phone}
            </p>
          </div>

          {/* Loan Type */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="loan-type-label">Loan Type</InputLabel>
            <Select
              labelId="loan-type-label"
              name="loan_type"
              value={formData.loan_purpose}
              onChange={handleChange}
              required
              label="Loan Type"
            >
              <MenuItem value="home">Home Loan</MenuItem>
              <MenuItem value="personal">Personal Loan</MenuItem>
              <MenuItem value="auto">Auto Loan</MenuItem>
              <MenuItem value="education">Education Loan</MenuItem>
            </Select>
          </FormControl>

          {/* Loan Amount */}
          <TextField
            label="Loan Amount"
            name="loan_amount"
            type="number"
            value={formData.loan_amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            inputProps={{ min: 0 }}
          />

          {/* requested_tenure */}
          <TextField
            label="requested_tenure (in months)"
            name="requested_tenure"
            type="number"
            value={formData.requested_tenure}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            inputProps={{ min: 0 }}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-6"
        >
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default LoanApplication;
