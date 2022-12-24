"use strict";

const cross = '<img src="./img/cross.png" />';
const circle = '<img src="./img/circle.png" />';
const playerCrossImg = document.querySelector("#player-cross-img");
const playerCircleImg = document.querySelector("#player-circle-img");
const playerCrossScoreContainer = document.querySelector("#score-player-cross");
const playerCircleScoreContainer = document.querySelector(
  "#score-player-circle"
);
const boardBoxes = document.querySelectorAll(".game-board-box");
const btnNewGame = document.querySelector("#btn-new-game");
const btnSetOnePlayer = document.querySelector("#btn-one-player");
const btnSetTwoPlayers = document.querySelector("#btn-two-players");
const winningRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let boxes = [];
let scoreCross = 0;
let scoreCircle = 0;
let isCrossNext = true;
let twoPlayers = true;
let round = 1;
let gameIsRunning = true;

function setBox(box) {
  if (boardBoxes[box].innerHTML === "" && gameIsRunning) {
    isCrossNext ? setCross(box) : setCircle(box);
    checkForWin();
    checkForDraw();
  }
}

function setCross(box) {
  document.querySelector(`#game-board-box-${box}`).innerHTML = cross;
  setCircleAsNext();
  boxes[box] = "cross";
}

function setCircle(box) {
  document.querySelector(`#game-board-box-${box}`).innerHTML = circle;
  setCrossAsNext();
  boxes[box] = "circle";
}

function setCrossAsNext() {
  isCrossNext = true;
  playerCircleImg.classList.remove("next");
  playerCrossImg.classList.add("next");
}

function setCircleAsNext() {
  isCrossNext = false;
  playerCrossImg.classList.remove("next");
  playerCircleImg.classList.add("next");
}

function checkForWin() {
  for (let i = 0; i < winningRows.length; i++) {
    const [a, b, c] = winningRows[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      console.log(`we have a winner: ${boxes[a]}`);
      gameIsRunning = false;
      boxes[a] === "cross" ? scoreCross++ : scoreCircle++;
      gameOver();
    }
  }
}

function checkForDraw() {
  let crossCounter = boxes.filter((element) => element === "cross").length;
  let circleCounter = boxes.filter((element) => element === "circle").length;
  if (crossCounter > 4 || circleCounter > 4) {
    console.log("we have a draw");
    gameOver();
  }
}

function gameOver() {
  round++;
  round % 2 === 0 ? setCircleAsNext() : setCrossAsNext();
  setTimeout(() => {
    renderScore();
    resetBoard();
  }, 2000);
}

function resetBoard() {
  for (let box of boardBoxes) {
    box.innerHTML = "";
  }
  boxes = [];
  gameIsRunning = true;
  renderScore();
}

function renderScore() {
  playerCrossScoreContainer.innerHTML = scoreCross;
  playerCircleScoreContainer.innerHTML = scoreCircle;
}

function resetScore() {
  scoreCross = 0;
  scoreCircle = 0;
  renderScore();
}

function startNewGame() {
  resetScore();
  renderScore();
  resetBoard();
  setCrossAsNext();
}

function setOnePlayer() {
  if (twoPlayers) {
    console.log("setOnePlayer");
    twoPlayers = false;
    btnSetOnePlayer.classList.add("selected");
    btnSetTwoPlayers.classList.remove("selected");
    resetBoard();
    resetScore();
  }
}

function setTwoPlayers() {
  if (!twoPlayers) {
    console.log("setTwoPlayer");
    twoPlayers = true;
    btnSetTwoPlayers.classList.add("selected");
    btnSetOnePlayer.classList.remove("selected");
    resetBoard();
    resetScore();
  }
}
