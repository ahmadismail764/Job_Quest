// to display or hidding company name input based on user type selection
function toggleCompanyNameInput() {
	var userType = document.querySelector('input[name="type_job"]:checked').value;
	var companyNameDiv = document.getElementById("companyNameDiv");

	if (userType === "admin") {
		companyNameDiv.style.display = "block";
	} else {
		companyNameDiv.style.display = "none";
	}
}

// to handle sign up process
function signUp() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var confirmPassword = document.getElementById("confirm_password").value;
	var email = document.getElementById("email").value;
	var userType = document.querySelector('input[name="type_job"]:checked').value;
	var companyName = "";

	// Check if password matches confirm password
	if (password !== confirmPassword) {
		alert("Passwords do not match");
		return false; // do not allow to submit
	}

	// Check if email already exists
	var users = JSON.parse(localStorage.getItem("users")) || [];
	var existingUser = users.find(function (user) {
		return user.email === email;
	});

	if (existingUser) {
		alert("Email already exists");
		return false; // do not allow to submit
	}

	// Get company name if user is admin
	if (userType === "admin") {
		companyName = document.getElementById("company_name").value;
	}

	// Create user object
	var user = {
		username: username,
		password: password,
		email: email,
		userType: userType,
		companyName: companyName,
	};

	// Store user details in local storage
	users.push(user);
	localStorage.setItem("users", JSON.stringify(users));
	alert("Sign Up Successful");
	window.location.href = "login.html";
	return true;
}

// to handle login process
function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	// Retrieve users from local storage
	var users = JSON.parse(localStorage.getItem("users")) || [];

	// Find user with matching username
	var user = users.find(function (u) {
		return u.username === username;
	});

	if (user) {
		// Check if the password matches
		if (user.password === password) {
			alert("Login Successful");
			// Redirect to appropriate dashboard based on user type
			if (user.userType === "admin") {
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
