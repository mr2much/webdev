var maxColors = 6;
var colors = [];
var pickedColor;

var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");

initialize();

function initialize() {
  setModeButtonListeners();
  setSquaresListeners();
  reset();
}

function setModeButtonListeners() {
  // mode buttons event listeners
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      maxColors = this.textContent === "Easy" ? 3 : 6;

      reset();
    });
  }
}

function setSquaresListeners() {
  // add click listener to squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetBtn.textContent = "Play Again?";
        changeColors(clickedColor);
      } else {
        messageDisplay.textContent = "Try Again!";
        this.style.backgroundColor = "#232323";
      }
    });
  }
}

function reset() {
  // generate all new colors
  colors = generateRandomColors(maxColors);

  // pick a new rancom color from array
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetBtn.textContent = "New Colors";
  messageDisplay.textContent = "";

  // change color of squares
  for (var i = 0; i < squares.length; i++) {
    // add initial colors to squares
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }

  h1.style.backgroundColor = "steelblue";
}

resetBtn.addEventListener("click", function() {
  reset();
});

function generateRandomColors(num) {
  // make an array
  var colors = [];

  // repeat num times
  for (var i = 0; i < num; i++) {
    // get random color and push into array
    colors.push(randomColor());
  }

  //retun that array
  return colors;
}

function randomColor() {
  // pick a "red" from 0-255
  var r = Math.floor(Math.random() * 256);

  // pick a "green" from 0-255
  var g = Math.floor(Math.random() * 256);

  // pick a "blue" from 0-255
  var b = Math.floor(Math.random() * 256);

  // "rgb(r, g, b)"

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);

  return colors[random];
}

function changeColors(color) {
  h1.style.backgroundColor = color;
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // change all colors to match given color
    squares[i].style.backgroundColor = color;
  }
}
