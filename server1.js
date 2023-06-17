const express = require('express');
const app = express();
const fs = require('fs');
const csv = require('fast-csv');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

const csvFilePath = './data/data.csv'; // Specify the path to your CSV file
const csvWriteStream = fs.createWriteStream(csvFilePath, { flags: 'a' });

// Check if the CSV file exists, create a new file and write the header row if it doesn't
if (!fs.existsSync(csvFilePath)) {
  csv.write([['Name', 'Email']], { headers: true })
    .pipe(csvWriteStream);
}

// Define a route to handle form submissions
app.post('/save-data', (req, res) => {
  const data = req.body;

  // Append the data to the existing CSV file
  csv.write([data], { headers: false })
    .pipe(csvWriteStream, { end: false });

  console.log('Data appended to the CSV file');
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
