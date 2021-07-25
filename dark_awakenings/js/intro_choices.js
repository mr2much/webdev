import { punch, handaxe, dagger, longsword, grasp, drag } from "./weapons.js";
import { theStone, gungurk } from "./characters.js";
import { taintedRoot } from "./enemies.js";

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

const players = {
  theStone: theStone,
  gungurk: gungurk,
};

const hostiles = {
  taintedRoot: taintedRoot,
};

const creatures = { players: players, hostiles: hostiles };

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

window.optionOneWasClicked = optionOneWasClicked;
window.optionTwoWasClicked = optionTwoWasClicked;
window.optionThreeWasClicked = optionThreeWasClicked;

function optionOneWasClicked() {
  console.log("Option1 was clicked");
  let dice = 20;
  let stoneCheck = doStrengthCheck(theStone, dice);
  let rootCheck = doStrengthCheck(enemies[0], dice);

  console.log("The Stone: " + stoneCheck);
  console.log("Root: " + rootCheck);

  if (true) {
    var newScene = window.open("encounter1/1a_break/1a_break_success.html");
  } else {
    window.open("encounter1/1a_break/1a_break_fail.html");
  }

  //   if (stoneCheck >= rootCheck) {
  //     window.open("chapter1/encounter1 - choice1a.html");
  //   } else {
  //     window.open("chapter1/encounter1 - choice1b.html");
  //   }
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
    console.log("YOU FAIL WISDOM CHECK");
  }
}

function doSurvivalCheck(character, faces) {
  return rollDie(faces) + character.getWisdomMod();
}
