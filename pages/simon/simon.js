import getTranslation from '../../scripts/internalization.js';
import Popup from "../../scripts/popup.js";

// Задаём все переменные
let startBtn = document.querySelector('#btn-start');
let stopBtn = document.querySelector('#btn-stop');
let statusText = document.querySelector('#status-text');
const tileContainer = document.querySelector('#simon-deck');

let score = 0;
let level = 0;
let computerSequence = [];
let userSequence = [];

document.addEventListener('DOMContentLoaded', ()=>{
    statusText.innerHTML = getTranslation("simon-status-not-started");
    startBtn.addEventListener('click', ()=>{
        startBtn.setAttribute("disabled", true);
        startGame();
    })
});

function resetGame(text) {
  statusText.innerHTML = text;
  computerSequence = [];
  userSequence = [];
  level = 0;
  startBtn.removeAttribute('disabled');
  tileContainer.classList.add('unclickable');
}

function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  statusText.innerHTML = getTranslation("simon-status-taps-left")+`: ${level}`;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);
  sound.play();
  tile.classList.add('activated');

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ['red', 'green', 'yellow', 'blue'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclickable');
  statusText.textContent = getTranslation("simon-status-wait-for-computer");


  const nextSequence = [...computerSequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  computerSequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function handleClick(tile) {
  const index = userSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = computerSequence.length - userSequence.length;

  if (userSequence[index] !== computerSequence[index]) {
    resetGame(getTranslation("simon-status-fail"));
    return;
  }

  if (userSequence.length === computerSequence.length) {
    if (userSequence.length === 20) {
      resetGame(getTranslation("simon-status-congrats"));
      return
    }

    userSequence = [];
    statusText.innerHTML = getTranslation("simon-status-right-tap");
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  statusText.innerHTML = getTranslation("simon-status-taps-left")+`: ${remainingTaps}`;
}

function startGame() {
  statusText.innerHTML = getTranslation("simon-status-wait-for-computer");
  nextRound();
}

tileContainer.addEventListener('click', event => {
  const {
    tile
  } = event.target.dataset;

  if (tile) handleClick(tile);
});