// Theme toggle functionality with localStorage persistence
function initTheme() {
    // Check localStorage for saved theme
    let savedTheme = localStorage.getItem('theme');
    let prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        updateThemeButton('dark');
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeButton('light');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeButton('light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeButton('dark');
    }
}

function updateThemeButton(theme) {
    const button = document.getElementById('themeToggle');
    if (button) {
        button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    const themeButton = document.getElementById('themeToggle');
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
    }
});