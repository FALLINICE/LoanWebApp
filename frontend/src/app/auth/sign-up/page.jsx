"use client";
import React, { useState } from 'react';
import { MenuItem, TextField, InputLabel, FormControl, Select, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const SignupProfile = () => {
  const router =useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    gender: '',
    martial_status: '',
    phone: '',
    email: '',
    password: '',
    employment_status: '',
    month_of_employment: '',
    income: '',
    bank_name: '',
    ifsc_code: '',
    credit_score: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate API registration call
    try {
      const response = await fetch('http://localhost:3001/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const result = await response.json();
      console.log('Registration Successful:', result);
      router.push('/auth/sign-in/user')
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Complete Signup Profile</h2>

        {/* Personal Information Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Name */}
            <TextField
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

            {/* Date of Birth */}
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />

            {/* Gender */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            {/* Marital Status */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Marital Status</InputLabel>
              <Select
                name="martial_status"
                value={formData.martial_status}
                onChange={handleChange}
                required
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </Select>
            </FormControl>

            {/* Contact Number */}
            <TextField
              label="Contact No."
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

            {/* Email */}
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

            {/* Password */}
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
          </div>
        </div>

        {/* Employment Information Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Employment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Employment Status */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Employment Status</InputLabel>
              <Select
                name="employment_status"
                value={formData.employment_status}
                onChange={handleChange}
                required
              >
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="self-employed">Self-employed</MenuItem>
                <MenuItem value="unemployed">Unemployed</MenuItem>
              </Select>
            </FormControl>

            {/* Months of Employment (in months) */}
            <TextField
              label="Months of Employment (Months)"
              name="month_of_employment"
              type="number"
              value={formData.month_of_employment}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

            {/* Annual Income */}
            <TextField
              label="Annual Income"
              name="income"
              type="number"
              value={formData.income}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
          </div>
        </div>

        {/* Financial Information Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bank Name */}
            <TextField
              label="Bank Name"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

            {/* IFSC Code */}
            <TextField
              label="IFSC Code"
              name="ifsc_code"
              value={formData.ifsc_code}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

            {/* Credit Score */}
            <TextField
              label="Credit Score"
              name="credit_score"
              type="number"
              value={formData.credit_score}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />

          </div>
        </div>

        {/* Complete Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-8"
        >
          Complete Signup
        </Button>
      </form>
    </div>
  );
};

export default SignupProfile;
