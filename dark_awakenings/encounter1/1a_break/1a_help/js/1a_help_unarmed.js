let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;
});

function optionOneWasClicked() {
  console.log("You try to help without weapons");
}

function optionTwoWasClicked() {
  console.log("Option two was clicked");

  let newScene = window.open("../../2a_look/1a_handaxe/1a_handaxe.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function optionThreeWasClicked() {
  console.log("You run away!");

  let newScene = window.open("../../conclusions/the_stone_escaped_alone.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}
