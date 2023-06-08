import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffe0f0', color: 'black' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NailArts
        </Typography>
        <Button component={Link} to="/" startIcon={<HomeIcon />} sx={{ ml: 2 }} color="inherit">
          בית
        </Button>
        <Button component={Link} to="/about" startIcon={<InfoIcon />} sx={{ ml: 2 }} color="inherit">
          אודות
        </Button>
        <Button component={Link} to="/login" startIcon={<LoginIcon />} sx={{ ml: 2 }} color="inherit">
          התחברות
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
