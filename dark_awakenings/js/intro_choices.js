import { punch, handaxe, dagger, longsword, grasp, drag } from "./weapons.js";
import { theStone, gungurk } from "./characters.js";
import { taintedRoot } from "./enemies.js";

//TODO: move this to weapons.js
const weapons = {
  punch: punch,
  handaxe: handaxe,
  dagger: dagger,
  longsword: longsword,
  grasp: grasp,
  drag: drag,
};

//TODO: If I implement a level up system. Proficiency Bonus is calculated as:
// pb = (Level / 4) + 1; rounded up

//TODO: move this to characters.js
const players = {
  theStone: theStone,
  gungurk: gungurk,
};

//TODO: move this to enemies.js
const hostiles = {
  taintedRoot: taintedRoot,
};

const creatures = { players: players, hostiles: hostiles };

//TODO: move this to its own separate file, possibly game.js
const gameObject = {
  weapons: weapons,
  creatures: creatures,
  party: [],
  enemies: [],
  attack(attacker, target) {
    console.log(
      `${attacker.name} is attacking ${target.name} with ${attacker.weapon.name}`
    );
    if (this.attackHits(attacker, target)) {
      let damage = attacker.attack(target);
      target.receiveDamage(damage);
      console.log(`${target.name} received ${damage} points of damage!`);
      console.log(`${target.hp}`);

      return damage;
    }

    return 0;
  },

  attackHits(attacker, target) {
    if (attacker.weapon.alwaysHit) {
      return true;
    }

    let attackRoll = attacker.rollAttack();

    return target.attackHits(attackRoll);
  },

  getTotalDamage(attacker) {
    let totalDamage = Math.floor(
      Math.random() * attacker.weapon.damage +
        1 +
        Math.max(attacker.strengthMod, attacker.dexterityMod)
    );

    return totalDamage;
  },
};

console.log(gameObject);

let enemiesCount = 6;

(function () {
  gameObject.party.push(Object.create(gameObject.creatures.players.theStone));
  gameObject.party.push(Object.create(gameObject.creatures.players.gungurk));
})();

(function () {
  for (let i = 0; i < enemiesCount; i++) {
    gameObject.enemies.push(
      Object.create(gameObject.creatures.hostiles.taintedRoot)
    );
  }
})();

let olChoices = document.getElementById("choices");
let liOneTimeChoice = document.getElementById("one-time-choice");
let divFlavor = document.getElementsByClassName("flavor")[0];
let newParagraph = document.createElement("p");

window.optionOneWasClicked = optionOneWasClicked;
window.optionTwoWasClicked = optionTwoWasClicked;
window.optionThreeWasClicked = optionThreeWasClicked;

function optionOneWasClicked() {
  console.log("Option1 was clicked");
  let taintedRoot = gameObject.enemies.shift();
  let dice = 20;
  let stoneCheck = doStrengthCheck(theStone, dice);
  let rootCheck = doStrengthCheck(taintedRoot, dice);

  console.log("The Stone: " + stoneCheck);
  console.log("Root: " + rootCheck);

  if (true) {
    let newScene = window.open("encounter1/1a_break/1a_break_success.html");

    newScene.onload = function () {
      this.gameObject = gameObject;
    };
  } else {
    let newScene = window.open("encounter1/1a_break/1a_break_fail.html");

    newScene.onload = function () {
      this.gameObject = gameObject;
    };
  }
}

function doStrengthCheck(character, faces) {
  return rollDie(faces) + character.escapeGrapple();
}

function rollDie(faces) {
  return Math.floor(Math.random() * faces);
}

function optionTwoWasClicked() {
  let newScene = window.open(
    "/dark_awakenings/encounter1/2a_look/2a_look.html"
  );
  newScene.onload = function () {
    this.gameObject = gameObject;
  };
}

function optionThreeWasClicked() {
  let dice = 20;
  let survivalCheck = doSurvivalCheck(theStone, dice);
  if (survivalCheck >= 15) {
    console.log("YOU PASS WISDOM CHECK");
  } else {
    // clear all the flavor text
    divFlavor.innerHTML = "";
    // you learn nothing useful and this option disappears
    newParagraph.innerHTML =
      "You are too confused by these events to think straight. The only thing you know for sure is that this vine is pulling you towards the chasm, and that you have to do something, and do it now!";
    divFlavor.insertBefore(newParagraph, divFlavor.lastChild);
    console.log("You learn nothing useful");
    olChoices.removeChild(liOneTimeChoice);
  }
}

function doSurvivalCheck(character, faces) {
  return rollDie(faces) + character.getWisdomMod();
}
