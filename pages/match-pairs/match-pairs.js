import getTranslation from "../../scripts/internalization.js";
import Popup from "../../scripts/popup.js";

const allEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', // Смайлики
    '❤️', '💔', '💘', '💖', '💗', '💞', // Сердечки
    '👍', '👎', '👏', '🙌', '👐', '👌', // Жесты
    '🌸', '🌼', '🌻', '🌺', '🌹', '💐', // Цветы
    // Дополнительные эмодзи
    '🎉', '🎈', '🎁', '🎊', '🎆', '🎇', // Праздники
    '🍔', '🍕', '🌭', '🍟', '🍦', '🍩', // Еда
    '🎮', '🕹️', '🎳', '🏓', '⚽', '🏀', // Виды спорта
    '🎭', '🎨', '🎬', '🎤', '🎼', '🎸', // Искусство
    '📚', '🖋️', '📝', '📖', '📕', '📗', // Образование
    //
    '💐','🍏','🦾','🍌','🍅','🧀', '🍫', '🥕', '🍿', '🍓', '✨', '🧩', '🎲', '🧶', '🌈'
];
let emojis = [];
const deckSize = 4;
const deckCardCount = deckSize*deckSize;
const deckCardPairsCount = deckCardCount/2;
let firstCard = undefined;
let secondCard = undefined;
fillEmojisArray(deckCardPairsCount);
let cards = [generateCardsArray(deckCardPairsCount)];

document.addEventListener('DOMContentLoaded', function() {
    const deck = document.querySelector('#deck');
    const resetButton = document.querySelector('#restart-btn');
    resetButton.addEventListener('click', ()=>{
        Restart();
    });
    Restart();
});


function fillEmojisArray(numberOfUniqueEmojis) {
    let allEmojisCopy = allEmojis.slice();
    let uniqueEmojisList = [];
    for (let i = 0; i < numberOfUniqueEmojis; i++) {
        const randomIndex = Math.floor(Math.random() * allEmojisCopy.length); // Генерируем случайный индекс
        const emoji = allEmojisCopy.splice(randomIndex, 1)[0]; // Удаляем выбранный эмодзи из копии массива и добавляем в результат
        uniqueEmojisList.push(emoji);
    }
    emojis = uniqueEmojisList;
    console.log(emojis);
}

function generateCard(cardInner){
    let card = document.createElement('div');
        card.classList.add('card');
    let cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = cardInner;
    let cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = '?';
    card.append(cardFront);
    card.append(cardBack);
    return card;
}

function generateCardsArray(pairsCount){
    let cardsArray = [];
    for(let i = 0; i<pairsCount; i++){
        cardsArray.push(generateCard(emojis[i]));
        cardsArray.push(generateCard(emojis[i]));
    }
    let cardsArrayCopy = cardsArray.slice();
    let shuffledCards = [];
    for (let i = 0; i < cardsArray.length; i++) {
        const randomIndex = Math.floor(Math.random() * cardsArrayCopy.length); // Генерируем случайный индекс
        const card = cardsArrayCopy.splice(randomIndex, 1)[0]; // Удаляем выбранный эмодзи из копии массива и добавляем в результат
        shuffledCards.push(card);
    }
    return shuffledCards;
}

function isMatch(){
    return firstCard.querySelector('.card-front').innerHTML == secondCard.querySelector('.card-front').innerHTML;
}

function checkForWin(){
    console.log(document.querySelectorAll('.card.matched').length+" "+document.querySelectorAll('.card').length);
    if(document.querySelectorAll('.card.matched').length == document.querySelectorAll('.card').length) {
        const popup = new Popup({
            title: getTranslation("match-win-popup-title"),
            contents: getTranslation("match-win-popup-text"),
            icon: "trophy"
        });
        popup.Show();
    }
}

function fillDeck(){
    cards.forEach(card => {
        card.addEventListener('click', ()=> {
            if(firstCard == undefined){
                // the first selected card
                card.classList.toggle('flipped');
                firstCard = card;
            } else if(firstCard == card) {
                // the same card selected
                card.classList.remove('flipped');
                firstCard = undefined;
            } else {
                // the second card selected
                card.classList.add('flipped');
                secondCard = card;
                if(isMatch()){
                    deck.classList.add('disabled');
                    setTimeout(()=>{
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        checkForWin();
                        firstCard = undefined; secondCard = undefined;
                        deck.classList.remove('disabled');
                    });
                } else {
                    deck.classList.add('disabled');
                    setTimeout(()=>{
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        firstCard = undefined;
                        secondCard = undefined;
                        deck.classList.remove('disabled');
                    }, 1000);
                }
            }
        });
        deck.append(card);
    });
}

function Restart(){
    emojis = [];
    deck.innerHTML = '';
    firstCard = undefined;
    secondCard = undefined;
    fillEmojisArray(deckCardPairsCount);
    cards = generateCardsArray(deckCardPairsCount);
    fillDeck();
}