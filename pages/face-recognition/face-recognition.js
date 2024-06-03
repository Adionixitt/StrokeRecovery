import getTranslation from "../../scripts/internalization.js";
import Popup from "../../scripts/popup.js";

let emotions = {
    "happy": 8,
    "angry": 3,
    "sad": 5,
    "shocked": 3
};

document.addEventListener("DOMContentLoaded", function() {
    let faceImg = document.querySelector('#face-wrapper img');
    
    let randomEmotionIndex;
    let randomEmotion;
    let randomEmotionID;
    
    function createNewQuiz(){
        randomEmotionIndex = Math.floor(Math.random() * Object.keys(emotions).length);
        randomEmotion = Object.keys(emotions)[randomEmotionIndex];
        randomEmotionID = Math.floor(Math.random() * emotions[randomEmotion]);

        faceImg.src = `./src/${randomEmotion}${randomEmotionID}.jpeg`;
    }
    createNewQuiz();

    document.querySelectorAll('.quiz-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            quizClick(btn.getAttribute('data-emotion'));
        });
    });


    function quizClick(answer){
        if(answer === randomEmotion){
            const popup = new Popup({
                title: getTranslation("face-recognition-popup-correct-title"),
                contents: getTranslation("face-recognition-popup-correct-text")+getTranslation("face-recognition-emotion-"+randomEmotion),
                icon: "ar_on_you"
            });
            popup.Show();
        } else {
            const popup = new Popup({
                title: getTranslation("face-recognition-popup-incorrect-title"),
                contents: getTranslation("face-recognition-popup-incorrect-text")+getTranslation("face-recognition-emotion-"+randomEmotion),
                icon: "ar_on_you"
            });
            popup.Show();
        }
        createNewQuiz();
    }
});
