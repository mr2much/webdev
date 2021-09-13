import { CharGUI } from "../../../../../js/components/char_gui.js";

let theStone = {};
let taintedRoot = {};
let gameObj;
let paragraph = document.getElementById("narration");
let display = document.getElementById("feedback");
let theStoneGUI;
let taintedRootGUI;
let hpObservers = [];

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  theStone = gameObj.creatures.players.theStone;
  console.log(`Number of Enemies: ${gameObj.enemies.length}`);
  taintedRoot = gameObj.enemies.shift();

  if (theStone) {
    theStoneGUI = new CharGUI(theStone);
  }

  if (taintedRoot) {
    taintedRootGUI = new CharGUI(taintedRoot);
  }

  hpObservers.push(theStoneGUI, taintedRootGUI);

  // TODO: Move this into its own function
  let paragraphAction = document.createElement("p");
  paragraphAction.id = `${theStone.id}`;

  display.insertBefore(paragraphAction, display.lastChild.nextSibling);
  display.insertBefore(theStoneGUI, display.lastChild.nextSibling);
  display.insertBefore(taintedRootGUI, display.lastChild.nextSibling);

  attack(theStone, taintedRoot);
});

function attack(attacker, target) {
  let damageDealt = gameObj.attack(attacker, target);

  let actionParagraph = document.querySelector(`#${attacker.id}`);

  if (damageDealt === 0) {
    actionParagraph.innerHTML = `${attacker.name}'s attack failed to hit target ${target.name}`;
  } else {
    actionParagraph.innerHTML = `${attacker.name} dealt ${damageDealt} to ${target.name}`;

    notifyObservers(target);
  }
}

function optionOneWasClicked() {
  if (taintedRoot.hp > 0) {
    paragraph.innerHTML =
      "Despite your best efforts, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Hurry up, precious! Hurry!'";

    attack();

    if (taintedRoot.isDead()) {
      // if (taintedRoot.hp <= 0) {
      console.log(`Enemy ${taintedRoot.name} was slain!`);
      let newScene = window.open("../../../1a_break/1a_break_success.html");

      newScene.onload = function () {
        this.gameObject = gameObj;
      };
    }
  }
}

function notifyObservers(target) {
  for (let i = 0; i < hpObservers.length; i++) {
    hpObservers[i]._char.hp = target.hp;
  }
}
