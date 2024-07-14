function setType(type, id) {
    const button = document.getElementById(id);
    button.disabled = false;
    //פונקציה שמעבירה אותנו לדף שבו ניצור את השאלות
    sessionStorage.setItem('whichTest', JSON.stringify(type));
    window.location.assign("questions.html");

}

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser != 'user') {
    for (let i = 0; i < currentUser.results.length; i++) {
        const element = currentUser.results[i];
        if (element === null) {
            const button = document.getElementById('id' + i);
            button.disabled = true;
        }
    }
}
else {
    for (let i = 0; i < 10; i++) {
        const button = document.getElementById('id' + i);
        button.disabled = true;
    }
}

function history(type, id) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    sessionStorage.setItem('whichTest', JSON.stringify(type));
    sessionStorage.setItem('result', JSON.stringify(currentUser.results[id]));
    window.location.assign('results.html');
}



const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));




