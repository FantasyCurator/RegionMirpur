// Mapping: posting place -> Apps Script URL
const scriptURLs = {
  "Region Office": "https://script.google.com/macros/s/AKfycbyMg1PH-cETT0IRRnuvmaffZj6x8PsRylEz3tcE3wju1idgsn4wZwGLVFrsG4Xh5nmSNw/exec",
  "Mirpur": "https://script.google.com/macros/s/AKfycbwoblVAfQBNcKmcfJyjbWhkyuKQ2eUFmCQEqBsyq4HoA4jiO3mKcv5jL1ipVBWvAXjYmA/exec",
  "Kotli": "https://script.google.com/macros/s/AKfycbzdp71GGpnMJm28V5YqXLPtu0eZ_5zJ8WKAVk64F-URViplVp5WIJzWEpLmdHwLXCqF/exec",
  "Bhimber": "https://script.google.com/macros/s/AKfycbxwMHZQfM0Im5n0Zl1DkgqvkeO1mjD3_3VPSViXRfIY5R_eA1ePEkAz48tEMRMVieSb/exec"
};

document.addEventListener('DOMContentLoaded', () => {
  // ... baaki aapka pura code same rehne do

  // Sirf submit button wale part ko change karte hain:

  submitToSheetsBtn.addEventListener('click', async () => {
    if (!personalForm.checkValidity()) {
      personalForm.reportValidity();
      return;
    }
    if (familyMembers.length === 0) {
      alert('Please add at least one family member before submitting.');
      return;
    }

    const employee = {
      postingPlace: document.getElementById('postingPlace').value,
      fullName: document.getElementById('fullName').value.trim(),
      designation: document.getElementById('designation').value,
      employeeCnic: document.getElementById('employeeCnic').value.trim(),
      email: document.getElementById('email').value.trim(),
      mobile: document.getElementById('mobile').value.trim(),
      bloodGroup: document.getElementById('bloodGroup').value
    };

    if (!/^\d{13}$/.test(employee.employeeCnic)) {
      alert('Please enter valid 13-digit Employee CNIC.');
      return;
    }

    // ✅ Correct scriptURL based on posting place
    const postingPlace = employee.postingPlace;
    const scriptURL = scriptURLs[postingPlace];

    if (!scriptURL) {
      alert("No script URL found for posting place: " + postingPlace);
      return;
    }

    submitStatus.style.display = 'block';
    statusText.textContent = 'Saving to Google Sheets...';
    submitToSheetsBtn.disabled = true;

    try {
      const body = new URLSearchParams();
      body.append('employee', JSON.stringify(employee));
      body.append('familyMembers', JSON.stringify(familyMembers));

      const res = await fetch(scriptURL, { method: 'POST', body });
      const data = await res.json();

      if (data && (data.status === 'success' || data.result === 'success')) {
        window.location.href = "plans.html";
      } else {
        const msg = (data && (data.message || data.error)) || 'Unknown error';
        statusText.textContent = 'Error: ' + msg;
      }
    } catch (err) {
      console.error(err);
      statusText.textContent = 'Error: ' + (err.message || err);
    } finally {
      submitToSheetsBtn.disabled = false;
      setTimeout(()=> submitStatus.style.display = 'none', 2000);
    }
  });

});
