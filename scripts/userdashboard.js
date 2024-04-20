function addXp() {}
function addProject() {}
function addEdu() {}
function addLicense() {}
function addCert() {}
function addSkill() {}
function addInterest() {
	let newInterest = prompt("What's your new interest?");
	let year = prompt("When did it catch your eye?");
	const section = document.getElementById("interest-list");
	const newPara = document.createElement("p");
	newPara.textContent = newInterest + " " + year;
	section.insertBefore(newPara, section.lastElementChild);
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


