document.addEventListener('DOMContentLoaded', ()=>{
    const html = document.querySelector("html");
    let darkTheme = localStorage.getItem('darkTheme') === 'true' // Загрузка сохраненной цветовой схемы из localStorage

    if (darkTheme) {
        html.classList.add('dark-theme');
    }
    
    let themeToggleBtn = document.querySelector('#theme-toggle');
    function changeBtnIcon(){
        themeToggleBtn.innerHTML = (html.classList.contains('dark-theme')?'<span class="material-symbols-outlined">dark_mode</span>':'<span class="material-symbols-outlined">light_mode</span>');
    }
    changeBtnIcon();
    
    function saveConfigToLocalStorage(){
        localStorage.setItem('darkTheme', darkTheme); // Сохранение выбранной цветовой схемы в localStorage
    }

    themeToggleBtn.addEventListener('click', ()=>{
        darkTheme = !darkTheme;
        saveConfigToLocalStorage();
        html.classList.toggle('dark-theme');
        changeBtnIcon();
    });
});
