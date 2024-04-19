function confirmDelete() {
	var result = confirm("Are you sure you want to delete this job?");
	if (result) {
		document.removeChild(this.parentElement);
		alert("Job deleted!");
	}
}
