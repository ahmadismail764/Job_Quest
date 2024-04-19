document.addEventListener("DOMContentLoaded", function () {
	displayData();
});

function displayData() {
	const dataList = document.getElementById("dataList");
	const applications =
		JSON.parse(localStorage.getItem("jobApplications")) || [];
	
	if (applications.length == 0) {
		dataList.innerHTML = "<li>No applications found</li>";
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
}
