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
            "games-heading": "Games",
            "simon-game": "Simon",
            "match-pairs-game": "Match pairs",
            "jigsaw-puzzle-game": "Jigsaw puzzle",
            "catch-an-object-game": "Catch an object",
            "color-recognition-game": "Color recognition",
            "emotion-recognition-game": "Emotion recognition",
        },
        "ru":{
            "logo-title": "Восстановление<br>после инсульта",
            "getStarted-page-title": "Восстановление после инсульта",
            "navigation-page-title": "Восстановление после инсульта | Меню",
            "get-started": "Приступить",
            "app-description": "Данная программа содержит простые игры и статьи, которые могут помочь вам в восстановлении после инсульта.",
            "games-heading": "Игры",
            "simon-game": "Саймон",
            "match-pairs-game": "Поиск пар",
            "jigsaw-puzzle-game": "Пазлы",
            "catch-an-object-game": "Поймай объект",
            "color-recognition-game": "Определение цветов",
            "emotion-recognition-game": "Опредление эмоций",
        }
    };

    let internalizationBtn = document.querySelector('#internalization-toggle');
    
    function internalizeAllText(){
        let internalizableTexts = document.querySelectorAll('[data-internalization]');
        internalizableTexts.forEach(text => {
            if(translation[config.lang][text.getAttribute('data-internalization')] == undefined) {
                console.error('No localization found for "'+text.getAttribute('data-internalization')+'". Object contains following text: '+text.innerHTML);
                text.innerHTML = "NOT FOUND";
            } else {
                text.innerHTML = translation[config.lang][text.getAttribute('data-internalization')];
            }
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
