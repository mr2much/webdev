let group;
window.addEventListener("load", (e) => {
  localStorage = window.localStorage;
  group = enemies;
});

function optionTwoWasClicked() {
  let newScene = window.open("2a_hackvine/2a_hackvine.html");
  newScene.onload = function () {
    this.enemies = group;
  };
  console.log("Combat initiated");
}
