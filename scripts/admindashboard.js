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