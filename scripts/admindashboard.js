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
var originalAboutText = "";
function editAbout() {
	var aboutSection = document.querySelector("#about-comp .about");
	var aboutText = aboutSection.querySelector("p").textContent;
	originalAboutText = aboutText;
	var textarea = document.createElement("textarea");
	textarea.value = aboutText;
	textarea.style.width = "100%";
	textarea.style.height = "calc(100% - 100px)";

	aboutSection.replaceChild(textarea, aboutSection.querySelector("p"));

	var saveButton = document.createElement("button");
	saveButton.textContent = "Save";
	saveButton.onclick = function () {
		saveAbout(aboutSection, textarea);
	};

	var cancelButton = document.createElement("button");
	cancelButton.textContent = "Cancel";
	cancelButton.onclick = function () {
		cancelEditAbout(aboutSection, textarea);
	};

	var buttonContainer = document.getElementById("button-container");
	buttonContainer.innerHTML = "";
	buttonContainer.appendChild(saveButton);
	buttonContainer.appendChild(cancelButton);
}

function saveAbout(aboutSection, textarea) {
	var newAboutText = textarea.value;
	var newParagraph = document.createElement("p");
	newParagraph.textContent = newAboutText;
	aboutSection.replaceChild(newParagraph, textarea);
	var editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.onclick = function () {
		editAbout();
	};
	var buttonContainer = document.getElementById("button-container");
	buttonContainer.innerHTML = "";
	buttonContainer.appendChild(editButton);
}
function cancelEditAbout(aboutSection, textarea) {
	var originalParagraph = document.createElement("p");
	originalParagraph.textContent = originalAboutText;
	aboutSection.replaceChild(originalParagraph, textarea);
	var editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.onclick = function () {
		editAbout();
	};
	var buttonContainer = document.getElementById("button-container");
	buttonContainer.innerHTML = ""; //
	buttonContainer.appendChild(editButton);
}

function addAward() {
	let award = {};
	while (!award.name || !award.purpose || !award.provider || !award.date) {
		award.name = prompt("What's your new award?");
		award.purpose = prompt("Why did you get it?");
		award.provider = prompt("Who gave it to you?");
		award.date = prompt("When did they give it? (e.g. Mar 2000)");
		if (!award.name || !award.purpose || !award.provider || !award.date) {
			again = confirm("Please fill out all fields.");
			if (!again) {
				return;
			}
		}
	}
	const section = document.getElementById("certs");
	const list = section.getElementsByClassName("list-for-addition")[0];
	const newTitle = document.createElement("dt");
	const newDescrip = document.createElement("dd");
	newTitle.textContent = award.name;
	newDescrip.innerHTML = `Given by: ${award.provider}<br>For:  ${award.purpose}<br>In: ${award.date}`;
	if (list.childNodes.length > 1) list.append(document.createElement("hr"));
	list.append(newTitle);
	list.append(newDescrip);
}
function addCert() {
	let cert = {};
	while (!cert.title || !cert.where || !cert.start || !cert.end) {
		cert.title = prompt("What's your new certificate?");
		cert.where = prompt("Where did you get it?");
		cert.start = prompt("When did the course start? eg.(Mar 2000)");
		cert.end = prompt("When did the course end? eg.(Mar 2000)");
		if (!cert.title || !cert.where || !cert.start || !cert.end) {
			again = confirm("Please fill out all fields.");
			if (!again) {
				return;
			}
		}
	}
	const section = document.getElementById("certs");
	const list = section.getElementsByClassName("list-for-addition")[1];
	const newTitle = document.createElement("dt");
	const newDescrip = document.createElement("dd");
	newTitle.textContent = cert.title;
	newDescrip.innerHTML = `Learned at: ${cert.where}<br> ${cert.start} - ${cert.end}`;
	if (list.childNodes.length > 1) list.append(document.createElement("hr"));
	list.append(newTitle);
	list.append(newDescrip);
}
