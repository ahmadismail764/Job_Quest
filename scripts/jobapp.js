function saveApp(event) {
	event.preventDefault();

	// Get form data
	const appFormData = {
		fullname: document.getElementById("fullname").value,
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value,
		education: document.getElementById("education").value,
		experience: document.getElementById("experience").value,
		linkedin: document.getElementById("linkedin").value,
		comments: document.getElementById("comments").value,
	};

	// Save form data to local storage
	let applications = new Array();
	applications = JSON.parse(localStorage.getItem("jobApplications")) || [];
	applications.push(appFormData);
	localStorage.setItem("jobApplications", JSON.stringify(applications));

	var currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || [];
	const users = JSON.parse(localStorage.getItem("users")) || [];
	currentUser.applliedUsers.push(appFormData);
	users.forEach(function (user) {
		if (user.email === currentUser.email) {
			user.applliedUsers.push(appFormData);
			localStorage.setItem("users", JSON.stringify(users));
			sessionStorage.setItem("currentUser", JSON.stringify(users));
		}
	});

	//Clear form fields after submission
	document.getElementById("fullname").value = "";
	document.getElementById("email").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("education").value = "";
	document.getElementById("experience").value = "";
	document.getElementById("linkedin").value = "";
	document.getElementById("comments").value = "";

	alert("Application submitted successfully!");
}

function logout() {
	sessionStorage.removeItem('currentUser');
	window.location.href = 'login.html';
}

function checkAuthentication() {
	var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	if (!currentUser) {
		window.location.href = 'login.html';
	}
}