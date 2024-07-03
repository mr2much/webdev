let output = document.getElementById("output");
let maxLabel = document.getElementById("max-guess");
let btnStart = document.getElementById("start");
let btnGuess = document.getElementById("guess-button");
let btnQuit = document.getElementById("quit");
let inputNumber = document.getElementById("maximum");
let inputGuess = document.getElementById("guess");
let initSection = document.getElementById("init");
let gameSection = document.getElementById("game");
let maxNum;
let targetNum;
let attempts = 0;

function initialize() {
  maxNum = 0;
  targetNum = 0;
  attempts = 0;
  inputNumber.value = "";
  output.classList.remove("winning");
  output.innerHTML = "";
  showElement(btnGuess);
  btnQuit.innerHTML = "Quit";
}

{
  initialize();
}

function generateRandomNumber(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

function showMaxNumberMessage(limit) {
  maxLabel.innerText = limit;
}

function hideElement(section) {
  section.classList.remove("show");
  section.classList.add("hidden");
}

function showElement(section) {
  section.classList.remove("hidden");
  section.classList.add("show");
}

btnStart.addEventListener("click", function (event) {
  event.preventDefault();
  // set the maximum number
  maxNum = parseInt(inputNumber.value);
  // generate a random number between 1 and the maximum
  targetNum = generateRandomNumber(maxNum);

  console.log(`Target Num: ${targetNum}`);
  console.log(inputNumber.value);
  console.log(maxNum);

  // set the maxLabel to the maxNum
  showMaxNumberMessage(maxNum);

  // apply .hidden class to the #init section
  hideElement(init);

  // apply .show class to #game section
  showElement(gameSection);
});

function showWinScreen() {
  output.classList.add("winning");
  output.innerHTML = `<p>Yay! You did it!</p><p>It took you: <span>${attempts}</span> attempts to guess the correct number!</p>`;
  hideElement(btnGuess);
  btnQuit.innerHTML = "Restart Game!";
}

btnGuess.addEventListener("click", function (event) {
  event.preventDefault();

  // get current guess
  let guess = parseInt(inputGuess.value);
  inputGuess.value = "";

  // increase attempts
  attempts++;
  let message = "";

  if (guess === targetNum) {
    showWinScreen();
  } else {
    if (guess > targetNum) {
      message = "Too high";
    } else {
      message = "Too low";
    }

    output.innerText = `${message}! Guess again!`;
  }

  console.log(`Guess: ${guess}, Attempts: ${attempts}`);
});

btnQuit.addEventListener("click", function (event) {
  // hide #game section
  hideElement(gameSection);
  // show #init section
  showElement(initSection);

  // reset values
  initialize();
});

// let maxNum = parseInt(prompt("Enter a maximum number:"));

// while (!maxNum) {
//   maxNum = parseInt(prompt("Please enter a valid number:"));
// }

// let targetNum = Math.floor(Math.random() * maxNum) + 1;

// let guess = prompt("Enter your first guess:");
// let attempts = 1;

// while (parseInt(guess) !== targetNum) {
//   attempts++;
//   if (guess === "q") {
//     break;
//   }

//   if (guess > targetNum) {
//     guess = prompt("Too high. Guess again:");
//   } else if (guess < targetNum) {
//     guess = prompt("Too low. Guess again:");
//   } else {
//     guess = prompt("Enter a valid number:");
//   }
// }
// if (guess === "q") {
//   output.innerHTML = "Well, better luck next time!";
// } else {
//   output.innerHTML = `It took you: <span>${attempts}</span> attempts to guess the correct number!`;
// }
