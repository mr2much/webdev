document.addEventListener("DOMContentLoaded", function() {
  var todoList = document.querySelector("#items");
  var listItems = todoList.querySelectorAll("input[type='checkbox']");
  var todoLabels = todoList.querySelectorAll("label");
  var itemCount = listItems.length;
  var btnAdd = document.querySelector("#add-item");

  listItems.forEach(function(checkbox) {
    checkbox.className = checkbox.className + " show";
  });

  todoLabels.forEach(function(label) {
    label.className = label.className + " show";
    label.addEventListener("contextmenu", removeTODO);
  });

  function removeTODO() {
    var itemID = this.getAttribute("for");
    var checkbox = todoList.querySelector("#" + itemID);
    var label = this;

    checkbox.className = checkbox.className + " hide";
    label.className = label.className + " hide";

    setTimeout(function() {
      todoList.removeChild(checkbox);
      todoList.removeChild(label);
    }, 500);
  }

  btnAdd.addEventListener("click", function() {
    // create new TODO list item
    createNewTODOListItem(getTODODescription());
  });

  // retrieve text value from textfield
  function getTODODescription() {
    var entryItem = document.querySelector("#entry");
    var todoDescription = entryItem.value;
    entryItem.value = "";

    return todoDescription;
  }

  function createNewTODOListItem(todoDescription) {
    if (todoDescription !== "") {
      itemCount++;
      var newInput = createNewInput();
      var newLabel = createNewLabel(todoDescription);

      // Add new TODO list item to the TODO list
      addNewTODOToList(newInput, newLabel);
    }
  }

  // to create new TODO list item:
  function createNewInput() {
    // 1. create new unchecked input with type=checkbox
    var newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");

    // 2. assign id to be equal to itemCount + 1
    newCheckbox.setAttribute("id", getNewID());

    return newCheckbox;
  }

  function getNewID() {
    return "item" + itemCount;
  }

  function createNewLabel(todoDescription) {
    // 3. create new label with for equal to the id of the new checkbox
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", getNewID());

    // 4. label must have the text equal to the text field entry
    newLabel.textContent = todoDescription;

    return newLabel;
  }

  function addNewTODOToList(newInput, newLabel) {
    newLabel.addEventListener("contextmenu", removeTODO);
    todoList.appendChild(newInput);
    todoList.appendChild(newLabel);

    setTimeout(function() {
      newInput.className = newInput.className + " show";
      newLabel.className = newLabel.className + " show";
    }, 10);
  }

  todoList.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
});
