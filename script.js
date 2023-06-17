document.getElementById("myForm").addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Get the form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    
    // Create the Google Form URL
    var formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdHyXM4DwIHt8wYODQ1ZuefEII_YHkA98JCeZrH8KrvbQUKvA/formResponse";
    
    // Construct the form data
    var formData = new FormData();
    formData.append("entry.1421637405", name);
    formData.append("entry.1126696729", email);
    formData.append("entry.1332288966", message);
    
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    xhr.open("POST", formURL);
    
    // Set the appropriate headers for the form data
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // Handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("Form submitted successfully");
            // You can perform additional actions here after successful submission
        } else {
            alert("Form submission failed");
            // You can handle the failure scenario here
        }
    };
    
    xhr.onerror = function() {
        alert("An error occurred");
    };
    
    // Send the form data
    xhr.send(new URLSearchParams(formData));
}
