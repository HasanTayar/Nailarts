require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const corsOptions = {
  origin: process.env.REACT_APP_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
