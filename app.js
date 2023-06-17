const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Save the data to a CSV file
  const data = `${name},${email},${message}\n`;
  fs.appendFile(path.join(__dirname, 'data.csv'), data, (err) => {
    if (err) {
      console.error('Error saving data to CSV file:', err);
      res.sendStatus(500); // Send an internal server error response
    } else {
      console.log('Data saved to CSV file.');
      res.sendStatus(200); // Send a success response
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
