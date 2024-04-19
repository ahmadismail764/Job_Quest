document.addEventListener("DOMContentLoaded", function () {
	displayData();
});

function displayData() {
	const dataList = document.getElementById("dataList");
	const applications =
		JSON.parse(localStorage.getItem("jobApplications")) || [];
	const posts = JSON.parse(localStorage.getItem("postedJobs")) || [];

	if (applications.length == 0 && posts.length == 0) {
		dataList.innerHTML = "<li>No applications and jobs found</li>";
		return;
	}

	dataList.innerHTML = "";

	applications.forEach(function (application, index) {
		const listItem = document.createElement("li");
		listItem.innerHTML = `
      <strong>Application ${index + 1}</strong><br>
      Full Name: ${application.fullname}<br>
      Email: ${application.email}<br>
      Phone: ${application.phone}<br>
      Education: ${application.education}<br>
      Experience: ${application.experience}<br>
      LinkedIn: <a href="${application.linkedin}">${application.linkedin
			}</a><br>
      Comments: ${application.comments}<br>
      <hr>
    `;
		dataList.appendChild(listItem);
	});
	posts.forEach(function (post, index) {
		const listItem = document.createElement("li");
		listItem.innerHTML = `
			<a href="jobdetail.html?index=${index}"><strong>Job ${index + 1}</strong></a><br>
      Job Title: ${post.title}<br>
      Job Description: ${post.description}<br>
      Location: ${post.location}<br>
      Requirements: ${post.requirements}<br>
      Salary: ${post.salary}<br>
      Company overview: ${post.overview}<br>
      Company link: <a href="${post.companyLink}">${post.companyLink}</a><br>
      <hr>
    `;
		dataList.appendChild(listItem);
	});
}
