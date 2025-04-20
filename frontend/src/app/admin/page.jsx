"use client";
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

// Sample Data for charts
const lineData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 600 },
];

const barData = [
  { name: 'Product A', sales: 1000 },
  { name: 'Product B', sales: 900 },
  { name: 'Product C', sales: 1200 },
  { name: 'Product D', sales: 800 },
];

const Dashboard = () => {
  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Entity 1: Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Monthly Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Entity 2: Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Sales by Product
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Entity 3: Stats Box */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h3" color="primary">
              1,245
            </Typography>
          </Paper>
        </Grid>

        {/* Entity 4: Stats Box */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h3" color="secondary">
              $53,000
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
