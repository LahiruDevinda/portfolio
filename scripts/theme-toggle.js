const themeToggle = document.querySelector('.js-theme-toggle');
const themeImage = document.querySelector('.theme-image');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === 'dark') {
        themeImage.src = 'images/icons/sun.svg';
        themeImage.alt = 'Switch to light mode';
    } else {
        themeImage.src = 'images/icons/moon.svg';
        themeImage.alt = 'Switch to dark mode';
    }
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});