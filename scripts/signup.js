function toggleCompanyNameInput() {
    var userType = document.querySelector('input[name="type_job"]:checked').value;
    var companyNameDiv = document.getElementById('companyNameDiv');
    
    if (userType === 'admin') {
      companyNameDiv.style.display = 'block';
    } else {
      companyNameDiv.style.display = 'none';
    }
  }
  