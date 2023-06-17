document.getElementById('dataForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);

  const ethereumAddress = formData.get('ethereumAddress');
  if (!isValidEthereumAddress(ethereumAddress)) {
    console.error('Invalid Ethereum address');
    return false; // Prevent form submission
  }

  fetch('/save-data', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)), // Convert form data to JSON
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Data saved successfully');
        form.reset(); // Clear the form fields
        showSuccessSection(); // Show the success message section
      } else {
        console.error('Failed to save data');
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return false; // Prevent form submission
});

function isValidEthereumAddress(address) {
  const regex = /^(0x)?[0-9a-fA-F]{40}$/;
  return regex.test(address);
}

const ethereumAddressInput = document.querySelector('input[name="ethereumAddress"]');
const ethereumError = document.getElementById('ethereumError');

ethereumAddressInput.addEventListener('input', function () {
  const address = this.value.trim();
  if (address !== '' && !isValidEthereumAddress(address)) {
    ethereumError.style.display = 'block';
  } else {
    ethereumError.style.display = 'none';
  }
});

function showSuccessSection() {
  const dataFormSection = document.getElementById("dataFormSection");
  const successSection = document.getElementById("successSection");

  dataFormSection.style.display = "none";
  successSection.style.display = "block";
}

function openWebsite() {
  window.open("https://www.pabloeth.xyz/", "_blank");
  const websiteLabel = document.getElementById("websiteLabel");
  const ethereumAddressLabel = document.getElementById("ethereumAddressLabel");

  websiteLabel.style.display = "none";
  ethereumAddressLabel.style.display = "block";
}
