'use strict';
const scoreTexts = document.querySelectorAll('.score');
const currentScoreTexts = document.querySelectorAll('.current-score');
const dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const resetBtn = document.querySelector('.btn--new');
const player = document.querySelectorAll('.player');


function changeTurn() {
  for (let i = 0; i < player.length; i++) {
    player[i].classList.toggle('player--active');
  }
}

function changeDice(number) {
  dice.src = `dice-${number}.png`;
}

function resetCurrentScore() {
  let turn = findTurn();
  for (let i = 0; i < currentScoreTexts.length; i++) {
    if (currentScoreTexts[i].id === `current--${turn}`)
      currentScoreTexts[i].textContent = '0';
  }
}

function findTurn() {
  for (let i = 0; i < player.length; i++) {
    if (player[i].classList.contains('player--active')) {
      return player[i].classList.item(1).at(-1);
    }
  }
}

function addCurrentScore(number) {
  let turn = findTurn();
  let score = 0;
  for (let i = 0; i < currentScoreTexts.length; i++) {
    if (currentScoreTexts[i].id === `current--${turn}`) {
      currentScoreTexts[i].textContent = String(Number(currentScoreTexts[i].textContent) + Number(number));
      score = Number(currentScoreTexts[i].textContent);
    }
  }
  return score;
}

function addScore(number) {
  let turn = findTurn();
  for (let i = 0; i < scoreTexts.length; i++) {
    if (scoreTexts[i].id === `score--${turn}`)
      scoreTexts[i].textContent = String(Number(scoreTexts[i].textContent) + Number(number));
  }
}

function endGame() {
  let turn = findTurn();
  dice.classList.add('hidden');
  for (let i = 0; i < scoreTexts.length; i++) {
    if (scoreTexts[i].id === `score--${turn}` && scoreTexts[i].textContent >= 100)
      return turn;
  }
  return false;
}

function resetGame() {
  dice.classList.add('hidden');
  for (let i = 0; i < scoreTexts.length; i++)
    scoreTexts[i].textContent = 0;
  resetCurrentScore();
  for (let i = 0; i < player.length; i++) {
    player[i].classList.remove('player--winner');
    if (player[i].classList.item(1).at(-1) === '0') {
      player[i].classList.add('player--active');
    } else {
      player[i].classList.remove('player--active');
    }
  }
}

resetGame();

let score = 0;
rollDiceBtn.addEventListener('click', function() {
  if (endGame() === false) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    changeDice(randomNumber);
    if (randomNumber === 1) {
      resetCurrentScore();
      changeTurn();
      score = 0;
    } else {
      score = addCurrentScore(randomNumber);
    }
  }
});

holdBtn.addEventListener('click', function() {
  if (endGame() === false) {
    addScore(score);
    if (endGame() !== false) {
      for (let i = 0; i < player.length; i++) {
        if (player[i].classList.item(1)[player[i].classList.item(1).length - 1] === String(endGame())) {
          player[i].classList.add('player--winner');
        }
      }
    } else {
      resetCurrentScore();
      changeTurn();
      score = 0;
    }
  }
});


resetBtn.addEventListener('click', function() {
  resetGame();
  score = 0;
});