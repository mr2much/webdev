var todos = ["Finish course", "Bench 235x4"];

var input = prompt("What would you like to do?");

while (input !== "quit") {
  if (input === "list") {
    console.log("*********************************");
    todos.forEach(function(todo, idx, arr) {
      console.log(idx + ": " + todo);
    });
    console.log("*********************************");
  } else if (input === "new") {
    var newTodo = prompt("Enter new TODO");
    console.log(newTodo + " added to the list");
    todos.push(newTodo);
  } else if (input === "delete") {
    var index = Number(prompt("Enter the index of the TODO to delete"));
    todos.splice(index, 1);
    console.log("TODO deleted");
  }

  input = prompt("What would you like to do?");
}

console.log("OK, YOU QUIT THE APP");
