function addXp() {
	let newXp = {};
	while (!newXp.company || !newXp.title || !newXp.start || !newXp.end) {
		newXp.company = prompt("Where did you work?");
		newXp.title = prompt("What was your job title?");
		newXp.start = prompt("When did you start? (e.g. Mar 2000)");
		newXp.end = prompt("When did you leave? (e.g. Mar 2000)");
		if (!newXp.company || !newXp.title || !newXp.start || !newXp.end) {
			again = confirm("Please fill out all fields.");
			if (!again) {
				return;
			}
		}
	}
	const section = document.getElementById("experience");
	const list = section.getElementsByClassName("list-for-addition")[0];
	const newTitle = document.createElement("dt");
	const newDescrip = document.createElement("dd");
	newTitle.textContent = newXp.title;
	newDescrip.innerHTML = `At ${newXp.company}<br> ${newXp.start} - ${newXp.end}`;
	if (list.childNodes.length > 3) list.append(document.createElement("hr"));
	list.append(newTitle);
	list.append(newDescrip);
}
function addProject() {
	let newProj = {};
	while (!newProj.title || !newProj.purpose || !newProj.date) {
		newProj.title = prompt("What was your project?");
		newProj.purpose = prompt("What did you make it for?");
		newProj.date = prompt("When did you start? (e.g. 14 Mar 2000)");
		if (!newProj.title || !newProj.purpose || !newProj.date) {
			again = confirm("Please fill out all fields.");
			if (!again) {
				return;
			}
		}
	}
	const section = document.getElementById("experience");
	const list = section.getElementsByClassName("list-for-addition")[1];
	const newTitle = document.createElement("dt");
	const newDescrip = document.createElement("dd");
	newTitle.textContent = newProj.title;
	newDescrip.innerHTML = `For ${newProj.purpose}<br>Finalized on: ${newProj.date}`;
	if (list.childNodes.length > 3) list.append(document.createElement("hr"));
	list.append(newTitle);
	list.append(newDescrip);
}
educationTypes = [
	"High School Diploma",
	"Bachelor's Degree",
	"Master's Degree",
	"PhD",
];
function addEdu() {
	let newEdu = {};
	do {
		choice =
			parseInt(
				prompt(
					"What's your new education level?\n1-High School\n2-Bachelor's\n3-Master's\n4-PhD"
				)
			) - 1;
		if (isNaN(choice) || choice < 0 || choice >= educationTypes.length)
			alert("Please enter a number between 1 and " + educationTypes.length);
	} while (isNaN(choice) || choice < 0 || choice >= educationTypes.length);
	if (choice === 0) {
		while (!newEdu.type || !newEdu.institute || !newEdu.start || !newEdu.end) {
			newEdu.type = educationTypes[choice];
			newEdu.institute = prompt("Where did you study?");
			newEdu.start = prompt("Start date: (e.g. Mar 2000)");
			newEdu.end = prompt("End date: (e.g. Mar 2000)");
			if (!newEdu.type || !newEdu.institute || !newEdu.start || !newEdu.end) {
				again = confirm("Please fill out all fields.");
				if (!again) {
					return;
				}
			}
		}
		const section = document.getElementById("edu");
		const list = section.getElementsByClassName("list-for-addition")[0];
		const newTitle = document.createElement("dt");
		const newDescrip = document.createElement("dd");
		newTitle.textContent = newEdu.institute;
		newDescrip.innerHTML = `${newEdu.type}<br> ${newEdu.start} - ${newEdu.end}`;
		if (list.childNodes.length > 0) list.append(document.createElement("hr"));
		list.append(newTitle);
		list.append(newDescrip);
	} else {
		while (
			!newEdu.type ||
			!newEdu.institute ||
			!newEdu.field ||
			!newEdu.start ||
			!newEdu.end
		) {
			newEdu.type = educationTypes[choice];
			newEdu.institute = prompt("Where did you study?");
			newEdu.field = prompt("What did you study?");
			newEdu.start = prompt("Start date: (e.g. Mar 2000)");
			newEdu.end = prompt("End date: (e.g. Mar 2000)");
			if (!newEdu.type || !newEdu.institute || !newEdu.start || !newEdu.end) {
				again = confirm("Please fill out all fields.");
				if (!again) {
					return;
				}
			}
		}
		const section = document.getElementById("edu");
		const list = section.getElementsByClassName("list-for-addition")[0];
		const newTitle = document.createElement("dt");
		const newDescrip = document.createElement("dd");
		newTitle.textContent = newEdu.institute;
		newDescrip.innerHTML = `${newEdu.type}, ${newEdu.field}<br> ${newEdu.start} - ${newEdu.end}`;
		if (list.childNodes.length > 1) list.append(document.createElement("hr"));
		list.append(newTitle);
		list.append(newDescrip);
	}
}
function addLicense() {
	let lic = {};
	while (!lic.title || !lic.where || !lic.when) {
		lic.title = prompt("What's your new license?");
		lic.where = prompt("Where did you get it?");
		lic.when = prompt("When did you get it? eg.(Mar 2000)");
		if (!lic.title || !lic.where || !lic.when) {
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
	newTitle.textContent = lic.title;
	newDescrip.innerHTML = `Acquired at: ${lic.where}<br>In: ${lic.when}`;
	if (list.childNodes.length > 3) list.append(document.createElement("hr"));
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
	if (list.childNodes.length > 3) list.append(document.createElement("hr"));
	list.append(newTitle);
	list.append(newDescrip);
}
function addSkill() {
	let skill = {};
	while (!skill.name || !skill.howAcquired || !skill.level) {
		skill.name = prompt("What's your new skill?");
		skill.howAcquired = prompt("Where did you learn it?");
		skill.level = parseInt(prompt("How good are you at it? (1 to 5)"));
		while (!Number.isInteger(skill.level)) {
			alert("Please give a correct rating.");
			skill.level = parseInt(prompt("How good are you at it? (1 to 5)"));
		}
		if (!skill.name || !skill.howAcquired || !skill.level) {
			again = confirm("Please fill out all fields.");
			if (!again) {
				return;
			}
		}
	}
	const section = document.getElementById("skill");
	const list = section.getElementsByClassName("list-for-addition")[0];
	const newTitle = document.createElement("dt");
	const newDescrip = document.createElement("dd");
	newTitle.textContent = skill.name;
	newDescrip.innerHTML = `Learned at: ${skill.howAcquired}<br>Level: ${skill.level}/5⭐`;
	if (list.childNodes.length > 0) list.append(document.createElement("hr"));
	list.append(newTitle);
	list.append(newDescrip);
	skillList = section.getElementsByTagName("dt");
	theAside = document.getElementById("top-skills");
	theAside.innerHTML = "<strong>Top Skills</strong>";
	for (let i = 0; i < Math.min(3, skillList.length); i++) {
		const newTopSkill = document.createElement("p");
		newTopSkill.innerHTML = `&bull;&emsp;${skillList[i].innerHTML}`;
		theAside.append(newTopSkill);
	}
}
function addInterest() {
	let interest = {};
	while (!interest.title || !interest.year) {
		interest.title = prompt("What's your new interest?");
		do {
			interest.year = parseInt(prompt("When did it catch your eye?"));
			if (!Number.isInteger(interest.year)) {
				again = confirm("Please enter a correct year number.");
				if (!again) return;
			}
		} while (!interest.title || !interest.year);
		if (!interest.title || !interest.year) alert("Please fill out all fields.");
	}
	const section = document.getElementById("interest");
	const list = section.getElementsByClassName("list-for-addition")[0];
	const newPara = document.createElement("li");
	newPara.innerHTML = `${interest.title}, since: ${interest.year}`;
	list.append(newPara);
}
