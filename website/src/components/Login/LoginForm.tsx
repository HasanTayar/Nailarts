import React from 'react';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import { useDispatch } from '../../store/useDispatch';
import { Link as RouterLink } from 'react-router-dom';
import { login } from '../../store/authSlice';
import { GoogleLogin } from 'react-google-login-lite';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    dispatch(login(email, password));
  };

  const responseGoogle = (response: any) => {
    const tokenId = response?.tokenId;
    if (tokenId) {
      // replace with your own logic to authenticate with your backend using Google token
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      noValidate 
      sx={{ 
        mt: 3,
        '& .MuiTextField-root': {
          mb: 2,
        },
        '& .MuiButton-root': {
          mt: 1,
          mb: 2,
        },
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        id="email"
        label="דוא״ל"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        fullWidth
        name="password"
        label="סיסמא"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        התחברות
      </Button>
      <GoogleLogin
        client_id={`${import.meta.env.VITE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiepolicy={'single_host_origin'}
      />
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2">
          אין לך חשבון?{' '}
          <Link component={RouterLink} to="/register" variant="body2">
            הרשמה
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
