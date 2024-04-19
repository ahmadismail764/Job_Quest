document.addEventListener("DOMContentLoaded", function () {
  displayData();
});

function displayData() {
  const dataList = document.getElementById("dataList");
  const posts = JSON.parse(localStorage.getItem("postedJobs")) || [];
  const keyword = localStorage.getItem("keyword").toLowerCase() || "";

  if (posts.length == 0) {
    dataList.innerHTML = "<li>No jobs found</li>";
    return;
  }

  dataList.innerHTML = "";

  const search = posts.filter(function (post) {
    return !post.title.toLowerCase().search(keyword) || !post.description.toLowerCase().search(keyword);
  });

  if (search.length == 0) {
    dataList.innerHTML = "<li>No results found</li>";
    return;
  }

  search.forEach(function (post, index) {

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
