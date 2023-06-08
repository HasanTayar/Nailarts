const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Other app configurations

// Use the userRoutes router
app.use('/user',userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
