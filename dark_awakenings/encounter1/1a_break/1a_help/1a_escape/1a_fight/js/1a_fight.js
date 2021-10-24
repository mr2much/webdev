import { CharGUI } from "../../../../../../js/components/char_gui.js";
import { ObserverHandler } from "../../../../../../js/observerhandler.js";
import { EntityContainer } from "../../../../../../js/EntityContainer.js";
import { BehaviorHandler } from "../../../../../../js/BehaviorHandler.js";

import { taintedRootBehaviorHandler } from "./behaviors/taintedRoot/index.js";
import { theStoneBehaviorHandler } from "./behaviors/theStone/index.js";
import { gungurkBehaviorHandler } from "./behaviors/gungurk/index.js";

let gameObj;
let gungurk = {};
let theStone = {};

let enemies = [];
let entities = new EntityContainer();

let allies = [];
let display = document.getElementById("feedback");

let btnAttack = document.getElementById("btn-attack");
let btnRun = document.querySelector("#btn-run");
let btnBreak = document.getElementById("break");
let btnStepAway = document.getElementById("step-away");

let theStoneGUI;
let gungurkGUI;

const hpObservers = new ObserverHandler();

const behaviorMap = new BehaviorHandler();

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  toggleButton(btnBreak);

  enemies = gameObj.enemies;

  gungurk = gameObj.creatures.players.gungurk;

  theStone = gameObj.creatures.players.theStone;

  allies.unshift(gungurk);
  allies.unshift(theStone);

  let enemyDisplay = document.createElement("div");
  enemyDisplay.classList.add("display");

  for (var i = 0; i < enemies.length; i++) {
    let taintedRoot = enemies[i];

    if (taintedRoot) {
      entities.add(taintedRoot);
      let enemyGUI = new CharGUI(taintedRoot);
      enemyDisplay.appendChild(enemyGUI);
      hpObservers.add(enemyGUI);

      display.insertAdjacentHTML(
        "beforeend",
        `<p id="${taintedRoot.id}${taintedRoot.uid}"></p>`
      );
      behaviorMap.addBehavior(taintedRoot, taintedRootBehaviorHandler);
      // behaviorMap.set(taintedRoot, taintedRootBehaviorHandler); // Sets the behavior for individual taintedRoot
    }
  }

  if (theStone) {
    theStoneGUI = new CharGUI(theStone);
    behaviorMap.addBehavior(theStone, theStoneBehaviorHandler);
    // behaviorMap.set(theStone, theStoneBehaviorHandler);
    entities.add(theStone);
  }

  if (gungurk) {
    gungurkGUI = new CharGUI(gungurk);
    behaviorMap.addBehavior(gungurk, gungurkBehaviorHandler);
    // behaviorMap.set(gungurk, gungurkBehaviorHandler);
    entities.add(gungurk);
  }

  hpObservers.add(theStoneGUI);
  hpObservers.add(gungurkGUI);

  // taintedRoot = enemies.shift();
  // taintedRoot = pickRandomEntityOfType("hostile");
  // target = pickRandomEntityOfType("ally");
  // target = pickRandomTarget();

  // paragraph.innerHTML += `<br><br>There are still ${amountOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;

  // display.insertAdjacentHTML("beforeend", `<p id="${taintedRoot.id}"></p>`);
  display.insertAdjacentHTML("beforeend", `<p id="${theStone.id}"></p>`);
  display.insertAdjacentHTML("beforeend", `<p id="${gungurk.id}"></p>`);

  let gui = document.createElement("div");
  gui.id = "gui";

  gui.appendChild(theStoneGUI);
  gui.appendChild(gungurkGUI);

  display.insertBefore(enemyDisplay, display.lastChild.nextSibling);
  display.insertBefore(gui, display.lastChild.nextSibling);

  btnAttack.addEventListener("click", executeAttack);
  btnRun.addEventListener("click", optionTwoWasClicked);
  btnBreak.addEventListener("click", optionThreeWasClicked);
  btnStepAway.addEventListener("click", optionFourWasClicked);
});

function toggleButton(button) {
  if (button) {
    button.disabled = !button.disabled;

    button.classList.toggle("noHover");
  }
}

function executeAttack() {
  let amountOfEnemies = entities.getCountOfType("hostile");

  if (btnAttack !== null) {
    btnAttack.textContent = "Keep attacking!";
    btnAttack = null;
  }

  // DONE: Add the different Tainted Roots in the behaviorMap using ${taintedRoot.name}${taintedRoot.uid} instead of "enemy"
  // behaviorMap.set("enemy", taintedRootBehaviorHandler);

  if (amountOfEnemies > 0) {
    behaviorMap.execute();

    let paragraph = document.querySelector("#narration");
    if (amountOfEnemies > 1) {
      paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left.`;
    } else {
      paragraph.innerHTML = `Weapons drawn, you engage the last remaining enemy!`;
    }
  }

  // implement code for when all the enemies are slain, which might imply loading a new screen. Probably enemies_defeated.html or something
  if (amountOfEnemies <= 0) {
    let newScene = window.open("you_are_victorious/you_are_victorious.html");

    newScene.onload = function () {
      this.gameObject = gameObj;
    };
  }
}

function optionTwoWasClicked() {
  console.log("You ran away!");
}

function optionThreeWasClicked() {
  let currState = theStone.state; // save current state
  theStone.state = "escape"; // Set the Stone's behavior to escape
  // theStoneBehaviorHandler(thestone);
  behaviorMap.run(theStone); // and immediately execute the behavior
  theStone.state = currState; // set The Stone's state to the previous one
}

function optionFourWasClicked() {
  console.log("You step 5 feet away from the chasm.");
}

export { gameObj, enemies, entities, hpObservers, behaviorMap, allies };
