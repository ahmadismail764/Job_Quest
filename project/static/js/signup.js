function checkCompanyNameInput() {
  var userType = document.querySelector('input[name="type_job"]:checked').value;
  var companyNameDiv = document.getElementById("companyNameDiv");

  if (userType === "admin") {
    companyNameDiv.style.display = "block";
  } else {
    companyNameDiv.style.display = "none";
  }
}

function signUp() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm_password").value;
  var email = document.getElementById("email").value;
  var userType = document.querySelector('input[name="type_job"]:checked').value;
  var companyName = "";
  var postedJobs = new Array();
  var applliedJobs = new Array();

  // check confirming password
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return false;
  }

  // check validation of email must have (.) and one of ['net', 'org', 'edu', 'gov', 'com']
  if (email.indexOf(".") === -1) {
    alert("Invalid email address please enter a valid email.");
    return false;
  }

  var domain = email.split(".")[1];
  var validDomains = ["net", "org", "edu", "gov", "com"];
  if (validDomains.indexOf(domain) == -1) {
    alert("Invalid email address. Please enter a valid email.");
    return false;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];
  var existingUser = users.find(function (user) {
    return user.email === email;
  });

  if (existingUser) {
    alert("Email already exists");
    return false;
  }

  if (userType === "admin") {
    companyName = document.getElementById("company_name").value;
  }

  var user = {
    username: username,
    password: password,
    email: email,
    userType: userType,
    companyName: companyName,
    postedJobs: postedJobs,
    applliedJobs: applliedJobs,
  };

  users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign Up Successful");
  window.location.href = "login.html";
  return true;
}
