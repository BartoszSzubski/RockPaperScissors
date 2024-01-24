const playerPointsSpan = document.querySelector(".player-points");
const compPointsSpan = document.querySelector(".comp-points");
const options = document.querySelectorAll(".option");
const choicesSection = document.querySelector(".choices");
const playerChoiceSpan = document.querySelector(".player-choice");
const compChoiceSpan = document.querySelector(".comp-choice");
const resultText = document.querySelector(".results-text");
const resetGame = document.querySelector(".reset-game");
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");

const choiceImages = {
  paper: "paperchoice.png",
  rock: "rockchoice.png",
  scissors: "scissorschoice.png",
};

let playerPoints = 0;
let compPoints = 0;
let playerChoice = "";
let compChoice = "";

function startGame() {
  playerPointsSpan.innerHTML = playerPoints;
  compPointsSpan.innerHTML = compPoints;
  resultText.innerHTML = "Choose your weapon!";
}

window.onload = startGame;

function playerSelect(event) {
  playerChoice = event.currentTarget.dataset.option.toLowerCase();
  playerHand.src = `./images/${choiceImages[playerChoice]}`;
  compSelect();

  gsap
    .timeline({
      defaults: {
        duration: 0.2,
      },
    })
    .to(playerHand, {
      scale: 1.2,
    })
    .to(playerHand, {
      scale: 0.8,
    })
    .to(playerHand, {
      scale: 1,
    });
}

// cpu settings
const computerOptions = ["rock", "paper", "scissors"];

function compSelect() {
  const randomIndex = Math.floor(Math.random() * computerOptions.length);
  compChoice = computerOptions[randomIndex];

  // Update images for the hands
  computerHand.src = `./images/${choiceImages[compChoice]}`;

  checkResult();
}

function checkResult() {
  let winner = "";

  if (
    (playerChoice === "scissors" && compChoice === "paper") ||
    (playerChoice === "paper" && compChoice === "rock") ||
    (playerChoice === "rock" && compChoice === "scissors")
  ) {
    winner = "You won!";
    playerPoints++;
    playerPointsSpan.innerHTML = playerPoints;
  } else if (
    (playerChoice === "paper" && compChoice === "scissors") ||
    (playerChoice === "rock" && compChoice === "paper") ||
    (playerChoice === "scissors" && compChoice === "rock")
  ) {
    winner = "You lost!";
    compPoints++;
    compPointsSpan.innerHTML = compPoints;
  } else {
    winner = "Draw!";
  }

  resultText.innerHTML = winner;
}

function reset() {
  choicesSection.classList.remove("active");
  options.forEach((button) => button.classList.remove("active"));
  playerPoints = 0;
  compPoints = 0;
  startGame();
}

options.forEach((button) => button.addEventListener("click", playerSelect));
resetGame.addEventListener("click", reset);
