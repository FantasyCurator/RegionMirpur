// Replace with your published Web App URL (deploy as "Anyone")
const scriptURL = "https://script.google.com/macros/s/AKfycbxsCizOFOwznfh6nbBj0BzQTwPtrCZJ6jecr0dWc4lWqhVuWvKsDyDhyMs4ACswD_0SyQ/exec";

document.addEventListener('DOMContentLoaded', () => {
  const addFamilyBtn = document.getElementById('addFamilyBtn');
  const familyFormContainer = document.getElementById('familyFormContainer');
  const cancelFamilyBtn = document.getElementById('cancelFamilyBtn');
  const addNewRecordBtn = document.getElementById('addNewRecordBtn');
  const submitToSheetsBtn = document.getElementById('submitToSheetsBtn');
  const personalForm = document.getElementById('personalForm');
  const familyForm = document.getElementById('familyForm');

  const noFamilyMessage = document.getElementById('noFamilyMessage');
  const familyTableContainer = document.getElementById('familyTableContainer');
  const familyMembersTable = document.getElementById('familyMembersTable');
  const familyCountBadge = document.getElementById('familyCount');
  const submitContainer = document.getElementById('submitContainer');
  const submitStatus = document.getElementById('submitStatus');
  const statusText = document.getElementById('statusText');

  let familyMembers = [];

  // Utility: validate CNIC (13 digits)
  function validCNIC(s) {
    return typeof s === 'string' && /^\d{13}$/.test(s);
  }

  // Add Family button - show family form only if employee form valid
  addFamilyBtn.addEventListener('click', () => {
    if (!personalForm.checkValidity()) {
      personalForm.reportValidity();
      return;
    }
    familyFormContainer.style.display = 'block';
    familyForm.scrollIntoView({behavior:'smooth'});
  });

  // Cancel family entry
  cancelFamilyBtn.addEventListener('click', () => {
    familyForm.reset();
    familyFormContainer.style.display = 'none';
  });

  // Add New Record
  addNewRecordBtn.addEventListener('click', () => {
    // Validate family form fields
    const rel = document.getElementById('relationship').value;
    const name = document.getElementById('familyName').value.trim();
    const cnic = document.getElementById('cnic').value.trim();
    const dob = document.getElementById('dob').value;
    const marital = document.getElementById('maritalstatus').value;
    const job = document.getElementById('jobstatus').value;

    // Family CNIC must match CNIC format (13 digits)
    if (!rel || !name || !cnic || !dob || !marital || !job) {
      alert('Please complete all required family fields.');
      return;
    }
    if (!validCNIC(cnic)) {
      alert('Please enter valid 13-digit CNIC for family member (numbers only).');
      return;
    }
    // Optionally: check family CNIC not same as employee? (not requested)
    // push member
    familyMembers.push({ relationship: rel, name, cnic, dob, marital, job });
    renderFamilyMembers();

    // Hide family form after adding (as requested)
    familyForm.reset();
    familyFormContainer.style.display = 'none';
  });

  // Render family members table
  function renderFamilyMembers() {
    if (!familyMembers.length) {
      noFamilyMessage.style.display = 'block';
      familyTableContainer.style.display = 'none';
      familyMembersTable.innerHTML = '';
      familyCountBadge.innerText = '0';
      submitContainer.style.display = 'none';
      return;
    }

    noFamilyMessage.style.display = 'none';
    familyTableContainer.style.display = 'block';
    submitContainer.style.display = 'block';
    familyCountBadge.innerText = String(familyMembers.length);

    let html = '';
    familyMembers.forEach((m, idx) => {
      html += `
        <tr>
          <td>${idx+1}</td>
          <td>${escapeHtml(m.relationship)}</td>
          <td>${escapeHtml(m.name)}</td>
          <td>${formatCNIC(m.cnic)}</td>
          <td>${m.dob}</td>
          <td>${m.marital}</td>
          <td>${m.job}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger" data-action="delete" data-index="${idx}">Delete</button>
          </td>
        </tr>
      `;
    });
    familyMembersTable.innerHTML = html;
  }

  // Helper: format CNIC 13->xxxxx-xxxxxxx-x
  function formatCNIC(cnic) {
    if (!/^\d{13}$/.test(cnic)) return cnic;
    return cnic.replace(/(\d{5})(\d{7})(\d{1})/,'$1-$2-$3');
  }

  // Escape HTML to avoid injection
  function escapeHtml(s){ return (s+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  // Delegate click for delete buttons
  familyMembersTable.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-action="delete"]');
    if (!btn) return;
    const idx = Number(btn.dataset.index);
    if (!isNaN(idx)) {
      if (confirm('Remove this family member?')) {
        familyMembers.splice(idx,1);
        renderFamilyMembers();
      }
    }
  });

const designationSelect = document.getElementById('designation');

// Options list
const ministerialOptions = ["Head Clerk", "Steno", "Senior Clerk", "Junior Clerk", "Naib Qasid"];
const executiveOptions = ["INSP", "PI", "SI", "ASI", "HC", "FC", "Follower"];

// Function to load options
function loadOptions(options) {
  // Reset dropdown
  designationSelect.innerHTML = '<option value="">Select Designation</option>';

  // Add new options
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    designationSelect.appendChild(option);
  });

  // Enable dropdown
  designationSelect.disabled = false;
}

// Event listener on radio buttons
document.querySelectorAll('input[name="empType"]').forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === "Ministerial") {
      loadOptions(ministerialOptions);
    } else if (radio.value === "Executive") {
      loadOptions(executiveOptions);
    }
  });
});
  
  // Submit all to Apps Script
  submitToSheetsBtn.addEventListener('click', async () => {
    // validate employee fields one more time
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

    // Show spinner
    submitStatus.style.display = 'block';
    statusText.textContent = 'Saving to Google Sheets...';
    submitToSheetsBtn.disabled = true;

    try {
      // Use URLSearchParams to avoid CORS preflight (no JSON content-type header)
      const body = new URLSearchParams();
      body.append('employee', JSON.stringify(employee));
      body.append('familyMembers', JSON.stringify(familyMembers));

      const res = await fetch(scriptURL, {
        method: 'POST',
        body: body
      });

      // response should be JSON from Apps Script
      const data = await res.json();

      if (data && (data.status === 'success' || data.result === 'success')) {
        // Redirect to plans.html after success
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

}); // DOMContentLoaded







