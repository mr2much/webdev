var todoList = document.querySelector("#items");
var listItems = todoList.querySelectorAll("input[type='checkbox']");
var todoLabels = todoList.querySelectorAll("label");
var itemCount = listItems.length;
var btnAdd = document.querySelector("#add-item");

// add remove event listener to each TODO item
todoLabels.forEach(function(label) {
  label.addEventListener("contextmenu", removeTODO);
});

function removeTODO() {
  var clickedLabel = this;
  // get ID of clicked element
  var elementID = this.getAttribute("for");

  // get clicked checkbox using its ID
  var clickedCheckbox = todoList.querySelector("#" + elementID);

  // remove the TODO item (checkbox and label)
  setTimeout(function() {
    todoList.removeChild(clickedCheckbox);
    todoList.removeChild(clickedLabel);
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
    console.log(newInput, newLabel);
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
  // add remove event listener to new label
  newLabel.addEventListener("contextmenu", removeTODO);
  todoList.appendChild(newInput);
  todoList.appendChild(newLabel);
}

// disable context menu on right click
todoList.addEventListener("contextmenu", e => {
  e.preventDefault();
});
