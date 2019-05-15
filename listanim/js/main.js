document.getElementById("add-to-list").onclick = function() {
  var list = document.getElementById("list");
  var newLI = document.createElement("li");
  newLI.innerHTML = "A new item";
  list.appendChild(newLI);

  setTimeout(function() {
    newLI.className = newLI.className + " show";
  }, 10);
};

document.getElementById("list").onclick = function(event) {
  var list = document.getElementById("list");

  var li = event.target;

  li.className = li.className + " hide";

  setTimeout(function() {
    list.removeChild(li);
  }, 500);
};
