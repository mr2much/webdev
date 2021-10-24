import { CharGUI } from "../../../../../js/components/char_gui.js";
import { ObserverHandler } from "../../../../../js/observerhandler.js";

let theStone = {};
let taintedRoot = {};
let gameObj;
let paragraph = document.getElementById("narration");
let display = document.getElementById("feedback");
let theStoneGUI;
let taintedRootGUI;

let btnFight = document.querySelector("#fight");

const hpObservers = new ObserverHandler();

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

  hpObservers.add(theStoneGUI);
  hpObservers.add(taintedRootGUI);

  // TODO: Move this into its own function
  let paragraphAction = document.createElement("p");
  paragraphAction.id = `${theStone.id}`;

  display.insertBefore(paragraphAction, display.lastChild);

  let gui = document.createElement("div");
  gui.id = "gui";

  gui.appendChild(theStoneGUI);
  gui.appendChild(taintedRootGUI);

  display.insertBefore(gui, display.lastChild.nextSibling);

  btnFight.addEventListener("click", performAttack);

  executeAttack(theStone, taintedRoot);
});

function executeAttack(attacker, target) {
  let damageDealt = gameObj.attack(attacker, target);

  let actionParagraph = document.querySelector(`#${attacker.id}`);

  if (damageDealt === 0) {
    actionParagraph.innerHTML = `${attacker.name}'s attack failed to hit target ${target.name}`;
  } else {
    actionParagraph.innerHTML = `${attacker.name} dealt ${damageDealt} to ${target.name}`;

    hpObservers.notify(target);
  }
}

function performAttack() {
  if (taintedRoot.hp > 0) {
    paragraph.innerHTML =
      "Despite your best efforts, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Hurry up, precious! Hurry!'";

    // TODO: The TaintedRoot should also attack The Stone
    executeAttack(theStone, taintedRoot);

    if (taintedRoot.isDead()) {
      console.log(`Enemy ${taintedRoot.name} was slain!`);
      let newScene = window.open("../../../1a_break/1a_break_success.html");

      newScene.onload = function () {
        this.gameObject = gameObj;
      };
    }
  }
}
