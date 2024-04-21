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

	const urlParams = new URLSearchParams(window.location.search);
	const id = parseInt(urlParams.get("id"));

	const jobs = JSON.parse(localStorage.getItem("allJobs")) || [];

	if (!isNaN(id) && id >= 0 && id < jobs.length) {
		const job = jobs[id];
		displayJobDetails(job);
	} else {
		console.error("Invalid job id");
	}
});


function displayJobDetails(job) {
	document.getElementById("title").textContent = job.title;
	document.getElementById("company").textContent = job.company;
	document.getElementById("description").textContent = job.description;
	document.getElementById("location").textContent = job.location;
	document.getElementById("requirements").textContent = job.requirements;
	document.getElementById("experience").textContent = job.experience;
	document.getElementById("salary").textContent = job.salary;
	document.getElementById("overview").textContent = job.overview;
	document.querySelector(".apply-button").href = `jobapp.html?id=${job.id}`;
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