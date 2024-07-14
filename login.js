console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            signupBtn.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            loginBtn.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

const form = document.getElementById('signUp');
form.name.onkeypress = (event) => {
    const key = event.key;
    if (form.name.value.length < 1) {
        if ((key < 'א' || key > 'ת') && (key < 'a' || key > 'z') && (key < 'A' || key > 'Z')) {
            event.preventDefault();
        }
    }
    else {
        if (form.name.value[0] >= 'א' && form.name.value[0] <= 'ת') {
            if ((key < 'א' || key > 'ת') && !' -'.includes(key)) {
                event.preventDefault();
            }
        }
        if ((form.name.value[0] >= 'A' && form.name.value[0] <= 'Z') || (form.name.value[0] >= 'a' && form.name.value[0] <= 'z'))
            if (!' -'.includes(key) && (key < 'a' || key > 'z') && (key < 'A' || key > 'Z')) {
                event.preventDefault();
            }
    }
}
form.email.onkeypress = (event) => {
    const key = event.key;
    if ((key <= 'ת' && key >= 'א')) {
        event.preventDefault();
    }
}
const form2 = document.getElementById('logIn');
form2.email.onkeypress = (event) => {
    const key = event.key;
    if ((key <= 'ת' && key >= 'א')) {
        event.preventDefault();
    }
}
class user {
    email;
    password;
    name;
    results;

    constructor(email, password, name, results) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.results = results;
    }
}
const array = new Array(10);

const temp = localStorage.getItem('users');
if (temp === null) {
    localStorage.setItem('users', JSON.stringify([]));
}
let flag = false;
form.onsubmit = () => {
    event.preventDefault();
    currentUser = new user(form.email.value, form.password.value, form.name.value, array)
    const users = JSON.parse(localStorage.getItem('users'));
    users.forEach(element => {
        if (element.email === currentUser.email && element.password == currentUser.password) {
            const mainToast = document.getElementById('toast-container');
            const toast = new bootstrap.Toast(mainToast);
            mainToast.style.display = 'flex';
            mainToast.style.margin = 'auto';
            const toastBody = document.querySelector('.toast-body');
            toastBody.innerHTML = 'הסיסמא / שם המשתמש תפוסים - בחר סיסמא ושם משתמש חדשים';
            const left = screen.width / 2 - 336 / 2;
            mainToast.style.marginLeft = left + 'px';
            const top = screen.height / 2 - 100 / 2;
            mainToast.style.marginTop = top + 'px';
            toast.show();
            flag = true;
            return;
        }

    });
    if (!flag) {
        users.push(currentUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        h2 = document.getElementById('signup');
        h2.dir = 'rtl';
        h2.innerHTML = 'הצטרפת בהצלחה!';
        form.reset();
        form.classList.add('visually-hidden');
        h2.style.fontWeight = 'bold';
        h2.classList.add('fa-fade');
        h2.style.fontSize = "50px";
        const log = document.getElementById('login');
        log.classList.add('visually-hidden');
        const userNow = JSON.parse(localStorage.getItem('currentUser'))
        const icon = document.getElementById('user');

        icon.innerHTML = '<i class="fa-solid fa-circle-user loginIcon"></i>' + userNow.name;
    }

    flag = false;
    form.reset();


}

form2.onsubmit = () => {
    event.preventDefault();
    currentUser = new user(form2.email.value, form2.password.value, "user", array)
    users = JSON.parse(localStorage.getItem('users'));
    users.forEach(element => {
        if (element.email === currentUser.email && element.password == currentUser.password) {
            localStorage.setItem('currentUser', JSON.stringify(element));
            flag = true;
            h2 = document.getElementById('login');
            h2.dir = 'rtl';
            h2.innerHTML = 'תודה שחזרת אלינו!';
            form2.reset();
            form2.classList.add('visually-hidden'); form.classList.add('visually-hidden');
            h2.style.fontWeight = 'bold';
            h2.classList.add('fa-fade');
            h2.style.fontSize = "50px";
            const log = document.getElementById('signup');
            log.classList.add('visually-hidden');
            const userNow = JSON.parse(localStorage.getItem('currentUser'))
            const icon = document.getElementById('user');
            icon.innerHTML = '<i class="fa-solid fa-circle-user loginIcon"></i>' + userNow.name;
        }

    });
    if (!flag) {
        const mainToast = document.getElementById('toast-container');
        const toast = new bootstrap.Toast(mainToast);
        mainToast.style.display = 'flex';
        mainToast.style.margin = 'auto';
        const toastBody = document.querySelector('.toast-body');
        toastBody.innerHTML = 'אין משתמש כזה - בדוק את הנתונים שוב';
        const left = screen.width / 2 - 336 / 2;
        mainToast.style.marginLeft = left + 'px';
        const top = screen.height / 2 - 100 / 2;
        mainToast.style.marginTop = top + 'px';
        toast.show();
    }
    flag = false;
    form2.reset();
}