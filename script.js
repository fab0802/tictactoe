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
  if (!twoPlayers && !isCrossNext) return;
  if (boardBoxes[box].innerHTML === "" && gameIsRunning)
    isCrossNext ? setCross(box) : setCircle(box);
  if (checkGameOver()) gameOver();
  checkIfComputerIsNext();
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

function checkGameOver() {
  if (checkForWin()) return true;
  if (checkForDraw()) return true;
}

function checkForWin() {
  for (let i = 0; i < winningRows.length; i++) {
    const [a, b, c] = winningRows[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      gameIsRunning = false;
      boxes[a] === "cross" ? scoreCross++ : scoreCircle++;
      // playWinnerSound();
      setWinnerStyle(a, b, c);
      return true;
    }
  }
}

function checkForDraw() {
  let crossCounter = boxes.filter((element) => element === "cross").length;
  let circleCounter = boxes.filter((element) => element === "circle").length;
  if (crossCounter > 4 || circleCounter > 4) {
    gameIsRunning = false;
    return true;
  }
}

function gameOver() {
  round++;
  round % 2 === 0 ? setCircleAsNext() : setCrossAsNext();
  setTimeout(() => {
    renderScore();
    resetBoard();
    removeWinnerStyle();
    checkIfComputerIsNext();
  }, 1500);
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

function setWinnerStyle(...winnerRow) {
  for (let box of winnerRow) {
    const boxElement = document.querySelector(`#game-board-box-${box}`);
    boxElement.classList.add("winner-box");
  }
}

function removeWinnerStyle() {
  for (let boxElement of boardBoxes) {
    boxElement.classList.remove("winner-box");
  }
}

function playWinnerSound() {
  const audio = new Audio("sound/winner.mp3");
  audio.play();
}

function setOnePlayer() {
  if (twoPlayers) {
    twoPlayers = false;
    btnSetOnePlayer.classList.add("selected");
    btnSetTwoPlayers.classList.remove("selected");
    startNewGame();
  }
}

function setTwoPlayers() {
  if (!twoPlayers) {
    twoPlayers = true;
    btnSetTwoPlayers.classList.add("selected");
    btnSetOnePlayer.classList.remove("selected");
    startNewGame();
  }
}

// AI part

function checkIfComputerIsNext() {
  if (!twoPlayers && gameIsRunning && !isCrossNext) {
    setTimeout(() => {
      setBoxComputer();
    }, 500);
  }
}

function setBoxComputer() {
  if (checkIfComputerCanWin()) {
    setCircle(checkIfComputerCanWin());
  } else if (checkIfComputerCanPreventWinForUser()) {
    setCircle(checkIfComputerCanPreventWinForUser());
  } else {
    const emptyBox = getEmptyBox();
    setCircle(emptyBox);
  }
  if (checkGameOver()) gameOver();
}

function getEmptyBox() {
  let box = getRandomNumber();
  while (boxes[box] === "cross" || boxes[box] === "circle") {
    box = getRandomNumber();
  }
  return box;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 9);
}

function checkIfComputerCanWin() {
  for (let i = 0; i < winningRows.length; i++) {
    const [a, b, c] = winningRows[i];
    if (!boxes[a] && boxes[b] === "circle" && boxes[c] === "circle") return a;
    if (!boxes[b] && boxes[a] === "circle" && boxes[c] === "circle") return b;
    if (!boxes[c] && boxes[a] === "circle" && boxes[b] === "circle") return c;
  }
  return false;
}

function checkIfComputerCanPreventWinForUser() {
  for (let i = 0; i < winningRows.length; i++) {
    const [a, b, c] = winningRows[i];
    if (!boxes[a] && boxes[b] === "cross" && boxes[c] === "cross") return a;
    if (!boxes[b] && boxes[a] === "cross" && boxes[c] === "cross") return b;
    if (!boxes[c] && boxes[a] === "cross" && boxes[b] === "cross") return c;
  }
  return false;
}
