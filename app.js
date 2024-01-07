const playerPointsSpan = document.querySelector(".player-points");
const compPointsSpan = document.querySelector(".comp-points");
const optionButtons = document.querySelectorAll(".option");
const choicesSection = document.querySelector(".choices");
const playerChoiceSpan = document.querySelector(".player-choice");
const compChoiceSpan = document.querySelector(".comp-choice");
const resultText = document.querySelector(".results-text");
const resetGame = document.querySelector(".reset-game");

let playerPoints = 0;
let compPoints = 0;
let playerChoice = "";
let compChoice = "";

function startGame() {
  playerPointsSpan.innerHTML = playerPoints;
  compPointsSpan.innerHTML = compPoints;
  resultText.innerHTML = "Choose your weapon!";
}

window.onload = startGame();

function playerSelect(event) {
  optionButtons.forEach((option) => option.classList.remove("active"));
  playerChoice = event.target.id;
  event.target.classList.add("active");
  resetGame.classList.add("active");

  compSelect();
}

const arrayCompChoices = ["ROCK", "PAPER", "SCISSORS"];

function compSelect() {
  const randomIndex = Math.floor(Math.random() * arrayCompChoices.length);

  compChoice = arrayCompChoices[randomIndex];
  console.log(compChoice);
  checkResult();
}

function checkResult() {
  let winner = "";
  let resultClass = "";

  if (
    (playerChoice === "ROCK" && compChoice === "SCISSORS") ||
    (playerChoice === "PAPER" && compChoice === "ROCK") ||
    (playerChoice === "SCISSORS" && compChoice === "PAPER")
  ) {
    winner = "Congratulations, you won!";
    playerPoints++;
    playerPointsSpan.innerHTML = playerPoints;
    resultClass = "win";
  } else if (playerChoice === compChoice) {
    winner = "DRAW!";
    resultClass = "draw";
  } else {
    compPoints++;
    compPointsSpan.innerHTML = compPoints;
    winner = "You lost!";
    resultClass = "lost";
  }
  choicesSection.classList.add("active");
  playerChoiceSpan.innerHTML = playerChoice;
  compChoiceSpan.innerHTML = compChoice;
  resultText.innerHTML = winner;
  resultText.className = "results-text" + resultClass;
  console.log(winner);
}

function newGame() {
  choicesSection.classList.remove("active");
  resultText.innerHTML = "Choose your weapon";
  optionButtons.forEach((option) => option.classList.remove("active"));
}
optionButtons.forEach((option) =>
  option.addEventListener("click", playerSelect)
);
resetGame.addEventListener("click", newGame);
