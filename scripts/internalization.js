document.addEventListener('DOMContentLoaded', ()=>{
    let html = document.querySelector("html");
    let config = {
        lang: localStorage.getItem('lang') || 'en' // Загрузка сохраненного языка из localStorage или установка значения по умолчанию 'en'
    };

    const translation = {
        "en":{
            "logo-title": "Recover<br>after stroke",
            "getStarted-page-title": "Recover after stroke",
            "navigation-page-title": "Recover after stroke | Menu",
            "get-started": "Get started",
            "app-description": "This application contains simple games and articles that might help you to recover after stroke.",
        },
        "ru":{
            "logo-title": "Восстановление<br>после инсульта",
            "getStarted-page-title": "Восстановление после инсульта",
            "navigation-page-title": "Восстановление после инсульта | Меню",
            "get-started": "Приступить",
            "app-description": "Данная программа содержит простые игры и статьи, которые могут помочь вам в восстановлении после инсульта.",
        }
    };

    let internalizationBtn = document.querySelector('#internalization-toggle');
    
    function internalizeAllText(){
        let internalizableTexts = document.querySelectorAll('[data-internalization]');
        internalizableTexts.forEach(text => {
            text.innerHTML = translation[config.lang][text.getAttribute('data-internalization')];
        });
    }

    internalizationBtn.addEventListener('click', ()=>{
        config.lang = (config.lang === "en") ? "ru" : "en";
        localStorage.setItem('lang', config.lang); // Сохранение выбранного языка в localStorage
        html.setAttribute('lang', config.lang);
        internalizeAllText();
    });

    internalizeAllText(); // Вызов функции для подгрузки текстов при загрузке скрипта
});
