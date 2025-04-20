"use client"; // Ensure this file runs in a client-side environment

import React from 'react';
import { usePathname } from 'next/navigation'; // For detecting the current path
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';

const drawerWidth = 240;

const Sidebar = () => {
  const pathname = usePathname(); // Hook to get the current path

  // Links array for the sidebar
  const links = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      path: '/admin',
    },
    {
      key: 'applicants',
      label: 'Applicants',
      path: '/admin/Applications',
    },
    {
      key: 'home',
      label: 'Log Out',
      path: '/',
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5', // Sidebar background color
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Logo and Title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          
          <Typography variant="h6" noWrap component="div">
            ERP System
          </Typography>
        </Box>

        {/* Sidebar Links */}
        <List>
          {links.map((link) => (
            <Link key={link.key} href={link.path} passHref>
              <ListItem
                button
                sx={{
                  backgroundColor: pathname === link.path ? 'lightblue' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#E0F7FA', // Light blue on hover
                  },
                }}
                selected={pathname === link.path}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            </Link>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* Footer / Bottom Section */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            © 2024 ERP System
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
