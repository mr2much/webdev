let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  console.log("Amount of enemies: " + gameObj.enemies.length);
});

function optionOneWasClicked() {
  let newScene = window.open("1a_punch/1a_punch.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function optionTwoWasClicked() {
  let newScene = window.open("../../1a_break/1a_help/1a_help_axe.html");

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
