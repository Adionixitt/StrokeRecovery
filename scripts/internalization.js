document.addEventListener('DOMContentLoaded', ()=>{
    let html = document.querySelector("html");
    const translation = {
        "en":{
            "data-lang": "RU",
            "logo-title": "Recover from<br>stroke",
            "getStarted-page-title": "Recover from stroke",
            "get-started": "Get started",
            "app-description": "This application contains simple games and articles that might help you to recover after stroke.",
        },
        "ru":{
            "data-lang": "EN",
            "logo-title": "Восстановление после<br>инсульта",
            "getStarted-page-title": "Восстановление после инсульта",
            "get-started": "Приступить",
            "app-description": "Данная программа содержит простые игры и статьи, которые могут помочь вам в восстановлении после инсульта.",
        }
    }
    let internalizationBtn = document.querySelector('#internalization-toggle');
    function internalizeAllText(){
        let internalizableTexts = document.querySelectorAll('[data-internalization]');
        internalizableTexts.forEach(text => {
            text.innerHTML = translation[html.getAttribute('lang')][text.getAttribute('data-internalization')];
        });
    }

    internalizationBtn.addEventListener('click', ()=>{
        html.setAttribute('lang', (html.getAttribute('lang')=="en")?"ru":"en");
        internalizeAllText();
    });
    
});