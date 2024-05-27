document.addEventListener('DOMContentLoaded', ()=>{
    const html = document.querySelector("html");
    let config = {
        lang: localStorage.getItem('lang') || 'en', // Загрузка сохраненного языка из localStorage или установка значения по умолчанию 'en'
        darkTheme: localStorage.getItem('darkTheme') === 'true' // Загрузка сохраненной цветовой схемы из localStorage
    };

    if (config.darkTheme) {
        html.classList.add('dark-theme');
    }
    
    let themeToggleBtn = document.querySelector('#theme-toggle');
    function changeBtnIcon(){
        themeToggleBtn.innerHTML = (html.classList.contains('dark-theme')?'<span class="material-symbols-outlined">dark_mode</span>':'<span class="material-symbols-outlined">light_mode</span>');
    }
    changeBtnIcon();
    
    function saveConfigToLocalStorage(){
        localStorage.setItem('lang', config.lang); // Сохранение выбранного языка в localStorage
        localStorage.setItem('darkTheme', config.darkTheme); // Сохранение выбранной цветовой схемы в localStorage
    }

    themeToggleBtn.addEventListener('click', ()=>{
        config.darkTheme = !config.darkTheme;
        saveConfigToLocalStorage();
        html.classList.toggle('dark-theme');
        changeBtnIcon();
    });

    // Функция для подгрузки текстов и настроек цветовой схемы при загрузке скрипта
    function applySavedSettings(){
        html.setAttribute('lang', config.lang);
        internalizeAllText(); // Подгрузка текстов на выбранном языке
    }

    function internalizeAllText(){
        let internalizableTexts = document.querySelectorAll('[data-internalization]');
        internalizableTexts.forEach(text => {
            text.innerHTML = translation[config.lang][text.getAttribute('data-internalization')];
        });
    }

    applySavedSettings(); // Применение настроек при загрузке скрипта
});
