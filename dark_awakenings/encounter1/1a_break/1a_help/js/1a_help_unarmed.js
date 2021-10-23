let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;
});

function optionOneWasClicked() {
  let newScene = window.open("1a_punch/1a_punch.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function optionTwoWasClicked() {
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
