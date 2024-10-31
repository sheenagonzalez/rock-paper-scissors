
/** Return a string value denoting "rock", "paper", or "scissors" */
function getComputerChoice() {
  // Assign random number from 0 to 100
  let randomNumber = Math.round(Math.random() * 100);
  // Return "rock" if number is between 0 and 32
  if (randomNumber >= 0 && randomNumber < 33) {
    return "rock";
  // Return "paper" if number is between 33 and 65
  } else if (randomNumber >= 33 && randomNumber < 66) {
    return "paper";
  // Return "scissors" if random number is between 66 and 100
  } else {
    return "scissors";
  }
}

/** Take the user's choice and return it */
function getHumanChoice(choice) {
  return choice.querySelector('.choice-label').innerText.toLowerCase();;
}

/** Play 5 rounds */
function playGame() {
  const numRounds = 5;
  let humanScore = 0;
  let computerScore = 0;
  let currRound = 1;
  let humanSelection, computerSelection = "";
  
  /** Play a single round 
   * Take in two parameters humanChoice and computerChoice
   * Print out a string value representing the round winner and increments humanScore and computerScore global variables
  */
  function playRound(humanChoice, computerChoice) {

    // Determine winner and update score variables
    let winner = "";
    if (humanChoice == computerChoice) {
      winner = "tie";
    } else if ((humanChoice == "paper" && computerChoice == "rock") || (humanChoice == "rock" && computerChoice == "scissors") || (humanChoice == "scissors" && computerChoice == "paper")) {
      humanScore++;
      winner = "human";
    } else {
      computerScore++;
      winner = "computer";
    }

    // Store round result announcement and update scoreboard UI
    humanChoice = capitalize(humanChoice);
    computerChoice = capitalize(computerChoice);
    let message = "";
    let humanRoundResult = document.querySelector(`.human .round-${currRound}`);
    let computerRoundResult = document.querySelector(`.computer .round-${currRound}`);

    if (winner == "human") {
      message = `You win! ${humanChoice} beats ${computerChoice}.`
      humanRoundResult.innerText = '+1';
      humanRoundResult.style.color = 'green';
      computerRoundResult.innerText = '0';
      computerRoundResult.style.color = 'red';
    } else if (winner == "computer") {
      message = `You lose! ${computerChoice} beats ${humanChoice}.`;
      humanRoundResult.innerText = '0';
      humanRoundResult.style.color = 'red';
      computerRoundResult.innerText = '+1';computerRoundResult.style.color = 'green';
    } else if (winner == "tie") {
      message = `It's a tie! You both chose ${humanChoice}.`;
      humanRoundResult.innerText = 'Tie';
      computerRoundResult.innerText = 'Tie';
      humanRoundResult.style.color = 'gray';
      computerRoundResult.style.color = 'gray';
    }

    return message;
  }

  /** Remove choice buttons and display game over screen with final results, scoreboard, and a button to 'Play Again' */
  function announceResults() {
    // Replace title with 'Game Over'
    const title = document.querySelector('.title');
    title.innerText = 'Game Over!';

    // Remove choice buttons
    const container = document.querySelector('.container');
    const choices = document.querySelector('.choices');
    container.removeChild(choices);

    // Announce game results
    const finalMessage = document.querySelector('.results-message');
    if (humanScore > computerScore) {
      finalMessage.innerText = `RESULT: You won! The final score is ${humanScore} - ${computerScore}.`;
      finalMessage.style.color = 'green';
    } else if (computerScore > humanScore) {
      finalMessage.innerText = `RESULT: You lose! The final score is ${humanScore} - ${computerScore}.`;
      finalMessage.style.color = 'red';
    } else {
      finalMessage.innerText = `RESULT: It's a tie! The final score is ${humanScore} - ${computerScore}.`;
      finalMessage.style.color = 'gray';
    }
    finalMessage.style.fontSize = '2rem';
    finalMessage.style.fontFamily = 'Tsukimi Rounded, sans-serif';

    // Create button to play again
    const playAgain = document.createElement('button');
    playAgain.innerText = 'Play Again?';
    playAgain.addEventListener('click', () => {
      window.location.reload();
    })
    playAgain.classList.add('play-again');
    container.appendChild(playAgain);
  }

  /** Add event listener to the buttons that call playRound function with the correct playerSelection every time a button is clicked */
  const choiceBtns = document.querySelectorAll('.choice-btn');

  choiceBtns.forEach(function (choice) {
    choice.addEventListener('click', (e) => {
      // Get choices and play round
      humanSelection = getHumanChoice(choice);
      computerSelection = getComputerChoice();
      let message = playRound(humanSelection, computerSelection, currRound);

      // Update total scores
      const humanTotalScore = document.querySelector('.human .total-score');
      humanTotalScore.innerText = humanScore;
      const computerTotalScore = document.querySelector('.computer .total-score');
      computerTotalScore.innerText = computerScore;
      const roundMessage = document.querySelector('.results-message');
      roundMessage.innerText = message;

      if (currRound === numRounds) {
        announceResults();
      }

      currRound++;
    });
  });

  return;
}

// Helper function

/** Capitalize first letter of a string with the rest of the string lowercased
 */
function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

playGame();

/** Add a div for displaying results and change all console.logs into DOM methods */

/** Display the running score, and announce a winner of the game once one player reaches 5 points */