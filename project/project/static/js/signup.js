document.addEventListener('DOMContentLoaded', function () {
    const userTypeRadios = document.querySelectorAll('input[name="type_job"]');
    const companyNameField = document.querySelector('#id_company_name');
    const companyLabel = document.querySelector('#companyLabel');

    function toggleCompanyNameField() {
        const selectedUserType = document.querySelector('input[name="type_job"]:checked').value;
        if (selectedUserType === 'admin') {
            companyNameField.style.display = 'block';
            companyLabel.style.display = 'block';
        } else {
            companyNameField.style.display = 'none';
            companyLabel.style.display = 'none';
        }
    }

    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleCompanyNameField);
    });

    // Initial check
    toggleCompanyNameField();
});
