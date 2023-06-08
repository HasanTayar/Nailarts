const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const whitelist = [process.env.REACT_APP_URL, 'http://localhost:4000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));


app.use('/user',userRoutes);

// Start the server on the local
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
