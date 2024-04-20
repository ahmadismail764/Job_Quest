document.addEventListener("DOMContentLoaded", function () {
	displayData();
});

function displayData() {
	const posts = JSON.parse(localStorage.getItem("postedJobs")) || [];

	if (posts.length == 0) {
		document.getElementById("job-list").innerHTML = '<h1>No jobs found</h3>';
		return;
	}

	document.getElementById("job-list").innerHTML = "";

	posts.forEach(function (post, index) {
		const jobs = document.createElement('div');
		jobs.innerHTML = `
		<div class="job">
			<div class="job-content">
				<h3 class="job-title">${post.title}</h3>
				<p class="company-name">${post.company}</p>
				<p class="job-description">${post.description}</p>
			</div>
			<div class="details"><a href="jobdetail.html?index=${index}" class="job-link" ><span title="See Full Description">&rarr;</span></a></div>
		</div>
			    `;
		document.getElementById("job-list").appendChild(jobs);
	});
}

function search(event) {
	event.preventDefault();

	const posts = JSON.parse(localStorage.getItem("postedJobs")) || [];

	var salary = document.getElementById("salary").value;
	var keyword = document.getElementById("keyword").value;
	keyword = keyword.toLowerCase();
	localStorage.setItem("keyword", keyword);
	localStorage.setItem("salary", salary);

	function isEmptyOrSpaces(str) {
		return (str == null || (typeof str === "string" && str.trim().length === 0));
	}

	if (isEmptyOrSpaces(keyword) && isEmptyOrSpaces(salary)) {
		displayData();
		return;
	}

	const search = posts.filter(function (post) {
		if (!isEmptyOrSpaces(keyword) && isEmptyOrSpaces(salary)) {
			if ((post.title.toLowerCase().includes(keyword)||post.company.toLowerCase().includes(keyword))) {
				return true;
			}
		}
		if (!isEmptyOrSpaces(salary) && isEmptyOrSpaces(keyword)) {
			if (post.salary >= salary) {
				return true;
			}
		}
		if (!isEmptyOrSpaces(keyword) && !isEmptyOrSpaces(salary)) {
			if ((post.title.toLowerCase().includes(keyword)||post.company.toLowerCase().includes(keyword)) && post.salary >= salary) {
				return true;
			}
		}
	});

	if (search.length == 0) {
		document.getElementById("job-list").innerHTML = '<h1>No results found</h3>';;
		return;
	}

	document.getElementById("job-list").innerHTML = "";

	search.forEach(function (result, index) {
		const jobs = document.createElement('div');
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
