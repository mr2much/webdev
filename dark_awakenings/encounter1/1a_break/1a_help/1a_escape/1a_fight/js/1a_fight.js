let gameObj;
let amountOfEnemies = 0;
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
  amountOfEnemies = enemies.length;

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

  if (btnAttack !== null) {
    btnAttack.textContent = "Keep attacking!";
    btnAttack = null;
  }

  paragraphTaintedRootActions.innerHTML = "";
  paragraphTheStoneActions.innerHTML = "";
  paragraphGungurkActions.innerHTML = "";

  if (amountOfEnemies > 0) {
    if (taintedRoot.hp <= 0) {
      taintedRoot = enemies.shift();
      target = pickRandomTarget();

      if (enemies.length === 0) {
        console.log(
          `Enemies: ${enemies.length}, amountOfEnemies: ${amountOfEnemies}`
        );
      }

      if (amountOfEnemies > 1) {
        paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;
      } else {
        paragraph.innerHTML = `Weapons drawn, you engage the remaining ${taintedRoot.name} as it lashes at ${target.name}!`;
      }
    }

    if (taintedRoot.hp > 0) {
      let taintedRootDamage = gameObj.attack(taintedRoot, target);

      if (taintedRoot.weapon === dragWeapon) {
        distanceFromChasm -= 5;

        if (distanceFromChasm <= 0) {
          paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet towards the Chasm, dealing ${taintedRootDamage} points of damage.`;

          if (target === theStone) {
            console.log(`${target.name} fell`);
            paragraphTheStoneActions.innerHTML = `${theStone.name} plummets into the chasm, falling into water as the ${taintedRoot.name} drags you the the remaining 5 feet over the edge.`;

            let fallDamage = Math.floor(Math.random() * 10 + 1);
            target.receiveDamage(fallDamage);

            paragraphTheStoneActions.innerHTML += `<br>${theStone.name} receives ${fallDamage} of damage from the fall.`;

            if (target.hp === 0) {
              // load dead scenario
            } else {
              //   Must make a pause
              setTimeout(() => {
                if (allies.indexOf(gungurk) < 0) {
                  let newScene = window.open(
                    "/dark_awakenings/encounter2/gungurk_fell_first.html"
                  );
                  newScene.onload = function () {
                    this.gameObject = gameObj;
                  };
                } else {
                  //   and then load the second encounter
                  let newScene = window.open(
                    "/dark_awakenings/encounter2/stone_fell.html"
                  );
                  newScene.onload = function () {
                    this.gameObject = gameObj;
                  };
                }
              }, 10000);
              return;
            }
          } else {
            paragraphGungurkActions.innerHTML += ` ${target.name} squeals like a terrified pig, and he disappears into the chasm. He splashes down, followed by disconcerting silence. At least the root that dragged him into the chasm apparently died from the fall.`;

            let fallDamage = Math.floor(Math.random() * 10 + 1);

            paragraphGungurkActions.innerHTML += `<br>${target.name} received ${fallDamage} points of damage from the fall.`;
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

          // if you are more than 5 feet away from the chasm, and are not more than 15ft away from it
          if (distanceFromChasm <= 10) {
            distanceFromChasm += 5;
            paragraphTaintedRootActions.innerHTML += ` and he immediately walks 5 feet away from the threatening Chasm up ahead.`;
          }
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

      for (var i = 0; i < allies.length; i++) {
        let attacker = allies[i];

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

        console.log(`HP: ${taintedRoot.hp}`);

        if (taintedRoot.hp <= 0) {
          paragraphTaintedRootActions.innerHTML = `Enemy ${taintedRoot.name} was slain!`;
          amountOfEnemies--;
          // if the Tainted Root was grabbing someone, who has not already fallen down into the Chasm
          if (taintedRoot.hasTargetGrappled() && distanceFromChasm > 0) {
            paragraphTaintedRootActions.innerHTML += ` ${target.name} is no longer grappled.`;
          }

          distanceFromChasm += 5;

          if (allies.indexOf(gungurk) > 0) {
            if (paragraphGungurkActions.innerHTML === "") {
              paragraphGungurkActions.innerHTML = `${gungurk.name} steps 5 feet away from the Chasm!`;
            } else {
              paragraphGungurkActions.innerHTML += `<br>${gungurk.name} steps 5 feet away from the Chasm!`;
            }
          }

          paragraphTheStoneActions.innerHTML += `<br>${theStone.name} steps 5 feet away from the Chasm!`;

          break;
        }
      }
    }
  }

  // implement code for when all the enemies are slain, which might imply loading a new screen. Probably enemies_defeated.html or something
  if (amountOfEnemies === 0) {
    console.log("All enemies were slain!");
  }

  console.log(`Distance from the Chasm: ${distanceFromChasm}`);
}

function pickRandomTarget() {
  let numberOfAllies = allies.length;
  let randomIndex = Math.floor(Math.random() * numberOfAllies);

  console.log(`Random Number: ${randomIndex}`);

  return allies[randomIndex];
}

function optionTwoWasClicked() {
  console.log("You ran away!");
}
