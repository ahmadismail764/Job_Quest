function login() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	// Retrieve users from local storage
	var users = JSON.parse(localStorage.getItem("users")) || [];

	var user = users.find(function (u) {
		return u.email === email;
	});

	if (user) {
		if (user.password === password) {
			sessionStorage.setItem("currentUser", JSON.stringify(user));
			alert("Login Successful");
			if (user.userType === "admin") {
				window.location.href = "admindashboard.html";
			} else {
				window.location.href = "userdashboard.html";
			}
			return true;
		} else {
			alert("Invalid password");
			return false; 
		}
	} else {
		alert("User not found");
		return false; 
	}
}
