let theStone = {};
let taintedRoot = {};
let paragraph = document.getElementById("narration");
let gameObj;
let display = document.getElementById("feedback");
let paragraphTheStoneActions = document.createElement("p");

window.addEventListener("load", (e) => {
  gameObj = gameObject;
  theStone = gameObj.creatures.players.theStone;
  taintedRoot = gameObj.enemies.shift();

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
      "Despite your best efforts, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Keep going, precious! We believes in you!'";

    combat();

    if (taintedRoot.isDead()) {
      console.log(`Enemy ${taintedRoot.name} was slain!`);
      let newScene = window.open("1a_escape/1a_escape_success.html");

      newScene.onload = function () {
        this.gameObject = gameObj;
      };
    }
  }
}

function optionTwoWasClicked() {
  console.log("You decided to run away!");
}
