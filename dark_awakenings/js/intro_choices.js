import { punch, handaxe, dagger, longsword, grasp, drag } from "./weapons.js";
import { theStone, gungurk } from "./characters.js";
import { taintedRoot } from "./enemies.js";
import { distanceFromChasm } from "./gameProperties.js";

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
  distanceFromChasm,
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
  getDistanceForCharacter({ name }) {
    return gameObject.distanceFromChasm.find((char) => char.name === name);
  },
};

let distances = [];

function setDistance({ name }, feet) {
  return { name, feet };
}

function setInitialDistancesForTheCharacters() {
  distances.push(setDistance(theStone, 20));
  distances.push(setDistance(gungurk, 15));
  gameObject["distanceFromChasm"] = distances;
}

setInitialDistancesForTheCharacters();

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

let enemy = {};

function initGame() {
  enemy = gameObject.creatures.hostiles.taintedRoot;
}

initGame();

let olChoices = document.getElementById("choices");
let liOneTimeChoice = document.getElementById("one-time-choice");
let divFlavor = document.getElementsByClassName("flavor")[0];
let divFeedback = document.getElementById("feedback");
let newParagraph = document.createElement("p");
let displayParagraph = document.createElement("p");

window.optionOneWasClicked = optionOneWasClicked;
window.optionTwoWasClicked = optionTwoWasClicked;
window.optionThreeWasClicked = optionThreeWasClicked;

function optionOneWasClicked() {
  console.log("Option1 was clicked");

  let dice = 20;
  let stoneCheck = doStrengthCheck(theStone, dice);
  let rootCheck = doStrengthCheck(enemy, dice);

  console.log("The Stone: " + stoneCheck);
  console.log("Root: " + rootCheck);

  if (stoneCheck >= rootCheck) {
    // when The Stone escapes the grapple, the Tainted Root should die. Even thought the enemy is discarded immediately anyways as the scene changes

    let newScene = window.open("encounter1/1a_break/1a_break_success.html");
    newScene.onload = function () {
      this.gameObject = gameObject;
    };
  } else {
    // get distanceFromChasm for The Stone
    let theStoneDistance = gameObject.getDistanceForCharacter(theStone);
    theStoneDistance.feet -= 5;

    console.log(gameObject.distanceFromChasm);

    divFlavor.innerHTML = "";
    newParagraph.innerHTML = `${theStone.name} trashes and struggles, trying to break free from the vines's grasp, but as he does so, the vine tightens around him and pulls him 5 feet closer towards the chasm!`;
    divFlavor.insertBefore(newParagraph, divFlavor.lastChild);

    if (theStoneDistance.feet < 5) {
      console.log(`${theStone.name} fell`);

      // display message showing that you fell down
      displayParagraph.innerHTML = `${theStone.name} plummets into the chasm, falling into water as the ${enemy.name} drags him the remaining 5 feet over the edge.`;

      let fallDamage = Math.floor(Math.random() * 10 + 1);
      theStone.receiveDamage(fallDamage);

      displayParagraph.innerHTML += `<br>${theStone.name} receives ${fallDamage} of damage from the fall.`;

      if (theStone.isDead()) {
        // load dead scenario
      } else {
        // wait a couple of seconds
        setTimeout(() => {
          // load new scene
          let newScene = window.open("encounter2/stone_fell.html");
          newScene.onload = function () {
            this.gameObject = gameObject;
          };
        }, 6000);
        return;
      }
    } else {
      displayParagraph.textContent = `${theStone.name} is now ${theStoneDistance.feet} away from the edge of the chasm`;
    }

    divFeedback.insertBefore(
      displayParagraph,
      divFeedback.lastChild.nextSibling
    );
  }
}

function doStrengthCheck(character, faces) {
  return rollDie(faces) + character.escapeGrapple();
}

function rollDie(faces) {
  return Math.floor(Math.random() * faces);
}

function optionTwoWasClicked() {
  let newScene = window.open("encounter1/2a_look/2a_look.html");
  newScene.onload = function () {
    this.gameObject = gameObject;
  };
}

function optionThreeWasClicked() {
  let dice = 20;
  // clear all the flavor text
  divFlavor.innerHTML = "";

  let survivalCheck = doSurvivalCheck(theStone, dice);

  if (survivalCheck >= 15) {
    newParagraph.innerHTML =
      "These black roots are natural roots tainted by some foul magic, and they're mindless. They likely have a central control in some larger plantlike entity. Killing that creature is likely to render these roots harmless again.";
    console.log("YOU PASS YOUR WISDOM CHECK");
  } else {
    // you learn nothing useful and this option disappears
    newParagraph.innerHTML =
      "You are too confused by these events to think straight. The only thing you know for sure is that this vine is pulling you towards the chasm, and that you have to do something, and do it now!";
    console.log("YOU FAIL YOUR WISDOM CHECK");
  }

  divFlavor.insertBefore(newParagraph, divFlavor.lastChild);
  olChoices.removeChild(liOneTimeChoice);
}

function doSurvivalCheck(character, faces) {
  return rollDie(faces) + character.getWisdomMod();
}
