import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" className="bg-blue-500">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div" className="text-white">
          NailArts
        </Typography>
        <div>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            className="text-white mr-4"
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            color="inherit"
            className="text-white mr-4"
          >
            About
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            className="text-white"
          >
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
