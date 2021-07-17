let gameObj;
let gungurk = {};
let theStone = {};
let taintedRoot = {};
let graspWeapon = {};
let dragWeapon = {};
let enemies = [];
let btnAttack = document.getElementById("btnAttack");
let paragraph = document.getElementById("narration");
let flavorText = document.getElementsByClassName("flavor")[0];
let distanceFromChasm = 15;
let allies = [];
let display = document.getElementById("feedback");
let paragraphTaintedRootActions = document.createElement("p");
let paragraphTheStoneActions = document.createElement("p");
let paragraphGungurkActions = document.createElement("p");

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  enemies = gameObj.enemies;

  graspWeapon = gameObj.weapons.grasp;
  dragWeapon = gameObj.weapons.drag;

  gungurk = gameObj.creatures.players.gungurk;
  console.log(`${gungurk.name} ready to fight with ${gungurk.weapon.name}!`);

  theStone = gameObj.creatures.players.theStone;
  console.log(`${theStone.name} ready to fight with ${theStone.weapon.name}!`);

  allies.unshift(gungurk);
  allies.unshift(theStone);
  taintedRoot.hp = 0;

  display.insertBefore(
    paragraphTaintedRootActions,
    display.lastChild.nextSibling
  );
  display.insertBefore(paragraphTheStoneActions, display.lastChild.nextSibling);
  display.insertBefore(paragraphGungurkActions, display.lastChild.nextSibling);
});

function optionOneWasClicked() {
  console.log("Combat started!");

  paragraphTaintedRootActions.innerHTML = "";
  paragraphTheStoneActions.innerHTML = "";
  paragraphGungurkActions.innerHTML = "";

  if (enemies.length > 0) {
    if (taintedRoot.hp <= 0) {
      let amounOfEnemies = enemies.length;
      taintedRoot = enemies.shift();
      target = pickRandomTarget();

      if (amounOfEnemies > 1) {
        paragraph.innerHTML = `There are still ${amounOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;
      } else {
        paragraph.innerHTML = `Weapons drawn, you both engage the remaining ${taintedRoot.name} as it lashes at ${target.name}!`;
      }
    }

    if (taintedRoot.hp > 0) {
      //   if (!taintedRoot.hasTargetGrappled()) {
      //     taintedRoot.weapon = graspWeapon;
      //     taintedRoot.target = target;
      //     taintedRoot.targetGrappled = true;
      //   } else {
      //     taintedRoot.weapon = dragWeapon;
      //   }

      let taintedRootDamage = gameObj.attack(taintedRoot, target);

      if (taintedRoot.weapon === dragWeapon) {
        distanceFromChasm -= 5;

        if (distanceFromChasm <= 0) {
          paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet towards the Chasm, dealing ${taintedRootDamage} points of damage.`;

          if (target === theStone) {
            console.log(`${target.name} fell`);
            //   Must make a pause
            //   and then load the second encounter
          } else {
            paragraphTaintedRootActions.innerHTML += ` ${target.name} squeals like a terrified pig, and he disappears into the chasm. He splashes down, following by disconcerting silence. At least the root that dragged him into the chasm apparently died from the fall.`;

            let fallDamage = Math.floor(Math.random() * 10 + 1);

            paragraphGungurkActions.innerHTML = `${target.name} received ${fallDamage} points of damage from the fall.`;
            target.receiveDamage(fallDamage);

            // Confirming that both target and gungurk are pointing to the same Object
            // console.log(`${target.name}: ${target.getCurrentHP()} HP`);
            // console.log(`${gungurk.name}: ${gungurk.getCurrentHP()} HP`);

            taintedRoot.hp = 0; // The fall kills the taintedRoot

            let index = allies.indexOf(target);
            allies.splice(index, 1);
          }
        } else {
          paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet closer to the Chasm, dealing ${taintedRootDamage} points of damage. ${target.name} is now ${distanceFromChasm} away from the edge!`;
        }

        // must contemplate a scenario where both allies die. If the number of allies reaches zero, must open the Game Over screen
      } else {
        // if we got here, then the Tainted Root is attacking with its grasp attack and not its drag attack
        if (taintedRootDamage === 0) {
          // if the grasping attack doesn't connect, then the target is not grabbed
          paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name}'s attack failed to hit target ${target.name}`;
        } else {
          paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} grabs ${target.name}, dealing ${taintedRootDamage} points of damage with its vines!`;

          // if the attack connects, then the target is grabbed, and the tainted root will start dragging it towards the chasm
          if (!taintedRoot.hasTargetGrappled()) {
            taintedRoot.weapon = dragWeapon;
            taintedRoot.target = target;
            taintedRoot.targetGrappled = true;
          }
        }
      }

      allies.forEach((attacker) => {
        let damageDealt = gameObj.attack(attacker, taintedRoot);

        if (attacker === theStone) {
          if (damageDealt === 0) {
            paragraphTheStoneActions.innerHTML = `${attacker.name}'s attack failed to hit target ${taintedRoot.name}`;
          } else {
            paragraphTheStoneActions.innerHTML = `${attacker.name} dealt ${damageDealt} points of damage to ${taintedRoot.name}`;
          }
        } else {
          if (damageDealt === 0) {
            paragraphGungurkActions.innerHTML = `${attacker.name}'s attack failed to hit target ${taintedRoot.name}`;
          } else {
            paragraphGungurkActions.innerHTML = `${attacker.name} dealt ${damageDealt} points of damage to ${taintedRoot.name}`;
          }
        }
      });
    }
  }
}

function pickRandomTarget() {
  let numberOfAllies = allies.length;
  let randomIndex = Math.floor(Math.random() * numberOfAllies);

  console.log(`Random Number: ${randomIndex}`);

  return allies[randomIndex];
}

// function attack(attacker, target) {
//   console.log(
//     `${attacker.name} is attacking ${target.name} with ${attacker.weapon.name}`
//   );
//   let damage = attacker.attack(target);
//   //   let damage = getTotalDamage(attacker);
//   target.hp = target.hp - damage;
//   console.log(`${target.name} received ${damage} points of damage`);
//   console.log(`${target.hp}`);

//   return damage;
// }

// function getTotalDamage(attacker) {
//   let totalDamage = Math.floor(
//     Math.random() * attacker.weapon.damage +
//       1 +
//       Math.max(attacker.strengthMod, attacker.dexterityMod)
//   );

//   return totalDamage;
// }

function optionTwoWasClicked() {
  console.log("You ran away!");
}
