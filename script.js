"use strict";

const cross = '<img src="./img/cross.png" />';
const circle = '<img src="./img/circle.png" />';
const playerCrossImg = document.querySelector("#player-cross-img");
const playerCircleImg = document.querySelector("#player-circle-img");
const playerCrossScore = document.querySelector("#core-player-cross");
const playerCircleScore = document.querySelector("#core-player-circle");
const boardBoxes = document.querySelectorAll(".game-board-box");
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
let isCrossNext = true;
let twoPlayers = true;

function setBox(box) {
  if (boardBoxes[box].innerHTML === "")
    isCrossNext ? setCross(box) : setCircle(box);
  checkWinner(box);
}

function setCross(box) {
  document.querySelector(`#game-board-box-${box}`).innerHTML = cross;
  isCrossNext = false;
  playerCrossImg.classList.remove("next");
  playerCircleImg.classList.add("next");
  boxes[box] = "cross";
}

function setCircle(box) {
  document.querySelector(`#game-board-box-${box}`).innerHTML = circle;
  isCrossNext = true;
  playerCircleImg.classList.remove("next");
  playerCrossImg.classList.add("next");
  boxes[box] = "circle";
}

function checkWinner(box) {
  console.log(box);
}

function resetBoard() {
  for (let box of boardBoxes) {
    box.innerHTML = "";
  }
}
