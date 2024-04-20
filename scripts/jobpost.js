function savePost(event) {
	event.preventDefault();

	// Get form data
	const postFormData = {
		title: document.getElementById("title").value,
		company: document.getElementById("company").value,
		description: document.getElementById("description").value,
		location: document.getElementById("location").value,
		requirements: document.getElementById("requirements").value,
		salary: document.getElementById("salary").value,
		experience: document.getElementById("experience").value,
		overview: document.getElementById("overview").value,
		companyLink: document.getElementById("companyLink").value,
	};

	// Save form data to local storage
	let posts = new Array();
	posts = JSON.parse(localStorage.getItem("postedJobs")) || [];
	posts.push(postFormData);
	localStorage.setItem("postedJobs", JSON.stringify(posts));


	var currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || [];
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
	document.getElementById("overview").value = "";
	document.getElementById("companyLink").value = "";

	alert("Job posted successfully!");
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