document.addEventListener("DOMContentLoaded", function() {
  var todoList = document.querySelector("#items");
  var listItems = todoList.querySelectorAll("input[type='checkbox']");
  var itemCount = listItems.length;
  var btnAdd = document.querySelector("#add-item");
  var btnRemove = document.querySelector("#remove");

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
    updateItemCount();
    var newInput = createNewInput();
    var newLabel = createNewLabel(todoDescription);

    // Add new TODO list item to the TODO list
    addNewTODOToList(newInput, newLabel);
    console.log(newInput, newLabel);
  }

  function updateItemCount() {
    itemCount = todoList.querySelectorAll("input[type='checkbox']").length;
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
    return "item" + (itemCount + 1);
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
    todoList.appendChild(newInput);
    todoList.appendChild(newLabel);
  }

  (function(entry) {
    if (chrome.runtime.lastError) {
      console.log("Error: " + chrome.runtime.lastError.message);
    }
  })();
});
