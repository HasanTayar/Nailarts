const express = require('express');
const app = express();
const db = require('./Services/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const multer = require('multer');
const path = require('path');



app.use(cors());

// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'asset', 'userImages'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage });

// Apply the middleware to handle file uploads
app.use(upload.single('photo'));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
