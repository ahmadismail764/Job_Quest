document.addEventListener("DOMContentLoaded", function () {
  checkAuthentication();
  document.getElementById("user-name").textContent = JSON.parse(
    sessionStorage.getItem("currentUser")
  ).username;

  if (checkAdmin()) {
    console.log("User");
    document.querySelector(".dashboard-link").href = "admindashboard.html";
    document.querySelector(".browse-post").href = "jobpost.html";
    document.querySelector(".browse-post").innerHTML = "Post Job";
  } else {
    document.querySelector(".dashboard-link").href = "userdashboard.html";
    document.querySelector(".browse-post").href = "joblisting.html";
    document.querySelector(".browse-post").innerHTML = "Browse Jobs";
  }
  const postedJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
  displayPostedJobs(postedJobs);
});

function displayPostedJobs(postedJobs) {
  const jobholder = document.getElementById("jobholder");
  jobholder.innerHTML = "";
  postedJobs.forEach(function (job, index) {
    const jobSection = document.createElement("section");
    jobSection.classList.add("job");

    const title = document.createElement("h3");
    title.textContent = job.title;
    title.style.marginBottom = "0";
    title.style.marginTop = "0.5rem";

    const company = document.createElement("p");
    company.innerHTML = `Company: ${job.company}<br>Location: ${job.location}<br>Years of Experience: ${job.experience}`;
    company.style.margin = "0.5rem";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
      editJob(index);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.index = index;
    deleteButton.addEventListener("click", function () {
      deleteJob(index);
    });
    jobSection.appendChild(title);
    jobSection.appendChild(company);
    jobSection.appendChild(editButton);
    jobSection.appendChild(deleteButton);
    jobholder.appendChild(jobSection);
    if (index < postedJobs.length - 1) {
      const hr = document.createElement("hr");
      jobholder.appendChild(hr);
    }
  });
}
function editJob(index) {
  const postedJobs = JSON.parse(localStorage.getItem("postedJobs")) || [];
  const job = postedJobs[index];

  const jobSection = document.querySelector(
    "#jobholder .job:nth-child(" + (index + 1) + ")"
  );
  jobSection.innerHTML = "";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = job.title;
  titleInput.classList.add("job-input");
  titleInput.classList.add("job-margin");

  const companyInput = document.createElement("input");
  companyInput.type = "text";
  companyInput.value = job.company;
  companyInput.classList.add("job-input");
  companyInput.classList.add("job-margin");

  const locationInput = document.createElement("input");
  locationInput.type = "text";
  locationInput.value = job.location;
  locationInput.classList.add("job-input");
  locationInput.classList.add("job-margin");

  const experienceInput = document.createElement("input");
  experienceInput.type = "number";
  experienceInput.value = job.experience;
  experienceInput.classList.add("job-input");
  experienceInput.classList.add("job-margin");

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.classList.add("job-button");
  saveButton.classList.add("job-margin");
  saveButton.addEventListener("click", function () {
    job.title = titleInput.value;
    job.company = companyInput.value;
    job.location = locationInput.value;
    job.experience = experienceInput.value;
    localStorage.setItem("allJobs", JSON.stringify(postedJobs));
    displayPostedJobs(postedJobs);
  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add("job-button");
  cancelButton.classList.add("job-margin");
  cancelButton.addEventListener("click", function () {
    displayPostedJobs(postedJobs);
  });

  jobSection.appendChild(titleInput);
  jobSection.appendChild(companyInput);
  jobSection.appendChild(locationInput);
  jobSection.appendChild(experienceInput);
  jobSection.appendChild(document.createElement("br"));
  jobSection.appendChild(saveButton);
  jobSection.appendChild(cancelButton);
}

function deleteJob(index) {
  const postedJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
  postedJobs.splice(index, 1);
  localStorage.setItem("allJobs", JSON.stringify(postedJobs));
  window.location.reload();
}
function redirectTo(pageUrl) {
  window.location.href = pageUrl;
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

var originalAboutText = "";
function editAbout() {
  var aboutSection = document.querySelector("#about-comp .about");
  var aboutText = aboutSection.querySelector("p").textContent;
  originalAboutText = aboutText;
  var textarea = document.createElement("textarea");
  textarea.value = aboutText;
  textarea.style.width = "100%";
  textarea.style.height = "100%";

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

  var buttonContainer = document.getElementById("button-container1");
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
  var buttonContainer = document.getElementById("button-container1");
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
  var buttonContainer = document.getElementById("button-container1");
  buttonContainer.innerHTML = "";
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
function checkAdmin() {
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return currentUser.userType === "admin";
}
