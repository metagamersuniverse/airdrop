document.getElementById("myForm").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var formData = {
    name: name,
    email: email,
    message: message
  };

  // Make a POST request to your backend server
  fetch('https://203.161.57.175:3000/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(function (response) {
      if (response.ok) {
        alert("Form submitted successfully");
        // Additional actions after successful form submission
      } else {
        alert("Form submission failed");
        // Handle failure scenario
      }
    })
    .catch(function (error) {
      alert("An error occurred: " + error);
    });
}
