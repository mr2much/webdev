var colors = generateRandomColors(6);

var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
  // add initial colors to squares
  squares[i].style.backgroundColor = colors[i];

  // add click listener to squares
  squares[i].addEventListener("click", function() {
    //grab color of clicked square
    var clickedColor = this.style.backgroundColor;
    //compare color to pickedColor
    if (clickedColor === pickedColor) {
      messageDisplay.textContent = "Correct!";
      changeColors(clickedColor);
    } else {
      messageDisplay.textContent = "Try Again!";
      this.style.backgroundColor = "#232323";
    }
  });
}

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
