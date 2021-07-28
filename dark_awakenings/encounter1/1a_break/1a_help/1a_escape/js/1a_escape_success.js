let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;
});

function optionOneWasClicked() {
  let newScene = window.open("1a_fight/1a_fight.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function optionTwoWasClicked() {
  console.log("You ran away with Gungurk");
}

function optionThreeWasClicked() {
  console.log("You assess the situation");
}
