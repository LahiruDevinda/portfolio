const menuToggle = document.querySelector('.js-menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
menu.classList.toggle('active');
});

window.addEventListener('resize', () => {
if (window.innerWidth > 768) {
    menu.classList.remove('active');
}
});