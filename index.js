if (!JSON.parse(sessionStorage.getItem('firstTime'))) {
  sessionStorage.setItem('firstTime', true);
  const mainToast = document.getElementById('toast-container');
  const toast = new bootstrap.Toast(mainToast);
  // const modal1 = document.getElementById('staticBackdrop');

  localStorage.setItem('currentUser', JSON.stringify('user'));
  setTimeout(() => {

    mainToast.style.display = 'flex';
    mainToast.style.margin = 'auto';
    const left = screen.width / 2 - 336 / 2;
    mainToast.style.marginLeft = left + 'px';
    const top = 50;
    mainToast.style.marginTop = top + 'px';
    toast.show();
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }, 500);
}
if (!JSON.parse(localStorage.getItem('users'))) {
  localStorage.setItem('users', JSON.stringify([]));
}
function auto() {
  const body = document.querySelector('body');
  body.style.overflow = 'auto';
}



