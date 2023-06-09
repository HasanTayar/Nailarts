import { useState } from 'react';
import { useDispatch } from '../../store/useDispatch';
import { register } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const MyTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 15px;
`;

const Input = styled('input')({
  display: 'none',
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
    setPreview(file ? URL.createObjectURL(file) : undefined);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError("סיסמאות לא תואמות!");
      return;
    }

    const userWithPhoto = {
      ...user,
      photo: file,
    };

    try {
      await dispatch(register(userWithPhoto));
      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err : any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px'}}>
        <Avatar alt="User Image" src={preview} sx={{width: 56, height: 56}}/>
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange} />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>
           <MyTextField
        name="firstName"
        label="שם פרטי"
        value={user.firstName}
        onChange={handleInputChange}
      />
      <MyTextField
        name="lastName"
        label="שם משפחה"
        value={user.lastName}
        onChange={handleInputChange}
      />
      <MyTextField
        name="phone"
        label="טלפון"
        value={user.phone}
        onChange={handleInputChange}
      />
      <MyTextField
        name="password"
        type="password"
        label="סיסמה"
        value={user.password}
        onChange={handleInputChange}
      />
      <MyTextField
        name="confirmPassword"
        type="password"
        label="אימות סיסמה"
        value={user.confirmPassword}
        onChange={handleInputChange}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained" color="primary">
        הרשמה
      </Button>
    </form>
  );
};

export default RegisterForm;
