document.addEventListener("DOMContentLoaded", function () {
	checkAuthentication();
	document.getElementById("user-name").textContent = JSON.parse(
		sessionStorage.getItem("currentUser")
	).username;
	if (checkAdmin()) {
		document.querySelector(".dashboard-link").href = "admindashboard.html";
		document.querySelector(".browse-post").href = "jobpost.html";
		document.querySelector(".browse-post").innerHTML = "Post Job";
	} else {
		document.querySelector(".dashboard-link").href = "userdashboard.html";
		document.querySelector(".browse-post").href = "joblisting.html";
		document.querySelector(".browse-post").innerHTML = "Browse Jobs";
	}

	displayData();
});

function displayData() {
	const posts = JSON.parse(localStorage.getItem("allJobs")) || [];

	if (posts.length == 0) {
		document.getElementById("job-list").innerHTML = "<h1>No jobs found</h3>";
		return;
	}

	document.getElementById("job-list").innerHTML = "";

	posts.forEach(function (post) {
		const jobs = document.createElement("div");
		jobs.innerHTML = `
		<div class="job">
			<div class="job-content">
				<h3 class="job-title">${post.title}</h3>
				<p class="company-name">${post.company}</p>
				<p class="job-description">${post.description}</p>
			</div>
			<div class="details"><a href="jobdetail.html?id=${post.id}" class="job-link" ><span title="See Full Description">&rarr;</span></a></div>
		</div>
			    `;
		document.getElementById("job-list").appendChild(jobs);
	});
}

function search(event) {
	event.preventDefault();

	const posts = JSON.parse(localStorage.getItem("allJobs")) || [];

	var experience = document.getElementById("experience").value;
	var keyword = document.getElementById("keyword").value;
	keyword = keyword.toLowerCase();
	localStorage.setItem("keyword", keyword);
	localStorage.setItem("experience", experience);

	function isEmptyOrSpaces(str) {
		return str == null || (typeof str === "string" && str.trim().length === 0);
	}

	if (isEmptyOrSpaces(keyword) && isEmptyOrSpaces(experience)) {
		displayData();
		return;
	}

	const search = posts.filter(function (post) {
		if (!isEmptyOrSpaces(keyword) && isEmptyOrSpaces(experience)) {
			if (
				post.title.toLowerCase().includes(keyword) ||
				post.company.toLowerCase().includes(keyword)
			) {
				return true;
			}
		}
		if (!isEmptyOrSpaces(experience) && isEmptyOrSpaces(keyword)) {
			if (post.experience >= experience) {
				return true;
			}
		}
		if (!isEmptyOrSpaces(keyword) && !isEmptyOrSpaces(experience)) {
			if (
				(post.title.toLowerCase().includes(keyword) ||
					post.company.toLowerCase().includes(keyword)) &&
				post.experience >= experience
			) {
				return true;
			}
		}
	});

	if (search.length == 0) {
		document.getElementById("job-list").innerHTML = "<h1>No results found</h3>";
		return;
	}

	document.getElementById("job-list").innerHTML = "";

	search.forEach(function (result, index) {
		const jobs = document.createElement("div");
		jobs.innerHTML = `
		<div class="job">
			<div class="job-content">
				<h3 class="job-title">${result.title}</h3>
				<p class="company-name">${result.company}</p>
				<p class="job-description">${result.description}</p>
			</div>
			<div class="details"><a href="jobdetail.html?index=${index}" class="job-link" ><span title="See Full Description">&rarr;</span></a></div>
		</div>
			    `;
		document.getElementById("job-list").appendChild(jobs);
	});
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
