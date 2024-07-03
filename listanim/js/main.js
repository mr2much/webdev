document.getElementById("add-to-list").onclick = function() {
  var list = document.getElementById("list");

  var swingList = document.getElementById("swing-list");

  var newLI = document.createElement("li");
  newLI.innerHTML = "A new item";

  var newLI2 = document.createElement("li");
  newLI2.innerHTML = "A new item";

  list.appendChild(newLI);
  swingList.appendChild(newLI2);

  setTimeout(function() {
    newLI.className = newLI.className + " show";

    newLI2.className = newLI2.className + " show";
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

document.getElementById("swing-list").onclick = function(event) {
  var list = document.getElementById("swing-list");

  var li = event.target;

  li.className = li.className + " hide";

  setTimeout(function() {
    list.removeChild(li);
  }, 500);
};
