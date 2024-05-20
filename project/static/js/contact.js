document.addEventListener("DOMContentLoaded", function () {
  checkAuthentication();
  document.getElementById("user-name").textContent = JSON.parse(
    sessionStorage.getItem("currentUser")
  ).username;
  if (checkAdmin()) {
    document.querySelector(".dashboard-link").href = "admindashboard.html";
    document.querySelector(".browse-post").href = "jobpost.html";
    document.querySelector(".browse-post").innerHTML = "Post Job";
  } else {
    document.querySelector(".dashboard-link").href = "userdashboard.html";
    document.querySelector(".browse-post").href = "joblisting.html";
    document.querySelector(".browse-post").innerHTML = "Browse Jobs";
  }
});

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

function checkAdmin() {
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (currentUser.userType == "admin") {
    return true;
  } else {
    return false;
  }
}
