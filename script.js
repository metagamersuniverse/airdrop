document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission

  // Retrieve form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Create CSV data
  const csvData = Papa.unparse([{ name, email, message }]);

  // Send the CSV data to the server
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(response => {
    if (response.ok) {
      console.log('Form data submitted successfully.');
    } else {
      console.error('Failed to submit form data.');
    }
  })
  .catch(error => {
    console.error('Error submitting form data:', error);
  });
});
