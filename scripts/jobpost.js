document.addEventListener("DOMContentLoaded", function () {
	checkAuthentication();

	document.getElementById("user-name").textContent = JSON.parse(
		sessionStorage.getItem("currentUser")
	).username;
	if (checkAdmin()) {
		console.log("User");
		document.querySelector(".dashboard-link").href = "admindashboard.html";
		document.querySelector(".browse-post").href = "jobpost.html";
		document.querySelector(".browse-post").innerHTML = "Post Job";
	} else {
		document.querySelector(".dashboard-link").href = "userdashboard.html";
		document.querySelector(".browse-post").href = "joblisting.html";
		document.querySelector(".browse-post").innerHTML = "Browse Jobs";
	}
});

let postIdCounter;
posts = JSON.parse(localStorage.getItem("allJobs")) || [];

if (posts.length === 0) {
	postIdCounter = 0;
} else {
	postIdCounter = posts[posts.length - 1].id;
}
function savePost(event) {
	event.preventDefault();
	// Get form data
	const postFormData = {
		id: postIdCounter,
		title: document.getElementById("title").value,
		company: document.getElementById("company").value,
		description: document.getElementById("description").value,
		location: document.getElementById("location").value,
		requirements: document.getElementById("requirements").value,
		salary: document.getElementById("salary").value,
		experience: document.getElementById("experience").value,
		overview: document.getElementById("overview").value,
		companyLink: document.getElementById("companyLink").value,
		applliedUsers: new Array(),
	};

	// Increment the counter
	postIdCounter++;

	// Save form data to local storage
	let posts = new Array();
	posts.push(postFormData);
	localStorage.setItem("allJobs", JSON.stringify(posts));

	var currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || [];
	const users = JSON.parse(localStorage.getItem("users")) || [];
	currentUser.postedJobs.push(postFormData);

	users.forEach(function (user) {
		if (user.email === currentUser.email) {
			user.postedJobs.push(postFormData);
			localStorage.setItem("users", JSON.stringify(users));
			sessionStorage.setItem("users", JSON.stringify(users));
		}
	});

	//Clear form fields after submission
	document.getElementById("title").value = "";
	document.getElementById("company").value = "";
	document.getElementById("description").value = "";
	document.getElementById("location").value = "";
	document.getElementById("requirements").value = "";
	document.getElementById("salary").value = "";
	document.getElementById("experience").value = "";
	document.getElementById("overview").value = "";
	document.getElementById("companyLink").value = "";

	alert("Job posted successfully!");
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
	var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
	if (currentUser.userType == "admin") {
		return true;
	} else {
		return false;
	}
}
