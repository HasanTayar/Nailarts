import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="fixed" className="bg-pink-500">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div" className="text-white flex-grow-0">
          NailArts
        </Typography>
        <div className="flex-grow flex justify-end">
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
