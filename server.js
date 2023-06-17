const express = require('express');
const app = express();
const fs = require('fs');
const ExcelJS = require('exceljs');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

const excelFilePath = './data/data.xlsx'; // Specify the path to your Excel file

// Check if the Excel file exists, create a new file and write the header row if it doesn't
if (!fs.existsSync(excelFilePath)) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');
  worksheet.addRow(['Twitter Follow', 'Telegram Join', 'Ethereum Address']); // Header row

  workbook.xlsx.writeFile(excelFilePath)
    .then(() => {
      console.log('Excel file created with header row');
    })
    .catch((error) => {
      console.error('Error creating Excel file:', error);
    });
}

// Define a route to handle form submissions
app.post('/save-data', (req, res) => {
  const data = req.body;

  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile(excelFilePath)
    .then(() => {
      const worksheet = workbook.getWorksheet('Data');
      worksheet.addRow([data.twitterUsername, data.telegramUsername, data.ethereumAddress]);

      return workbook.xlsx.writeFile(excelFilePath);
    })
    .then(() => {
      console.log('Data appended to the Excel file');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error appending data to Excel file:', error);
      res.sendStatus(500);
    });
});

// Route handler for the root path
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'Public' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
