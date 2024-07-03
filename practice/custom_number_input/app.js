let inputNumber = document.getElementById("maximum");
let btnUp = document.getElementById("up");
let btnDown = document.getElementById("down");
let value = 0;

btnUp.addEventListener("click", function (event) {
  event.preventDefault();
  value = inputNumber.value;

  if (value >= inputNumber.max) {
    value = inputNumber.max;
  } else {
    value++;
  }

  inputNumber.value = value;
  console.log("Up clicked!", value);
});

btnDown.addEventListener("click", function (event) {
  event.preventDefault();
  value = inputNumber.value;
  if (value <= inputNumber.min) {
    value = inputNumber.min;
  } else {
    value--;
  }

  inputNumber.value = value;

  console.log("Down clicked!", value);
});
