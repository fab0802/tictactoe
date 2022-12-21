"use strict";

const cross = '<img src="./img/cross.png" />';
const circle = '<img src="./img/circle.png" />';
const playerCrossImg = document.querySelector("#player-cross-img");
const playerCircleImg = document.querySelector("#player-circle-img");
const playerCrossScore = document.querySelector("#core-player-cross");
const playerCircleScore = document.querySelector("#core-player-circle");
let isCrossNext = true;
let twoPlayers = true;

function setBox(box) {
  if (isCrossNext) {
    setCross(box);
  } else {
    setCircle(box);
  }
}

function setCross(box) {
  document.querySelector(`#game-board-box-${box}`).innerHTML = cross;
  isCrossNext = false;
  playerCrossImg.classList.remove("next");
  playerCircleImg.classList.add("next");
}

function setCircle(box) {
  document.querySelector(`#game-board-box-${box}`).innerHTML = circle;
  isCrossNext = true;
  playerCircleImg.classList.remove("next");
  playerCrossImg.classList.add("next");
}
