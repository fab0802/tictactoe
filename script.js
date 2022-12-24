"use strict";

const cross = '<img src="./img/cross.png" />';
const circle = '<img src="./img/circle.png" />';
const playerCrossImg = document.querySelector("#player-cross-img");
const playerCircleImg = document.querySelector("#player-circle-img");
const playerCrossScore = document.querySelector("#score-player-cross");
const playerCircleScore = document.querySelector("#score-player-circle");
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
let scoreCross = 0;
let scoreCircle = 0;
let boxes = [];
let isCrossNext = true;
let twoPlayers = true;

function startNewGame() {
  scoreCross = 0;
  scoreCircle = 0;
  resetScore();
  resetBoard();
  setCrossAsNext();
}

function setBox(box) {
  if (boardBoxes[box].innerHTML === "")
    isCrossNext ? setCross(box) : setCircle(box);
  checkWinner(box);
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

function checkWinner(box) {
  console.log(box);
}

function resetBoard() {
  for (let box of boardBoxes) {
    box.innerHTML = "";
  }
}

function resetScore() {
  playerCrossScore.innerHTML = scoreCross;
  playerCircleScore.innerHTML = scoreCircle;
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
