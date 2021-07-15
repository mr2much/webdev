let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;
});

function optionOneWasClicked() {
  let newScene = window.open(
    "/dark_awakenings/encounter1/1a_break/1a_help/1a_escape/1a_fight/1a_fight.html"
  );

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}
