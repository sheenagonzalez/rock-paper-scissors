
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
function getHumanChoice() {
  // Prompt the user for input and save it to a variable
  // Make the input case insensitive
  let userInput = prompt("Rock, paper, or scissors?");
  // Check if input is "rock", "paper", or "scissors"
  // Otherwise, alert the user and prompt again
  if (!(userInput == "rock" || userInput == "paper" || userInput == "scissors")) {
    alert("Choose 'rock', 'paper', or 'scissors'.");
    return getHumanChoice();
  }
  // Return user input
  return userInput;
}

/** Play 5 rounds */
function playGame() {

  /** Keep track of player's and computer's scores */
  // Create variables for humanScore and computerScore and set both to initial value of 0
  let humanScore = 0;
  let computerScore = 0;
  
  /** Play a single round 
   * Take in two parameters humanChoice and computerChoice
   * Print out a string value representing the round winner and increments humanScore and computerScore global variables
  */
  function playRound(humanChoice, computerChoice) {

    // STEP 1: Determine winner and track score
    let winner = "";
    // If humanChoice equals computerChoice, then announce a tie; score stays the same
    if (humanChoice == computerChoice) {
      winner = "tie";
    // If humanChoice beats computerChoice (paper beats rock, rock beats scissors, scissors beat paper), human wins
    } else if ((humanChoice == "paper" && computerChoice == "rock") || (humanChoice == "rock" && computerChoice == "scissors") || (humanChoice == "scissors" && computerChoice == "paper")) {
      // Increment humanScore by 1
      humanScore++;
      winner = "human";
    // Else, computer wins
    } else {
      // Increment computerScore by 1
      computerScore++;
      winner = "computer";
    }

    // STEP 2: Display message announcing winner
    // Capitalize first letter of choices
    humanChoice = capitalize(humanChoice);
    computerChoice = capitalize(computerChoice);
    // Create message variable and initialize to empty string
    let message = "";
    if (winner == "human") {
      // Announce human as winner
      message = `You win! ${humanChoice} beats ${computerChoice}.`
    } else if (winner == "computer") {
      // Announce computer as winner
      message = `You lose! ${computerChoice} beats ${humanChoice}.`;
    // Announce a tie
    } else if (winner == "tie") {
      message = `It's a tie! You both chose ${humanChoice}.`;
    }
    alert(message);
    console.log(message);
    
    return;
  }

  /** Call playRound five times */
  // Create numRounds variable set to number of rounds, which is 5
  let numRounds = 5;
  let humanSelection, computerSelection = "";
  // Iterate through every round, get choices, play a round and track score
  for (let currRound = 1; currRound <= numRounds; currRound++) {
    // Show current round 
    console.log(`** ROUND ${currRound} **`);
    // Get human and computer choices
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();
    // Play a round
    playRound(humanSelection, computerSelection);
    // Show current scores
    console.log("You: ", humanScore);
    console.log("Computer: ", computerScore);
  }

  // Show game results
  console.log("** GAME OVER **");
  if (humanScore > computerScore) {
    console.log(`RESULT: You won! The final score is ${humanScore} - ${computerScore}.`);
  } else if (computerScore > humanScore) {
      console.log(`RESULT: You lose! The final score is ${humanScore} - ${computerScore}.`);
  } else {
    console.log(`RESULT: It's a tie! The final score is ${humanScore} - ${computerScore}.`);
  }

  return;
}

// Helper function

/** Capitalize first letter of a string with the rest of the string lowercased
 */
function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

playGame();