require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const corsOptions = {
  origin: "https://nailarts-three.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true, // this allows session cookies to be sent and received
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));

app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
