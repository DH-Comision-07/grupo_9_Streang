
console.log("JS linkeado correctamente");
const menuBtn = document.getElementById('menu-button');
const nav = document.querySelector('.nav-bar');

menuBtn.addEventListener('click', (event) => {
    nav.classList.toggle('show');
});

