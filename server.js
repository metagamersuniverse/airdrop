const fs = require('fs');
const ExcelJS = require('exceljs');

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

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.readFile(excelFilePath);
      const worksheet = workbook.getWorksheet('Data');
      worksheet.addRow([data.twitterUsername, data.telegramUsername, data.ethereumAddress]);

      await workbook.xlsx.writeFile(excelFilePath);
      console.log('Data appended to the Excel file');
      res.status(200).send('Data saved successfully');
    } catch (error) {
      console.error('Error appending data to Excel file:', error);
      res.status(500).send('Failed to save data');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
