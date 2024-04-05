'use strict';

// Selecting elements
const score0Elt = document.querySelector('#score--0');
const score1Elt = document.querySelector('#score--1');

const player0Elt = document.querySelector('.player--0');
const player1Elt = document.querySelector('.player--1');

const current0Elt = document.querySelector('#current--0');
const current1Elt = document.querySelector('#current--1');

const diceElt = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0Elt.textContent = score1Elt.textContent = 0;
diceElt.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];

let playing = true;

const switchPlayer = function () {
  player0Elt.classList.toggle('player--active');
  player1Elt.classList.toggle('player--active');

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  // 1. Generating a random dice roll
  const randomNumber = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceElt.src = `dice-${randomNumber}.png`;
  diceElt.classList.remove('hidden');

  // 3. Check for rolled 1: if true, switch to next player
  if (randomNumber !== 1) {
    // add dice to current score
    currentScore += randomNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switch to next player
    switchPlayer();
  }
});

// Hold
btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] < 100) switchPlayer();
  else {
    playing = false;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    diceElt.classList.add('hidden');
  }
});

// New game
btnNew.addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores[0] = scores[1] = 0;

  diceElt.classList.add('hidden');

  player0Elt.classList.add('player--active');
  player1Elt.classList.remove('player--active');
  player0Elt.classList.remove('player--winner');
  player1Elt.classList.remove('player--winner');

  current0Elt.textContent =
    current1Elt.textContent =
    score0Elt.textContent =
    score1Elt.textContent =
      0;
});
