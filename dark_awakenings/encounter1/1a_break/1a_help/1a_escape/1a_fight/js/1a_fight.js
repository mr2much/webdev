let gameObj;
let gungurk = {};
let theStone = {};
let taintedRoot = {};
let graspWeapon = {};
let dragWeapon = {};
let enemies = [];
let btnAttack = document.getElementById("btnAttack");
let paragraph = document.getElementById("narration");
let newParagraph = document.createElement("p");
let flavorText = document.getElementsByClassName("flavor")[0];
let distanceFromChasm = 15;
let allies = [];

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
});

function optionOneWasClicked() {
  console.log("Combat started!");
  newParagraph.innerHTML = "";
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
      if (!taintedRoot.hasTargetGrappled()) {
        taintedRoot.weapon = graspWeapon;
        taintedRoot.target = target;
        taintedRoot.targetGrappled = true;
      } else {
        taintedRoot.weapon = dragWeapon;
      }

      let damage = attack(taintedRoot, target);

      if (taintedRoot.weapon === dragWeapon) {
        distanceFromChasm -= 5;

        if (distanceFromChasm <= 0) {
          newParagraph.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet towards the Chasm.`;

          if (target === theStone) {
            console.log(`${target.name} fell`);
            //   Must make a pause
            //   and then load the second encounter
          } else {
            newParagraph.innerHTML += ` ${target.name} squeals like a terrified pig, and he disappears into the chasm. He splashes down, following by disconcerting silence. At least the root that dragged him into the chasm apparently died from the fall.`;

            gungurk.hp -= Math.floor(Math.random() * 10 + 1);
            taintedRoot.hp = 0;

            let index = allies.indexOf(target);
            allies.splice(index, 1);
          }
        } else {
          newParagraph.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet closer to the Chasm. ${target.name} is now ${distanceFromChasm} away from the edge!`;
        }

        // must contemplate a scenario where both allies die. If the number of allies reaches zero, must open the Game Over screen

        flavorText.insertBefore(newParagraph, flavorText.lastChild.nextSibling);
      }

      allies.forEach((attacker) => {
        attack(attacker, taintedRoot);
      });
    } else {
      flavorText.removeChild(newParagraph);
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
  let numberOfAllies = allies.length;
  let randomIndex = Math.floor(Math.random() * numberOfAllies);

  console.log(`Random Number: ${randomIndex}`);

  return allies[randomIndex];
}

function attack(attacker, target) {
  console.log(
    `${attacker.name} is attacking ${target.name} with ${attacker.weapon.name}`
  );
  let damage = attacker.attack(target);
  //   let damage = getTotalDamage(attacker);
  target.hp = target.hp - damage;
  console.log(`${target.name} received ${damage} points of damage`);
  console.log(`${target.hp}`);

  return damage;
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
