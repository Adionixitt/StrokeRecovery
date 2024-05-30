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
        "about-popup-title": "About",
        "about-popup-text": "<p><b>Stroke recovery</b> was maded in 2024 by Nikita Novkiov to help people recover after stroke faster.</p><p>The app was builded by just HTML, CSS, JS and Electron framework.</p><p>By playing simple games patients will feel better and train skills such as emotions and colors recognition, and hand motor skills. Also this games train memory capacity.</p>",
        "menu-popup-title": "Menu page",
        "menu-popup-text": "<p>This page will help you to navigate through all of the games and articles that we have.</p><p>Just choose what you interested - games or article. Want to play games? - We made 6 just for you.</p>",
        "simon-game-page-title": "Recover from stroke | Simon game",
        "simon-popup-title": "Simon game",
        "simon-popup-text": "Simon is an electronic game of short-term memory skill.<br>The device has four colored buttons, each producing a particular tone when it is pressed or activated by the device. A round in the game consists of the device lighting up one or more buttons in a random order, after which the player must reproduce that order by pressing the buttons. As the game progresses, the number of buttons to be pressed increases.",
        "simon-start-btn": "Start",
        "simon-score-text": "Score",
        "simon-status-not-started": "Press Start to begin",
        "simon-status-taps-left": "Taps left",
        "simon-status-wait-for-computer": "Wait for the computer turn",
        "simon-status-fail": "Oops! It seems like you tapped the wrong tile. Try again.",
        "simon-status-congrats": "Congrats! You passed all levels!",
        "simon-status-right-tap": "Thats right, go on!",

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
        "about-popup-title": "О программе",
        "about-popup-text": "<p>Программа <b>Восстановление после инсульта</b> была создана в 2024 году Никитой Новиковым для помощи в скорейшем восстановлении людям, пережившим инсульт.</p><p>Программа создана с помощью языков HTML, CSS, JS и фреймворка Electron.</p><p>Благодаря простым играм пациенты будут чувствовать себя лучше и тренировать такие навыки как: определение цветов и эмоций на лицах, а также моторные навыки рук. Более того, данные игры помогают восстанавливаться памяти пациента.</p>",
        "menu-popup-title": "Навигация",
        "menu-popup-text": "<p>Данная страница поможет вам соориентироваться во всех играх и статьях что имеются.</p><p>Просто выбирайте - игры или статьи. Хотите потренироваться в играх? - Мы создали 6, специально для вас.</p>",
        "simon-game-page-title": 'Восстановление после инсульта | Игра "Саймон"',
        "simon-popup-title": 'Игра "Саймон"',
        "simon-popup-text": "Simon - это электронная игра на развитие кратковременной памяти.<br> Устройство имеет четыре цветные кнопки, каждая из которых издает определенный тон при нажатии или активации устройством. Раунд игры состоит в том, что устройство зажигает одну или несколько кнопок в случайном порядке, после чего игрок должен воспроизвести этот порядок, нажимая на кнопки. По мере прохождения игры количество кнопок, которые нужно нажать, увеличивается.",
        "simon-start-btn": "Начать",
        "simon-score-text": "Счёт",
        "simon-status-not-started": 'Нажмите "Старт" для начала',
        "simon-status-taps-left": "Осталось нажатий",
        "simon-status-wait-for-computer": "Дождитесь хода компьютера",
        "simon-status-fail": "Ой! Кажется вы нажали не на ту кнопку. Попробуйте снова.",
        "simon-status-congrats": "Поздравляем, вы прошли все уровни!",
        "simon-status-right-tap": "Верно, продолжайте!",
    }
};
let lang = localStorage.getItem('lang') || 'en' // Загрузка сохраненного языка из localStorage или установка значения по умолчанию 'en'

document.addEventListener('DOMContentLoaded', ()=>{
    let html = document.querySelector("html");

    let internalizationBtn = document.querySelector('#internalization-toggle');
    
    function internalizeAllText(){
        let internalizableTexts = document.querySelectorAll('[data-internalization]');
        internalizableTexts.forEach(text => {
            if(translation[lang][text.getAttribute('data-internalization')] == undefined) {
                console.error('No localization found for "'+text.getAttribute('data-internalization')+'". Object contains following text: '+text.innerHTML);
                text.innerHTML = "NOT FOUND";
            } else {
                text.innerHTML = translation[lang][text.getAttribute('data-internalization')];
            }
        });
    }

    internalizationBtn.addEventListener('click', ()=>{
        lang = (lang === "en") ? "ru" : "en";
        localStorage.setItem('lang', lang); // Сохранение выбранного языка в localStorage
        html.setAttribute('lang', lang);
        internalizeAllText();
    });

    internalizeAllText(); // Вызов функции для подгрузки текстов при загрузке скрипта
});

function getTranslation(translationID){
    if(!translation[lang][translationID]) throw new Error('Translation with this ID was not found:"'+translationID+'"');
    return translation[lang][translationID];
}

export default getTranslation;