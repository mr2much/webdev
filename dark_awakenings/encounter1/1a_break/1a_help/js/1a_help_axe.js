// import { gameObject } from "../../../../js/gameBehavior.js";
import { CharGUI } from "../../../../js/components/char_gui.js";
import { ObserverHandler } from "../../../../js/observerhandler.js";

let theStone = {};
let taintedRoot = {};
let paragraph = document.getElementById("narration");
let gameObj;
let display = document.getElementById("feedback");

let theStoneGUI;
let taintedRootGUI;

let hpObservers = new ObserverHandler();

let btnAttack = document.querySelector("#attack");
let btnRun = document.querySelector("#run_away");

window.addEventListener("load", (e) => {
  gameObj = gameObject;
  theStone = gameObj.creatures.players.theStone;
  taintedRoot = gameObj.enemies.shift();

  if (theStone) {
    theStoneGUI = new CharGUI(theStone);
  }

  if (taintedRoot) {
    taintedRootGUI = new CharGUI(taintedRoot);
  }

  hpObservers.add(theStoneGUI);
  hpObservers.add(taintedRootGUI);

  let paragraphAction = document.createElement("p");
  paragraphAction.id = `${theStone.id}`;

  display.insertBefore(paragraphAction, display.lastChild);

  let gui = document.createElement("div");
  gui.id = "gui";

  gui.appendChild(theStoneGUI);
  gui.appendChild(taintedRootGUI);

  display.insertBefore(gui, display.lastChild.nextSibling);

  console.log(`Number of enemies: ${gameObj.enemies.length}`);

  btnAttack.addEventListener("click", keepAttacking);
  btnRun.addEventListener("click", abandonGungurk);

  combat(theStone, taintedRoot);
});

function combat(attacker, target) {
  let damageDealt = gameObj.attack(attacker, target);

  let actionParagraph = document.querySelector(`#${attacker.id}`);

  if (damageDealt === 0) {
    actionParagraph.innerHTML = `${attacker.name}'s attack failed to hit target ${target.name}`;
  } else {
    actionParagraph.innerHTML = `${attacker.name} dealt ${damageDealt} to ${target.name}`;

    hpObservers.notify(target);
  }
}

function keepAttacking() {
  if (taintedRoot.hp > 0) {
    paragraph.innerHTML =
      "Despite your best efforts, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Keep going, precious! We believes in you!'";

    combat(theStone, taintedRoot);

    if (taintedRoot.isDead()) {
      console.log(`Enemy ${taintedRoot.name} was slain!`);
      let newScene = window.open("1a_escape/1a_escape_success.html");

      newScene.onload = function () {
        this.gameObject = gameObj;
      };
    }
  }
}

function abandonGungurk() {
  console.log("You decided to run away!");
  let newScene = window.open("../../conclusions/the_stone_escaped_alone.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}
