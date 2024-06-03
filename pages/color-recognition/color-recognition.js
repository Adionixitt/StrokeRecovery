import getTranslation from "../../scripts/internalization.js";
import Popup from "../../scripts/popup.js";

let colors = {
    "Red": "#FF0000",
    "Crimson": "#DC143C",
    "Pink": "#FFC0CB",
    "HotPink": "#FF69B4",
    "DeepPink": "#FF1493",
    "OrangeRed": "#FF4500",
    "DarkOrange": "#FF8C00",
    "Coral": "#FF7F50",
    "Tomato": "#FF6347",
    "Gold": "#FFD700",
    "Yellow": "#FFFF00",
    "Khaki": "#F0E68C",
    "Lavender": "#E6E6FA",
    "Orchid": "#DA70D6",
    "Magenta":"#FF00FF",
    "Purple":"#800080",
    "Indigo":"#4B0082",
    "DarkSlateBlue":"#483D8B",
    "Lime":"#00FF00",
    "SpringGreen":"#00FF7F",
    "MediumSeaGreen":"#3CB371",
    "MediumAquamarine":"#66CDAA",
    "SteelBlue":"#4682B4",
    "DodgerBlue":"#1E90FF",
    "CornflowerBlue":"#6495ED",
    "Navy":"#000080",
};
let currentColorName;

document.addEventListener("DOMContentLoaded", function() {
    let colorBtnA = document.getElementById('colorA');
    let colorBtnB = document.getElementById('colorB');
    let colorNameText = document.querySelector('#rndColor');

    colorBtnA.addEventListener('click', ()=>{
        if(colorBtnA.getAttribute('data-color') == currentColorName){
            const popup = new Popup({
                title: getTranslation("color-recognition-popup-correct-title"),
                contents: getTranslation("color-recognition-popup-correct-text"),
                icon: "palette"
            });
            popup.Show();
        } else {
            const popup = new Popup({
                title: getTranslation("color-recognition-popup-incorrect-title"),
                contents: getTranslation("color-recognition-popup-incorrect-text"),
                icon: "palette"
            });
            popup.Show();
        }
        generateNewColor();
    });
    colorBtnB.addEventListener('click', ()=>{
        if(colorBtnB.getAttribute('data-color') == currentColorName){
            const popup = new Popup({
                title: getTranslation("color-recognition-popup-correct-title"),
                contents: getTranslation("color-recognition-popup-correct-text"),
                icon: "palette"
            });
            popup.Show();
        } else {
            const popup = new Popup({
                title: getTranslation("color-recognition-popup-incorrect-title"),
                contents: getTranslation("color-recognition-popup-incorrect-text"),
                icon: "palette"
            });
            popup.Show();
        }
        generateNewColor();
    });

    function generateNewColor(){
        let colorA = getRandomColor();
        let colorB = getRandomColor();
        while(colorA == colorB){
            colorB = getRandomColor();
        }
        colorBtnA.style.backgroundColor = colorA.code;
        colorBtnA.setAttribute('data-color', colorA.name);
        colorBtnB.style.backgroundColor = colorB.code;
        colorBtnB.setAttribute('data-color', colorB.name);
        currentColorName = Math.random()>0.5?colorA.name:colorB.name;
        colorNameText.innerHTML = currentColorName;
    }

    generateNewColor();

    function getRandomColor(){
        let color = {
            name: "",
            code: ""
        }
        color.name = Object.keys(colors)[Math.floor(Math.random()*Object.keys(colors).length)];
        color.code = colors[color.name];
        return color;
    }
});