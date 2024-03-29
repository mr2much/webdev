var todos = ["Finish course", "Bench 235x4"];

window.setTimeout(function() {
  var input = prompt("What would you like to do?");

  while (input !== "quit") {
    if (input === "list") {
      listTodos();
    } else if (input === "new") {
      addNewTodo();
    } else if (input === "delete") {
      deleteTodo();
    }

    input = prompt("What would you like to do?");
  }

  console.log("OK, YOU QUIT THE APP");

  function listTodos() {
    console.log("*********************************");
    todos.forEach(function(todo, idx, arr) {
      console.log(idx + ": " + todo);
    });
    console.log("*********************************");
  }

  function addNewTodo() {
    var newTodo = prompt("Enter new TODO");
    console.log(newTodo + " added to the list");
    todos.push(newTodo);
  }

  function deleteTodo() {
    var index = Number(prompt("Enter the index of the TODO to delete"));
    todos.splice(index, 1);
    console.log("TODO deleted");
  }
}, 500);
