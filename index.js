const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Setup middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML page
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure multer for file upload handling
const upload = multer({ dest: 'uploads/' });

// File upload API endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
