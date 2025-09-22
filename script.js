isi code mein changing krni hai. posting place ky hisab say scriptURL pass ho script.js ko aur data relevant google sheet mein save ho jaye.

scriptURL:

Region Office: https://script.google.com/macros/s/AKfycbyMg1PH-cETT0IRRnuvmaffZj6x8PsRylEz3tcE3wju1idgsn4wZwGLVFrsG4Xh5nmSNw/exec

District Mirpur: https://script.google.com/macros/s/AKfycbwoblVAfQBNcKmcfJyjbWhkyuKQ2eUFmCQEqBsyq4HoA4jiO3mKcv5jL1ipVBWvAXjYmA/exec

District Kotli: https://script.google.com/macros/s/AKfycbzdp71GGpnMJm28V5YqXLPtu0eZ_5zJ8WKAVk64F-URViplVp5WIJzWEpLmdHwLXCqF/exec

District Bhimber: https://script.google.com/macros/s/AKfycbxwMHZQfM0Im5n0Zl1DkgqvkeO1mjD3_3VPSViXRfIY5R_eA1ePEkAz48tEMRMVieSb/exec


...........form.html code...........

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>AJKP - Employee & Family Information</title>

  <!-- Bootstrap (kept as you used) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

  <style>
    /* Your original styling, preserved & slightly tuned for header layout */
    body {
      background-color: #f5f8fa;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .header {
      background: linear-gradient(135deg, #1a3a6c 0%, #2a5298 100%);
      color: white;
      padding: 1.25rem 0.75rem;
      margin-bottom: 1.5rem;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    /* header inner layout: logo left, heading centered overall */
    .header-content {
      display:flex;
      align-items:center;
      justify-content:center; /* centers entire group horizontally */
      gap: 20px;
    }
    .logo {
      width: 100px;
      height: 100px;
      display:flex;
      align-items:center;
      justify-content:center;
      margin-left: -80px; /* pull left so group remains visually centered but logo sits left */
    }
    .logo img { max-width:100%; max-height:100%; display:block; }
    .header-text { text-align:center; }
    .header-text p { margin:0; opacity:0.95; }

    .card { border-radius:10px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border:none; }
    .card-header { background: linear-gradient(120deg,#f8f9fa 0%,#e9ecef 100%); border-bottom:1px solid rgba(0,0,0,0.05); font-weight:600; color:#2c3e50; }
    .btn-primary { background: linear-gradient(135deg,#1a3a6c 0%,#2a5298 100%); border:none; }
    .btn-success { background: linear-gradient(135deg,#28a745 0%,#20c997 100%); border:none; }
    .btn-google { background: linear-gradient(135deg,#4285F4 0%,#34A853 100%); border:none; color:white; }
    .required:after { content:" *"; color:red; }
    .footer { background: linear-gradient(135deg,#1a3a6c 0%,#2a5298 100%); color:white; padding:1rem 0; margin-top:1.5rem; border-radius:10px 10px 0 0; text-align:center; }
    .table thead { background: linear-gradient(120deg,#1a3a6c 0%,#2a5298 100%); color:white; }
    .cnic-input { font-family:monospace; letter-spacing:1px; }
    @media(max-width:768px) {
      .header-content { flex-direction:column; gap:10px; }
      .logo { margin-left:0; }
    }
   
  </style>
</head>
<body>

  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo left -->
        <div class="logo" aria-hidden="true">
          <!-- replace src with your logo filename hosted on GitHub pages -->
          <img src="AJKPLogo.png" alt="AJK Police Logo">
        </div>

        <!-- Heading text centered visually -->
        <div class="header-text">
          <h1>Police Region Office Mirpur</h1>
          <p class="lead mb-0">Employee's Family Detail</p>
        </div>
      </div>
    </div>
  </header>

  <main class="container">

    <!-- Employee card -->
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0"><i class="fas fa-user me-2"></i>Employee Information</h5>
      </div>
      <div class="card-body">
        <form id="personalForm">
          <div class="mb-3">
            <label for="postingPlace" class="form-label required">Posting Place</label>
            <select class="form-select" id="postingPlace" required>
              <option value="" selected disabled>Select Posting Place</option>
              <option value="Region Office">Region Office</option>
              <option value="Mirpur">District Mirpur</option>
              <option value="Kotli">District Kotli</option>
              <option value="Bhimber">District Bhimber</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="fullName" class="form-label required">Full Name</label>
            <input type="text" id="fullName" class="form-control" placeholder="Enter your full name" required>
          </div>

<div class="mb-3">
  <label class="form-label required">Employee Category</label><br>

  <!-- Radio Buttons (required added) -->
  <input type="radio" name="empType" id="ministerial" value="Ministerial" required>
  <label for="ministerial">Ministerial Staff</label>

  <input type="radio" name="empType" id="executive" value="Executive" class="ms-3">
  <label for="executive">Executive Staff</label><br>

  <!-- Single Dropdown -->
  <select id="designation" class="form-select mt-3" disabled required>
    <option value="">Select Designation</option>
  </select>
</div>


          <div class="mb-3">
            <label for="employeeCnic" class="form-label required">Employee CNIC</label>
            <input type="text" id="employeeCnic" class="form-control cnic-input" maxlength="13" pattern="[0-9]{13}" title="13 digits, no hyphens" required>
            <div class="form-text">Enter without hyphens (e.g., 1234567890123)</div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label required">Email</label>
            <input type="email" id="email" class="form-control" required>
          </div>

          <div class="mb-3">
            <label for="mobile" class="form-label required">Mobile Number</label>
            <input type="text" id="mobile" class="form-control" required>
          </div>

          <div class="mb-3">
            <label for="bloodGroup" class="form-label">Blood Group</label>
            <select id="bloodGroup" class="form-select">
              <option value="">Select Blood Group</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>O+</option><option>O-</option>
              <option>AB+</option><option>AB-</option>
            </select>
          </div>
       
          <button type="button" class="btn btn-primary mt-2" id="addFamilyBtn">
            <i class="fas fa-plus-circle me-2"></i>Add Family Member
          </button>
        </form>
      </div>
    </div>

    <!-- Family form card (hidden initially) -->
    <div class="card mb-4" id="familyFormContainer" style="display:none;">
      <div class="card-header">
        <h5 class="mb-0"><i class="fas fa-users me-2"></i>Add Family Member</h5>
      </div>
      <div class="card-body">
        <form id="familyForm">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="relationship" class="form-label required">Relationship</label>
              <select id="relationship" class="form-select" required>
                <option value="" selected disabled>Select relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Wife">Wife</option>
                <option value="Husband">Husband</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Special Child">Special Child</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="familyName" class="form-label required">Full Name</label>
              <input type="text" id="familyName" class="form-control" placeholder="Enter family member's name" required>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cnic" class="form-label required">CNIC</label>
              <input type="text" id="cnic" class="form-control cnic-input" maxlength="13" pattern="[0-9]{13}" title="13 digits, no hyphens" required>
              <div class="form-text">Enter without hyphens (e.g., 1234567890123)</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="dob" class="form-label required">Date of Birth</label>
              <input type="date" id="dob" class="form-control" required>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="maritalstatus" class="form-label required">Marital Status</label>
              <select id="maritalstatus" class="form-select" required>
                <option value="" selected disabled>Select Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="jobstatus" class="form-label required">Job Status</label>
              <select id="jobstatus" class="form-select" required>
                <option value="" selected disabled>Select Status</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-between mt-3">
            <button type="button" class="btn btn-secondary" id="cancelFamilyBtn"><i class="fas fa-times me-2"></i>Cancel</button>
            <button type="button" class="btn btn-success" id="addNewRecordBtn"><i class="fas fa-plus me-2"></i>Add New Record</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Family members display -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="fas fa-list me-2"></i>Family Members</h5>
        <span class="badge bg-primary rounded-pill" id="familyCount">0</span>
      </div>
      <div class="card-body">
        <div id="noFamilyMessage" class="text-center p-4">
          <i class="fas fa-users fa-3x mb-3 text-muted"></i>
          <p class="text-muted mb-0">No family members added yet. Click 'Add Family Member' to get started.<br>This information is necessary for issuing of Medical Card through HRMIS.</p>
        </div>

        <div id="familyTableContainer" style="display:none;">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Relationship</th>
                  <th>Name</th>
                  <th>CNIC</th>
                  <th>Date of Birth</th>
                  <th>Marital Status</th>
                  <th>Job Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="familyMembersTable"></tbody>
            </table>
          </div>
        </div>

        <!-- Submit -->
        <div class="submit-container text-center mt-3" id="submitContainer" style="display:none;">
          <button type="button" class="btn btn-google btn-lg" id="submitToSheetsBtn"><i class="fab fa-google me-2"></i>Submit All Information</button>
          <div id="submitStatus" class="mt-3" style="display:none;">
            <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
            <span id="statusText">Saving Data...</span>
          </div>
        </div>

      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <p class="mb-0">2025 © AJK Police | All rights reserved by "Fantasy Curator" | Umair Hussain (0345-5511415)</p>
    </div>
  </footer>

  <!-- fontawesome icons (used for header icons/buttons) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
  <!-- main JS -->
  <script src="script.js"></script>
</body>
</html>


...........script.js code...........

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

