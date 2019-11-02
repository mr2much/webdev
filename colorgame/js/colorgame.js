var colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(255, 0, 255)",
  "rgb(0, 255, 255)",
  "rgb(0, 0, 255)",
  "rgb(255, 255, 255)"
];

var messageDisplay = document.querySelector("#message");

var squares = document.querySelectorAll(".square");
var pickedColor = colors[3];
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

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);

  return colors[random];
}

function changeColors(color) {
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // change all colors to match given color
    squares[i].style.backgroundColor = color;
  }
}
