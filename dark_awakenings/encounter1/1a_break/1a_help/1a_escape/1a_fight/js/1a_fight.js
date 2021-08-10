let gameObj;
let amountOfEnemies = 0;
let gungurk = {};
let theStone = {};
let taintedRoot = {};
let graspWeapon = {};
let dragWeapon = {};
let enemies = [];
let paragraph = document.getElementById("narration");
let flavorText = document.getElementsByClassName("flavor")[0];
let distanceFromChasm = 15;
let allies = [];
let display = document.getElementById("feedback");
let paragraphTaintedRootActions = document.createElement("p");
let paragraphTheStoneActions = document.createElement("p");
let paragraphGungurkActions = document.createElement("p");

let btnAttack = document.getElementById("btnAttack");
let btnBreak = document.getElementById("break");
let btnSideStep = document.getElementById("side-step");

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  disableBreakButton();
  // btnBreak.disabled = true;
  // btnBreak.classList.add("noHover");

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

  taintedRoot = enemies.shift();
  target = pickRandomTarget();

  paragraph.innerHTML += `<br><br>There are still ${amountOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;
  // taintedRoot.hp = 0;

  display.insertBefore(
    paragraphTaintedRootActions,
    display.lastChild.nextSibling
  );

  display.insertBefore(paragraphTheStoneActions, display.lastChild.nextSibling);
  display.insertBefore(paragraphGungurkActions, display.lastChild.nextSibling);
});

function disableBreakButton() {
  if (!btnBreak.disabled) {
    btnBreak.disabled = true;
  }

  if (!btnBreak.classList.contains("noHover")) {
    btnBreak.classList.add("noHover");
  }
}

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
    if (taintedRoot.isDead()) {
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
        // when the weapon is dragWeapon, the attack always hits, so the Tainted Root always deals damage with it
        // TODO: We are passing the taintedRootDamage temporarily, since the damage is being dealt when we call gameObj.attack(), to avoid dealing damage to the target twice
        // have to remove the call to the attack function from outside this if, and call it in pullTargetCloserToTheChasm() instead
        // distanceFromChasm -= 5;
        pullTargetCloserToTheChasm(taintedRoot, target, taintedRootDamage);

        if (distanceFromChasm <= 0) {
          paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet towards the Chasm, dealing ${taintedRootDamage} points of damage.`;

          // if The Stone falls, I have to disable all buttons for the options

          console.log(`Target: ${target.name} fell`);
          if (target === theStone) {
            console.log(`${target.name} fell`);
            paragraphTheStoneActions.innerHTML = `${theStone.name} plummets into the chasm, falling into water as the ${taintedRoot.name} drags you the the remaining 5 feet over the edge.`;

            let fallDamage = Math.floor(Math.random() * 10 + 1);
            target.receiveDamage(fallDamage);

            paragraphTheStoneActions.innerHTML += `<br>${theStone.name} receives ${fallDamage} of damage from the fall.`;

            if (target.hp <= 0) {
              // load dead scenario
            } else {
              //   Must make a pause
              setTimeout(() => {
                if (allies.indexOf(gungurk) < 0) {
                  let newScene = window.open(
                    "../../../../../encounter2/gungurk_fell_first.html"
                  );
                  newScene.onload = function () {
                    this.gameObject = gameObj;
                  };
                } else {
                  //   and then load the second encounter
                  let newScene = window.open(
                    "../../../../../encounter2/stone_fell.html"
                  );

                  newScene.onload = function () {
                    this.gameObject = gameObj;
                  };
                }
              }, 6000);
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
        }
        //  else {
        //   paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} drags ${target.name} 5 feet closer to the Chasm, dealing ${taintedRootDamage} points of damage. ${target.name} is now ${distanceFromChasm} away from the edge!`;
        // }

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
          paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} grabs ${target.name}, dealing ${taintedRootDamage} points of damage with its vines! ${target.name} is now grabbed!`;

          // if the attack connects, then the target is grabbed, and the tainted root will start dragging it towards the chasm
          if (!taintedRoot.hasTargetGrappled()) {
            taintedRoot.weapon = dragWeapon;
            taintedRoot.target = target;
            taintedRoot.targetGrappled = true;

            enableBreakButton();
            // btnBreak.disabled = false;
            // btnBreak.classList.remove("noHover");
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

        if (taintedRoot.isDead()) {
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
    let newScene = window.open("you_are_victorious/you_are_victorious.html");

    newScene.onload = function () {
      this.gameObject = gameObj;
    };
  }

  console.log(`Distance from the Chasm: ${distanceFromChasm}`);
}

function pullTargetCloserToTheChasm(attacker, target, damage) {
  // TODO: roll the drag damage in here instead
  // let taintedRootDamage = gameObj.attack(attacker, target);

  distanceFromChasm -= 5;
  paragraphTaintedRootActions.innerHTML = `The enemy ${attacker.name} drags ${target.name} 5 feet closer to the Chasm, dealing ${damage} points of damage. ${target.name} is now ${distanceFromChasm} away from the edge!`;

  console.log(
    `Enemy ${attacker.name} pulls ${attacker.target.name} closer to the chasm`
  );
}

function enableBreakButton() {
  if (btnBreak.disabled) {
    btnBreak.disabled = false;
  }

  if (btnBreak.classList.contains("noHover")) {
    btnBreak.classList.remove("noHover");
  }
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

function optionThreeWasClicked() {
  console.log("You attempt to break free from the vine");
  attemptToEscapeGrapple(taintedRoot.target);
}

function attemptToEscapeGrapple(target) {
  console.log(
    `${target.name} is attempting to break free from the ${taintedRoot.name}'s grasp!`
  );

  const escapeCheck = grappleContest(target);
  const contestedCheck = grappleContest(taintedRoot);

  console.log(`${target.name}'s attempt is: ${escapeCheck}`);
  console.log(`${taintedRoot.name}'s attempt is: ${contestedCheck}`);

  if (escapeCheck >= contestedCheck) {
    console.log(`${target.name} broke free!`);
    if (target === theStone) {
      console.log(`Killing the vine!`);
    } else {
      console.log(`Immediately stepping 5ft away from the chasm!`);
    }
    disableBreakButton();
  } else {
    console.log(`${target.name} failed to break free from the vine`);
    // TODO: Another reason to roll the drag damage in the function
    pullTargetCloserToTheChasm(taintedRoot, target, 10);
  }
}

function grappleContest(contestant) {
  // check contestant's higher stat between Dexterity or Strength, or if it has proficiency in athletics
  let abilityCheck = 0;
  if (isStrengthHigherThanDexterity(contestant) || contestant.athletics) {
    abilityCheck = getAthletics(contestant);
  } else {
    abilityCheck = getAcrobatics(contestant);
  }

  // rolls a d20 and adds the ability check
  return Math.floor(Math.random() * 20 + 1) + abilityCheck;
}

function isStrengthHigherThanDexterity(character) {
  return (
    Math.max(character.strengthMod, character.dexterityMod) ===
    character.strengthMod
  );
}

function getAthletics(character) {
  // if character has proficiency in athletics
  if (character.athletics) {
    return character.strengthMod + character.proficiencyBonus;
  }

  return character.strengthMod;
}

function getAcrobatics(character) {
  // if character has proficiency in acrobatics
  if (character.acrobatics) {
    return character.dexterityMod + character.proficiencyBonus;
  }

  return character.proficiencyBonus;
}

function optionFourWasClicked() {
  console.log("You step 5 feet away from the chasm.");
}
