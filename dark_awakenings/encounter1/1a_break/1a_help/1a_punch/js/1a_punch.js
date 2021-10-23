let gameObj;

window.addEventListener("load", () => {
  gameObj = gameObject;
});

function optionOneWasClicked() {
  console.log("Option one was clicked!");
}

function optionTwoWasClicked() {
  let newScene = window.open("../../../2a_look/1a_handaxe/1a_handaxe.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function optionThreeWasClicked() {
  let newScene = window.open(
    "../../../conclusions/the_stone_escaped_alone.html"
  );

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}
