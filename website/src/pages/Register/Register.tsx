import RegisterForm from '../../components/Register/RegisterForm';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';


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
      <RegisterForm />
    </Container>
  );
};

export default Login;
