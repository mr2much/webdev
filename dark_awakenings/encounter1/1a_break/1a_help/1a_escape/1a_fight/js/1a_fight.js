import { CharGUI } from "../../../../../../js/components/char_gui.js";

import { taintedRootBehaviorHandler } from "./behaviors/taintedRoot/index.js";
import { theStoneBehaviorHandler } from "./behaviors/theStone/index.js";
import { gungurkBehaviorHandler } from "./behaviors/gungurk/index.js";

let gameObj;
let amountOfEnemies = 0;
let gungurk = {};
let theStone = {};

let enemies = [];
let entities = [];

let allies = [];
let display = document.getElementById("feedback");

let btnAttack = document.getElementById("btn-attack");
let btnRun = document.querySelector("#btn-run");
let btnBreak = document.getElementById("break");
let btnStepAway = document.getElementById("step-away");

let theStoneGUI;
let gungurkGUI;

let hpObservers = [];

const behaviorMap = new Map();

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  toggleButton(btnBreak);

  enemies = gameObj.enemies;
  amountOfEnemies = enemies.length;

  gungurk = gameObj.creatures.players.gungurk;

  theStone = gameObj.creatures.players.theStone;

  allies.unshift(gungurk);
  allies.unshift(theStone);

  let enemyDisplay = document.createElement("div");
  enemyDisplay.classList.add("display");

  for (var i = 0; i < enemies.length; i++) {
    let taintedRoot = enemies[i];

    if (taintedRoot) {
      let enemyGUI = new CharGUI(taintedRoot);
      enemyDisplay.appendChild(enemyGUI);
      hpObservers.push(enemyGUI);

      display.insertAdjacentHTML(
        "beforeend",
        `<p id="${taintedRoot.id}${taintedRoot.uid}"></p>`
      );
      behaviorMap.set(taintedRoot, taintedRootBehaviorHandler); // Sets the behavior for individual taintedRoot
    }
  }

  entities.push(...enemies);

  if (theStone) {
    theStoneGUI = new CharGUI(theStone);
    behaviorMap.set(theStone, theStoneBehaviorHandler);
    entities.push(theStone);
  }

  if (gungurk) {
    gungurkGUI = new CharGUI(gungurk);
    behaviorMap.set(gungurk, gungurkBehaviorHandler);
    entities.push(gungurk);
  }

  hpObservers.push(theStoneGUI, gungurkGUI);

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
  if (btnAttack !== null) {
    btnAttack.textContent = "Keep attacking!";
    btnAttack = null;
  }

  // DONE: Add the different Tainted Roots in the behaviorMap using ${taintedRoot.name}${taintedRoot.uid} instead of "enemy"
  // behaviorMap.set("enemy", taintedRootBehaviorHandler);

  if (amountOfEnemies > 0) {
    // handle enemiy's turn
    // enemyBehavior();
    for (const entity of behaviorMap.keys()) {
      // The value stored in the map is a function, so we execute it by getting it from the map and putting the () in front of it
      if (entity.name) {
        console.log(`Executing behavior for: ${entity.name}${entity.uid}`);
      } else {
        console.log(`Executing behavior for: ${entity}`);
      }

      let paragraph = document.querySelector("#narration");

      if (amountOfEnemies > 1) {
        paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left.`;
      } else {
        paragraph.innerHTML = `Weapons drawn, you engage the last remaining enemy!`;
      }

      behaviorMap.get(entity)(entity);
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

function enemyDied(enemy) {
  enemy.state = "dead";
  let target = enemy.target;
  let paragraphTaintedRootActions = document.querySelector(
    `#${enemy.id}${enemy.uid}`
  );

  paragraphTaintedRootActions.innerHTML = `Enemy ${enemy.name}${enemy.uid} was slain!`;
  amountOfEnemies--;

  // if the Tainted Root was grabbing someone, who has not already fallen down into the Chasm
  if (target) {
    let condition = target.condition;

    switch (condition) {
      case "grappled":
        paragraphTaintedRootActions.innerHTML += ` ${target.name} is no longer grappled.`;
        target.condition = "healthy";

        toggleButton(btnBreak); // This should turn the break button off
        break;

      default:
        break;
    }
  }

  // let paragraph = document.querySelector("#narration");

  // if (amountOfEnemies > 1) {
  //   paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left.`;
  // } else {
  //   paragraph.innerHTML = `Weapons drawn, you engage the last remaining enemy, ${taintedRoot.name}${taintedRoot.uid}`;
  // }
}

function notifyObservers(target) {
  for (let i = 0; i < hpObservers.length; i++) {
    let character = hpObservers[i]._char;

    if (character.id === target.id) {
      if (character.uid === target.uid) {
        character.hp = target.hp;
      }
    }
  }
}

function optionTwoWasClicked() {
  console.log("You ran away!");
}

function optionThreeWasClicked() {
  let currState = theStone.state; // save current state
  theStone.state = "escape"; // Set the Stone's behavior to escape
  theStoneBehaviorHandler(theStone); // and immediately execute the behavior
  theStone.state = currState; // set The Stone's state to the previous one
}

function optionFourWasClicked() {
  console.log("You step 5 feet away from the chasm.");
}

export {
  gameObj,
  enemies,
  entities,
  notifyObservers,
  enemyDied,
  behaviorMap,
  allies,
};
