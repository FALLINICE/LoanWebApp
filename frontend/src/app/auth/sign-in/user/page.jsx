"use client";
import { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, IconButton, InputAdornment, Link, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useRouter} from 'next/navigation';
import { useUser } from '@/app/utils/userContext';

const UserLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {setUser} = useUser();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await fetch('http://localhost:3001/signIn', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const result = await response.json();
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      setUser({name: result.data.full_name, password: result.data.password, email: result.data.email, userId: result.data._id});
      
      // Handle successful login (e.g., save tokens, redirect)
      console.log('Login Successful:', result);
      // Redirect or perform further actions here
      router.push('/');

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        component="form" // Make the Box a form
        onSubmit={handleSubmit} // Attach the submit handler
        sx={{
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          User Login
        </Typography>
        <Stack spacing={2}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Set email state
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Set password state
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 2 }}
            type="submit" // Specify button type as submit
          >
            Login as User
          </Button>
          <Typography textAlign="center" variant="body2">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" style={{ cursor: 'pointer', color: 'blue' }}>
              Register
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserLogin;
