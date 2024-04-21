document.addEventListener("DOMContentLoaded", function () {
	checkAuthentication();
	document.getElementById("user-name").textContent = JSON.parse(sessionStorage.getItem('currentUser')).username;
	if (checkAdmin()) {
		document.querySelector(".dashboard-link").href = "admindashboard.html";
		document.querySelector(".browse-post").href = "jobpost.html";
		document.querySelector(".browse-post").innerHTML = "Post Job";
	}
	else {
		document.querySelector(".dashboard-link").href = "userdashboard.html";
		document.querySelector(".browse-post").href = "joblisting.html";
		document.querySelector(".browse-post").innerHTML = "Browse Jobs";
	}
});

function saveApp(event) {
	const urlParams = new URLSearchParams(window.location.search);
	const id = parseInt(urlParams.get("id"));
	const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
	const thisJob = allJobs[id];
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

	const users = JSON.parse(localStorage.getItem("users")) || [];
	const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

	const appUser = {
		application: appFormData,
		account: currentUser,
	};

	var wanted;
	users.forEach(function (user) {
		user.postedJobs.forEach(function (job) {
			if (job.id === id) {
				user.applliedUsers.push(appUser);
				localStorage.setItem("users", JSON.stringify(users));
			}
		});
	});

	users.forEach(function (user) {
		if (user.email === currentUser.email) {
			user.applliedJobs.push(thisJob);
			localStorage.setItem("users", JSON.stringify(users));
			sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
		}
	});
	// wanted.applliedUsers
	// 	.push(appUser);
	// console.log(wanted);

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
	sessionStorage.removeItem("currentUser");
	window.location.href = "login.html";
}

function checkAuthentication() {
	var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
	if (!currentUser) {
		window.location.href = "login.html";
	}
}

function checkAdmin() {
	var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
	if (currentUser.userType == 'admin') {
		return true;
	}
	else {
		return false;
	}
}
