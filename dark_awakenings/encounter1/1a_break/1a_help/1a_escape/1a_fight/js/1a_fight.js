let gameObj;
let gungurk = {};
let theStone = {};
let taintedRoot = {};
let graspWeapon = {};
let dragWeapon = {};
let enemies = [];
let paragraph = document.getElementById("narration");
let newParagraph = document.createElement("p");
let flavorText = document.getElementsByClassName("flavor")[0];
let distanceFromChasm = 15;

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  enemies = gameObj.enemies;

  graspWeapon = gameObj.weapons.grasp;
  dragWeapon = gameObj.weapons.drag;

  gungurk = gameObj.creatures.players.gungurk;
  console.log(`${gungurk.name} ready to fight with ${gungurk.weapon.name}!`);

  theStone = gameObj.creatures.players.theStone;
  console.log(`${theStone.name} ready to fight with ${theStone.weapon.name}!`);
  taintedRoot.hp = 0;
});

function optionOneWasClicked() {
  console.log("Combat started!");

  if (enemies.length > 0) {
    if (taintedRoot.hp <= 0) {
      taintedRoot = enemies.shift();
      target = pickRandomTarget();

      if (enemies.length > 1) {
        paragraph.innerHTML = `One of the ${taintedRoot.name}s lashes at ${target.name}!`;
      } else {
        paragraph.innerHTML = `The remaining ${taintedRoot.name} lashes at ${target.name}!`;
      }
    }

    if (!taintedRoot.hasTargetGrappled()) {
      taintedRoot.weapon = graspWeapon;
      taintedRoot.target = target;
      taintedRoot.targetGrappled = true;
    } else {
      taintedRoot.weapon = dragWeapon;
    }

    attack(taintedRoot, target);

    if (taintedRoot.weapon === dragWeapon) {
      distanceFromChasm -= 5;
      newParagraph.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet closer to the Chasm. ${target.name} is now ${distanceFromChasm} away from the edge!`;
      flavorText.insertBefore(newParagraph, flavorText.lastChild.nextSibling);
    }
  }
  //   if (taintedRoot.hp <= 0) {
  //     let enemies = gameObj.enemies;
  //     if (enemies.length > 1) {
  //       paragraph.innerHTML = `One of the ${taintedRoot.name}s lashes at you, and you immediately attack it!`;
  //     } else {
  //       paragraph.innerHTML = `The remaining ${taintedRoot.name} lashes at you, and you immediately attack it!`;
  //     }

  //     if (enemies.length > 0) {
  //       taintedRoot = enemies.shift();
  //       target = pickRandomTarget();

  //       if (!taintedRoot.hasTargetGrappled()) {
  //         taintedRoot.weapon = graspWeapon;
  //         taintedRoot.target = target;
  //         taintedRoot.targetGrappled = true;
  //       } else {
  //         taintedRoot.weapon = dragWeapon;
  //       }

  //       console.log(
  //         `Enemy ${taintedRoot.name} attacks ${target.name} with ${taintedRoot.weapon.name}`
  //       );

  //       taintedRoot.attack(target);
  //     }
  //   } else {
  //     if (taintedRoot !== null && taintedRoot.hp > 0) {
  //       paragraph.innerHTML =
  //         "Despite your best efforts, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Hurry up, precious! Hurry!'";

  //       attack(theStone, taintedRoot);

  //       if (taintedRoot.hp <= 0) {
  //         console.log(`Enemy ${taintedRoot.name} was slain!`);
  //       }
  //     }
  //   }
}

function pickRandomTarget() {
  let randomNumber = Math.floor(Math.random() * 2 + 1);

  console.log(`Random Number: ${randomNumber}`);

  if (randomNumber === 1) {
    return theStone;
  }

  return gungurk;
}

function attack(attacker, target) {
  console.log(`${attacker.name} is attacking with ${attacker.weapon.name}`);
  let damage = attacker.attack(target);
  //   let damage = getTotalDamage(attacker);
  target.hp = target.hp - damage;
  console.log(`Enemy: ${target.name} received ${damage} points of damage`);
  console.log(`${target.hp}`);
}

function getTotalDamage(attacker) {
  let totalDamage = Math.floor(
    Math.random() * attacker.weapon.damage +
      1 +
      Math.max(attacker.strengthMod, attacker.dexterityMod)
  );

  return totalDamage;
}

function optionTwoWasClicked() {
  console.log("You ran away!");
}
