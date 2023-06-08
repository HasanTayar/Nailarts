import LoginForm from '../../components/Login/LoginForm';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

const Login = () => {
  return (
    <Container 
      component="main" 
      maxWidth="xs"
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
      }}
    >
      <CssBaseline />
      <Typography component="h1" variant="h5">
        התחברות
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;
