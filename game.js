let userScore = 0;
let compScore = 0;

const resetBtn = document.querySelector("#reset-btn");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Generate computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Clear highlight & animation classes from all choice cards
const clearHighlights = () => {
  choices.forEach(c => {
    c.classList.remove("highlight");
    c.classList.remove("win-shake");
  });
};

// Draw (tie) scenario
const drawGame = () => {
  msg.innerText = "It's Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Show winner logic & update scores
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `Win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "#081b31";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `Lost! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "#081b31";
  }
};

// Show trophy pop-up when user wins
const showTrophy = () => {
  const trophy = document.createElement("div");
  trophy.classList.add("trophy");
  trophy.innerText = "🏆 You’re the Champion!";
  document.body.appendChild(trophy);
  // Remove the trophy after animation
  setTimeout(() => {
    trophy.remove();
  }, 1200);
};

// Main game logic when user makes a choice
const playGame = (userChoice) => {
  clearHighlights();
  // 1. Highlight user’s tapped choice
  const userChoiceElem = document.getElementById(userChoice);
  userChoiceElem.classList.add("highlight");

  // 2. Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Draw
    drawGame();
    // Reset UI for next round after short delay
    setTimeout(clearHighlights, 1000);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = (compChoice === "paper") ? false : true;
    } else if (userChoice === "paper") {
      userWin = (compChoice === "scissors") ? false : true;
    } else { // userChoice === "scissors"
      userWin = (compChoice === "rock") ? false : true;
    }

    // 3. Show the result and trigger animations
    showWinner(userWin, userChoice, compChoice);

    if (userWin) {
      // Winning animation for user choice card
      userChoiceElem.classList.add("win-shake");
      // Trophy pop-up
      showTrophy();
    } else {
      // Losing animation for computer’s chosen card
      const compChoiceElem = document.getElementById(compChoice);
      if (compChoiceElem) {
        compChoiceElem.classList.add("win-shake");
      }
    }

    // 4. After animation and feedback, reset UI for the next round
    setTimeout(() => {
      clearHighlights();
      msg.innerText = "Play your move";
      msg.style.backgroundColor = "#081b31";
    }, 1500);
  }
};

// Add click event listeners to each choice card
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Reset game button: reset scores and UI
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  clearHighlights();
};

resetBtn.addEventListener("click", resetGame);
