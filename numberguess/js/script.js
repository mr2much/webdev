// create ssecret number
var secretNumber = 4;

//ask user for guess
var guess = Number(prompt("Guess a number"));

// check guess
if (guess === secretNumber) {
  alert("You guessed!");
} else if (guess < secretNumber) {
  alert("Too low, try again");
} else {
  alert("Too high, try again");
}
