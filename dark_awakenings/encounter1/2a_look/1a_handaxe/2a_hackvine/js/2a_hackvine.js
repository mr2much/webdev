let theStone = {};
let taintedRoot = {};
let gameObj;
let paragraph = document.getElementById("narration");
let display = document.getElementById("feedback");
let paragraphTheStoneActions = document.createElement("p");

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  theStone = gameObj.creatures.players.theStone;
  taintedRoot = gameObject.enemies.shift();

  combat();

  display.insertBefore(paragraphTheStoneActions, display.lastChild.nextSibling);
});

function combat() {
  let damageDealt = gameObj.attack(theStone, taintedRoot);

  if (damageDealt === 0) {
    paragraphTheStoneActions.innerHTML = `${theStone.name}'s attack failed to hit target ${taintedRoot.name}`;
  } else {
    paragraphTheStoneActions.innerHTML = `${theStone.name} dealt ${damageDealt} to ${taintedRoot.name}`;
  }
}

function optionOneWasClicked() {
  if (taintedRoot.hp > 0) {
    paragraph.innerHTML =
      "Despite your best efforts, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Hurry up, precious! Hurry!'";

    combat();
    if (taintedRoot.isDead()) {
      // if (taintedRoot.hp <= 0) {
      console.log(`Enemy ${taintedRoot.name} was slain!`);
      let newScene = window.open(
        "/dark_awakenings/encounter1/1a_break/1a_break_success.html"
      );

      newScene.onload = function () {
        this.gameObject = gameObj;
      };
    }
  }
}
