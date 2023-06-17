document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  // Retrieve form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Create CSV data
  const csvData = Papa.unparse([{ name, email, message }]);

  // Create a data URI for the CSV file
  const csvFile = new Blob([csvData], { type: 'text/csv' });
  const csvURL = URL.createObjectURL(csvFile);

  // Trigger the download
  const downloadLink = document.createElement('a');
  downloadLink.href = csvURL;
  downloadLink.download = 'data.csv';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});
