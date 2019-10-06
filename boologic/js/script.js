var x = 5;
var y = 9;

var listElements = document.querySelectorAll("li");
var booleanTests = [
  x > 10,
  x >= 5,
  x < -50,
  x <= 100,
  x == "5",
  x != "b",
  x === "5",
  x !== "5",
  x < 10 && x !== 5,
  y > 9 || x === 5,
  !(x === y)
];

for (var i = 0; i < listElements.length; i++) {
  var text = listElements[i].textContent;
  listElements[i].textContent = text + " " + booleanTests[i];
}
