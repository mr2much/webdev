let gameObj;
window.addEventListener("load", (e) => {
  gameObj = gameObject;
});

function optionOneWasClicked() {
  console.log("Option One Was Clicked");
}

function optionTwoWasClicked() {
  let newScene = window.open("2a_hackvine/2a_hackvine.html");
  newScene.onload = function () {
    this.gameObject = gameObj;
  };
  console.log("Combat initiated");
}