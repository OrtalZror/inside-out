const userNow = JSON.parse(localStorage.getItem('currentUser'))
const icon = document.getElementById('user');
if (userNow === 'user') {
  icon.innerHTML = '<i class="fa-solid fa-circle-user loginIcon"></i>' + 'user';
}
else {
  icon.innerHTML = '<i class="fa-solid fa-circle-user loginIcon"></i>' + userNow.name;
}