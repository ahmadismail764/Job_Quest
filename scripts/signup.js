function toggleCompanyNameInput() {
    var userType = document.querySelector('input[name="type_job"]:checked').value;
    var companyNameDiv = document.getElementById('companyNameDiv');
  
    if (userType === 'admin') {
      companyNameDiv.style.display = 'block';
    } else {
      companyNameDiv.style.display = 'none';
    }
  }
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // do not refresh on form submission
    signUp(); 
});


  function signUp() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var email = document.getElementById('email').value;
    var userType = document.querySelector('input[name="type_job"]:checked').value;
    var companyName = '';
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false; // do not allow to submit
    }
  
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var existingUser = users.find(function(user) {
      return user.email === email;
    });
  
    if (existingUser) {
      alert("Email already exists");
      return false; // do not allow to submit
    }

    if (userType === 'admin') {
        companyName = document.getElementById('company_name').value;
      }
  
    var user = {
      username: username,
      password: password,
      email: email,
      userType: userType,
      companyName: companyName
    };
  
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Sign Up Successful");
    window.location.href = 'login.html';
    return true;
  }


  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // do not refresh on form submission
    login(); 
});

  function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Retrieve users from local storage
    var users = JSON.parse(localStorage.getItem('users')) || [];
  
    var user = users.find(function(u) {
      return u.username === username;
    });
  
    if (user) {
      if (user.password === password) {
        alert("Login Successful");
        if (user.userType === 'admin') {
          window.location.href = "admindashboard.html";
        } else {
          window.location.href = "userdashboard.html";
        }
        return true;
      } else {
        alert("Invalid password");
        return false; // do not allow to submit
      }
    } else {
      alert("User not found");
      return false; // do not allow to submit
    }
  }
