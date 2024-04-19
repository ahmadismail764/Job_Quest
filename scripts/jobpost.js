function savePost(event) {
	event.preventDefault();

	// Get form data
	const postFormData = {
		title: document.getElementById("title").value,
		description: document.getElementById("description").value,
		location: document.getElementById("location").value,
		requirements: document.getElementById("requirements").value,
		salary: document.getElementById("salary").value,
		overview: document.getElementById("overview").value,
		companyLink: document.getElementById("companyLink").value,
	};

	// Save form data to local storage
	let posts = new Array();
	posts = JSON.parse(localStorage.getItem("postedJobs")) || [];
	posts.push(postFormData);
	localStorage.setItem("postedJobs", JSON.stringify(posts));

	//Clear form fields after submission
	document.getElementById("title").value = "";
	document.getElementById("description").value = "";
	document.getElementById("location").value = "";
	document.getElementById("requirements").value = "";
	document.getElementById("salary").value = "";
	document.getElementById("overview").value = "";
	document.getElementById("companyLink").value = "";

	alert("Job posted successfully!");
}
