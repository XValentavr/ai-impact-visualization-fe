import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <Box>
      <Container component="main" maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
