document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);
	const index = parseInt(urlParams.get("index"));

	const jobs = JSON.parse(localStorage.getItem("postedJobs")) || [];

	if (!isNaN(index) && index >= 0 && index < jobs.length) {
		const job = jobs[index];
		displayJobDetails(job);
	} else {
		console.error("Invalid job index");
	}
});

function displayJobDetails(job) {
	document.getElementById("title").textContent = job.title;
	document.getElementById("description").textContent = job.description;
	document.getElementById("location").textContent = job.location;
	document.getElementById("requirements").textContent = job.requirements;
	document.getElementById("salary").textContent = job.salary;
	document.getElementById("overview").textContent = job.overview;
}
