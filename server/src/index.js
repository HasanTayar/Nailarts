const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
app.use(cors("*"));


app.use('/user',userRoutes);

// Start the server on the local
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
