// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme switcher button
    const navbar = document.querySelector('.navbar-right');
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '🌙';
    themeButton.className = 'theme-switcher';
    themeButton.style.cssText = `
        background: none;
        border: none;
        font-size: 1.2em;
        cursor: pointer;
        padding: 0.5em;
        margin-left: 1em;
    `;
    navbar.appendChild(themeButton);

    // Theme switching logic
    let isDark = true;
    const darkTheme = 'darkly';
    const lightTheme = 'cosmo';

    function switchTheme() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === darkTheme ? lightTheme : darkTheme;
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        themeButton.innerHTML = newTheme === darkTheme ? '🌙' : '☀️';
        isDark = !isDark;
    }

    themeButton.addEventListener('click', switchTheme);
}); 