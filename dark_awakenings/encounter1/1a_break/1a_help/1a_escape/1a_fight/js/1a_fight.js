import { CharGUI } from "../../../../../../js/components/char_gui.js";

let gameObj;
let amountOfEnemies = 0;
let gungurk = {};
let theStone = {};
let taintedRoot = {};
let graspWeapon = {};
let dragWeapon = {};
let enemies = [];
let entities = [];
// let distance = {};
let paragraph = document.getElementById("narration");
let flavorText = document.getElementsByClassName("flavor")[0];
let allies = [];
let display = document.getElementById("feedback");

let btnAttack = document.getElementById("btn-attack");
let btnRun = document.querySelector("#btn-run");
let btnBreak = document.getElementById("break");
let btnStepAway = document.getElementById("step-away");

let theStoneGUI;
let gungurkGUI;
let taintedRootGUI;

let target;

let hpObservers = [];

const behaviorMap = new Map();

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  toggleButton(btnBreak);

  enemies = gameObj.enemies;
  amountOfEnemies = enemies.length;

  graspWeapon = gameObj.weapons.grasp;
  dragWeapon = gameObj.weapons.drag;

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
    }
  }

  entities.push(...enemies);

  behaviorMap.set("enemy", enemyBehavior);

  taintedRoot = enemies.shift();
  target = pickRandomTarget();

  if (theStone) {
    theStoneGUI = new CharGUI(theStone);
    behaviorMap.set(theStone, theStoneBehavior);
    entities.push(theStone);
  }

  if (gungurk) {
    gungurkGUI = new CharGUI(gungurk);
    behaviorMap.set(gungurk, gungurkBehavior);
    entities.push(gungurk);
  }

  hpObservers.push(theStoneGUI, gungurkGUI);

  paragraph.innerHTML += `<br><br>There are still ${amountOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;

  display.insertAdjacentHTML("beforeend", `<p id="${taintedRoot.id}"></p>`);
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

function pickRandomTarget() {
  console.log("pickRandomTarget()");
  let numberOfAllies = allies.length;
  let randomIndex = Math.floor(Math.random() * numberOfAllies);

  console.log(`Random Number: ${randomIndex}`);

  return allies[randomIndex];
}

function toggleButton(button) {
  button.disabled = !button.disabled;

  button.classList.toggle("noHover");
}

function enemyBehavior() {
  let taintedRootDamage;

  let taintedRoot = pickRandomEnemy();

  if (taintedRoot) {
  }

  let state = taintedRoot.state;

  switch (state) {
    case "dead":
      console.log("This Tainted Root is dead");
      // if dead, pick a new enemy
      break;
    case "idle":
      // look for a target
      do {
        let numberOfEntities = entities.length;
        let randomIndex = Math.floor(Math.random() * numberOfEntities);
        target = entities[randomIndex];
      } while (target !== "ally");

      // Should display message indicating which character the Tainted Root is attacking

      // target = pickRandomTarget();
      taintedRoot.state = "attack";

      break;
    case "attack":
      taintedRootDamage = gameObj.attack(taintedRoot, target);

      // if the attack hits:
      if (taintedRootDamage > 0) {
        // show message showing the damage caused by the attack done to the target
        // show message showing that the target is now grappled
        paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} lashes at ${target.name}, dealing ${taintedRootDamage} points of damage with its vines! ${target.name} is now grabbed as the Tainted Root wraps its vines around him!`;

        // change condition of target to "grappled"
        taintedRoot.target = target;
        target.condition = "grappled";

        // change state of Tainted Root to drag
        taintedRoot.state = "drag";

        // change weapon of choice to drag
        taintedRoot.weapon = dragWeapon;

        // // if the attack connects, then the target is grabbed, and the tainted root will start dragging it towards the chasm
        // if (!taintedRoot.hasTargetGrappled()) {
        //   taintedRoot.weapon = dragWeapon;
        //   taintedRoot.target = target;
        //   taintedRoot.targetGrappled = true;

        //   // toggleButton(btnBreak);
        // }

        // Turn on button to allow The Stone to attempt to break free of the grapple
        toggleButton(btnBreak);

        // Notify the target of the change in their HP
        notifyObservers(target);
      } else {
        // if attack misses show message indicating the attack failed to hit the target
        paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name}'s attack failed to hit target ${target.name}`;

        // if you are more than 5 feet away from the chasm, and are not more than 15ft away from it

        // This check should be in the ally's behaviors
        if (distance.feet <= 10) {
          distance.feet += 5;
          console.log(`${distance.name} is now ${distance.feet}`);
          console.log(`${gameObj.distanceFromChasm[`${target.name}`]}`);
          paragraphTaintedRootActions.innerHTML += ` and he immediately walks 5 feet away from the threatening Chasm up ahead.`;
        }
      }

      break;
    case "drag":
      // Keep dragging the target until you bring it down the chasm, or kill it, if you kill it go idle, if you die, set state to dead

      // when the weapon is dragWeapon, the attack always hits, so the Tainted Root always deals damage with it
      taintedRootDamage = gameObj.attack(taintedRoot, target);
      let distance = gameObj.getDistanceForCharacter(target);

      distance = pullTargetCloserToTheChasm(
        taintedRoot,
        target,
        taintedRootDamage
      );

      notifyObservers(target);

      if (target.hp <= 0) {
        // target died
        target.state = "dead";

        return;
      }

      if (distance.feet <= 0) {
        target.state = "falling";
        taintedRoot.state = "dead";
      }

      break;
    default:
      break;
  }

  // // If the tainted root is alive, it will have these goals:
  // if (isAlive(taintedRoot)) {
  //   // 1. If it doesn't have a target, pick one.
  //   // 2. If it has a target, grapple it.
  //   // 3. If the target is not grappled, attack it until it is grappled.
  //   // 4. If target is grappled, drag it until it falls down the chasm.
  //   // 5. The Tainted Root will die from the fall as it drags the target down the Chasm.

  //   let taintedRootDamage = gameObj.attack(taintedRoot, target);
  //   let distance = gameObj.getDistanceForCharacter(target);

  //   console.log(`Attacking: ${target.name}`);

  //   if (taintedRoot.weapon === dragWeapon) {
  //     // TODO: We are passing the taintedRootDamage temporarily, since the damage is being dealt when we call gameObj.attack(), to avoid dealing damage to the target twice
  //     // have to remove the call to the attack function from outside this if, and call it in pullTargetCloserToTheChasm() instead

  //     distance = pullTargetCloserToTheChasm(
  //       taintedRoot,
  //       target,
  //       taintedRootDamage
  //     );

  //     notifyObservers(target);

  //     // let distance = gameObj.getDistanceForCharacter(target);

  //     // let actionParagraph = document.querySelector(`#${target.id}`);
  //     // actionParagraph.innerHTML += `The enemy ${taintedRoot.name} drags ${target.name} 5 feet towards the Chasm, dealing ${taintedRootDamage} points of damage.`;

  //     if (distance.feet <= 0) {
  //       taintedRoot.hp = 0; // The fall kills the taintedRoot
  //       enemyDied(taintedRoot);
  //       // switchEnemies();
  //       return;
  //     }

  //     // must contemplate a scenario where both allies die. If the number of allies reaches zero, must open the Game Over screen
  //   } else {
  //     // if we got here, then the Tainted Root is attacking with its grasp attack and not its drag attack
  //     let paragraphTaintedRootActions = document.querySelector(
  //       `#${taintedRoot.id}`
  //     );

  //     if (taintedRootDamage === 0) {
  //       // if the grasping attack doesn't connect, then the target is not grabbed

  //       paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name}'s attack failed to hit target ${target.name}`;

  //       // if you are more than 5 feet away from the chasm, and are not more than 15ft away from it

  //       if (distance.feet <= 10) {
  //         distance.feet += 5;
  //         console.log(`${distance.name} is now ${distance.feet}`);
  //         console.log(`${gameObj.distanceFromChasm[`${target.name}`]}`);
  //         paragraphTaintedRootActions.innerHTML += ` and he immediately walks 5 feet away from the threatening Chasm up ahead.`;
  //       }
  //     } else {
  //       paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name} grabs ${target.name}, dealing ${taintedRootDamage} points of damage with its vines! ${target.name} is now grabbed!`;

  //       notifyObservers(target);

  //       // if the attack connects, then the target is grabbed, and the tainted root will start dragging it towards the chasm
  //       if (!taintedRoot.hasTargetGrappled()) {
  //         taintedRoot.weapon = dragWeapon;
  //         taintedRoot.target = target;
  //         taintedRoot.targetGrappled = true;

  //         toggleButton(btnBreak);
  //       }
  //     }
  //   }
  // }
}

function theStoneBehavior() {
  let distance = gameObj.getDistanceForCharacter(theStone);

  console.log(`The Stone's distance: ${distance.feet}`);

  // If The Stone falls
  if (distance.feet <= 0) {
    console.log(`Target: ${theStone.name} fell`);

    // Immediately disable all the buttons
    disableAllOptions();

    console.log(`${theStone.name} fell`);
    let paragraphTheStoneActions = document.querySelector(`#${theStone.id}`);

    paragraphTheStoneActions.innerHTML = `${theStone.name} plummets into the chasm, falling into water as the ${taintedRoot.name} drags you the the remaining 5 feet over the edge.`;

    let fallDamage = Math.floor(Math.random() * 10 + 1);
    theStone.receiveDamage(fallDamage);

    paragraphTheStoneActions.innerHTML += `<br>${theStone.name} receives ${fallDamage} of damage from the fall.`;

    notifyObservers(theStone);

    if (theStone.hp <= 0) {
      // load dead scenario after a set interval
      console.log(`${theStone.name} died from the fall!`);

      behaviorMap.delete("enemy");
      if (isAlive(gungurk)) {
        behaviorMap.delete(gungurk);
      }

      return;
    } else {
      //   Must make a pause
      setTimeout(() => {
        console.log("Executing timeout function");
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

      behaviorMap.delete("enemy");
      if (isAlive(gungurk)) {
        behaviorMap.delete(gungurk);
      }

      return;
    }
  }

  // to determine if the target died from the fall use the distanceFromChasm object
  if (!isAlive(theStone)) {
    disableAllOptions();
    // check if The Stone died from the fall or due to damage
    behaviorMap.delete(theStone);
    console.log("The Stone died from the damage!");

    // TODO: Should load dead scenario specifying The Stone died from the damage
    behaviorMap.delete("enemy");
    if (isAlive(gungurk)) {
      behaviorMap.delete(gungurk);
    }
    return;
  } else {
    // Pick a random tainted root from the array of enemies
    let enemy = pickRandomEnemy();

    if (isAlive(enemy)) {
      let attacker = theStone;

      attack(attacker, enemy);

      console.log(`UID: ${enemy.uid} HP: ${enemy.hp}`);

      if (!isAlive(enemy)) {
        enemyDied(enemy);

        // TODO: This can be a function
        // if target has not fallen yet
        if (distance.feet >= 5) {
          let actionParagraph;
          distance.feet += 5;
          actionParagraph = document.querySelector(`#${theStone.id}`);
          actionParagraph.innerHTML += `<br>${theStone.name} steps 5 feet away from the Chasm!`;
          console.log(`${distance.name} is now ${distance.feet}`);
        }

        // Switch enemies

        // switchEnemies();

        target = pickRandomTarget();

        // TODO: This should be a function
        if (amountOfEnemies > 1) {
          paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;
        } else {
          paragraph.innerHTML = `Weapons drawn, you engage the remaining ${taintedRoot.name} as it lashes at ${target.name}!`;
        }
      }
    }
  }
}

function gungurkBehavior() {
  let distance = gameObj.getDistanceForCharacter(gungurk);

  console.log("Gungurk's distance: " + distance.feet);

  if (distance.feet <= 0) {
    console.log(`Target: ${gungurk.name} fell`);

    let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
    paragraphGungurkActions.innerHTML += ` ${gungurk.name} squeals like a terrified pig, and he disappears into the chasm. He splashes down, followed by disconcerting silence. At least the root that dragged him into the chasm apparently died from the fall.`;

    let fallDamage = Math.floor(Math.random() * 10 + 1);

    paragraphGungurkActions.innerHTML += `<br>${gungurk.name} received ${fallDamage} points of damage from the fall.`;
    gungurk.receiveDamage(fallDamage);

    gameObj.removeFromParty(allies, gungurk); // should change targets

    // TODO: try to look for a way to avoid repeatedly checking the target's hp

    notifyObservers(gungurk);

    if (!isAlive(gungurk)) {
      console.log("The fall killed Gungurk");

      paragraphGungurkActions.innerHTML += `<br>${gungurk.name} seems to have gone awfully quiet. You fear for the worse.`;
    }

    // timer to remove gungurk's paragraph from the page
    setInterval(() => {
      let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
      if (paragraphGungurkActions) {
        display.removeChild(paragraphGungurkActions);
      }
    }, 8000);

    target = pickRandomTarget();

    // check how Gungurk died and show a message describing it
    let paragraph = document.querySelector(`#narration`);

    console.assert(paragraph, `Paragraph not found for ID: ${taintedRoot.id}`);

    // TODO: This should be a function
    if (amountOfEnemies > 1) {
      paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left. The ${taintedRoot.name} lashes at ${target.name}!`;
    } else {
      paragraph.innerHTML = `Weapons drawn, you engage the remaining ${taintedRoot.name} as it lashes at ${target.name}!`;
    }

    behaviorMap.delete(gungurk);

    return;
  } else {
    if (!isAlive(gungurk)) {
      // if the taintedRoot was grappling Gungurk, it should have no one grappled now
      if (taintedRoot.hasTargetGrappled()) {
        taintedRoot.targetGrappled = false;
      }

      // check how Gungurk died and show a message describing it
      let paragraph = document.querySelector(`#narration`);

      console.assert(
        paragraph,
        `Paragraph not found for ID: ${taintedRoot.id}`
      );

      // remove Gungurk from the party
      gameObj.removeFromParty(allies, gungurk);
      console.table(allies);

      // change targets when Gungurk dies
      target = pickRandomTarget();

      paragraph.innerHTML += `<br>The vine's last attack killed ${gungurk.name}. <br>After getting rid of him, the enemy ${taintedRoot.name} shifts its focus to ${target.name}.`;

      // TODO: This should be a function
      if (amountOfEnemies > 1) {
        paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left. The ${taintedRoot.name} lashes at ${target.name}!`;
      } else {
        paragraph.innerHTML = `Weapons drawn, you engage the remaining ${taintedRoot.name} as it lashes at ${target.name}!`;
      }

      // should set a timer and remove gungurk's paragraph from the page
      setInterval(() => {
        let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
        if (paragraphGungurkActions) {
          display.removeChild(paragraphGungurkActions);
        }
      }, 6000);

      // remove Gungurk's reference from gameObject

      behaviorMap.delete(gungurk);
      console.assert(gungurk.hp > 0, "Gungurk died!");
      return;
    } else {
      // Pick a random tainted root from the array of enemies
      let enemy = pickRandomEnemy();

      if (isAlive(enemy)) {
        let attacker = gungurk;

        attack(attacker, enemy);

        console.log(`UID: ${enemy.uid} HP: ${enemy.hp}`);

        if (!isAlive(enemy)) {
          enemyDied(enemy);

          // TODO: This can be a function
          // if target has not fallen yet
          if (distance.feet >= 5) {
            let actionParagraph;
            distance.feet += 5;
            actionParagraph = document.querySelector(`#${gungurk.id}`);
            actionParagraph.innerHTML += `<br>${gungurk.name} steps 5 feet away from the Chasm!`;
            console.log(`${distance.name} is now ${distance.feet}`);
          }

          // Switch enemies
          // switchEnemies();

          target = pickRandomTarget();

          // TODO: This should be a function
          if (amountOfEnemies > 1) {
            paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;
          } else {
            paragraph.innerHTML = `Weapons drawn, you engage the remaining ${taintedRoot.name} as it lashes at ${target.name}!`;
          }
        }
      }
    }
  }
}

function pickRandomEnemy() {
  console.log("pickRandomEnemy()");

  let target;

  do {
    let numberOfEntities = entities.length;
    let randomIndex = Math.floor(Math.random() * numberOfEntities);
    target = entities[randomIndex];
  } while (target.type !== "hostile");

  return target;
}

function executeAttack() {
  if (btnAttack !== null) {
    btnAttack.textContent = "Keep attacking!";
    btnAttack = null;
  }

  if (amountOfEnemies > 0) {
    // handle enemiy's turn
    // enemyBehavior();
    for (const entity of behaviorMap.keys()) {
      // The value stored in the map is a function, so we execute it by getting it from the map and putting the () in front of it
      if (entity.name) {
        console.log(`Executing behavior for: ${entity.name}`);
      } else {
        console.log(`Executing behavior for: ${entity}`);
      }
      behaviorMap.get(entity)();
    }

    // Game checks targets that are still alive
    console.log("Logging entities");
    for (const enemy of enemies) {
      if (enemy.state === "dead") {
        let index = enemies.indexOf(enemy);

        if (index > 0) {
          enemies.splice(index, 1);
        }
      }
    }

    for (const entity of entities) {
      // if the entity died
      if (!isAlive(entity)) {
        // remove it
        let index = entities.indexOf(entity);

        if (index > 0) {
          entities.splice(index, 1);
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
}

function isAlive(target) {
  return target.hp > 0;
}

function switchEnemies() {
  if (enemies.length > 0) {
    taintedRoot = enemies.shift();
    taintedRootGUI = new CharGUI(taintedRoot);

    notifyObservers(taintedRoot);
  }
}

function disableAllOptions() {
  let allOptions = document.querySelectorAll("button.btn");

  for (let i = 0; i < allOptions.length; i++) {
    let button = allOptions[i];

    if (button.disabled) {
      continue;
    }

    toggleButton(button);
  }
}

function enemyDied(enemy) {
  enemy.state = "dead";
  let target = enemy.target;
  let paragraphTaintedRootActions = document.querySelector(`#${enemy.id}`);

  paragraphTaintedRootActions.innerHTML = `Enemy ${enemy.name} was slain!`;
  amountOfEnemies--;

  // if the Tainted Root was grabbing someone, who has not already fallen down into the Chasm
  if (enemy.hasTargetGrappled()) {
    paragraphTaintedRootActions.innerHTML += ` ${target.name} is no longer grappled.`;
    toggleButton(btnBreak);
  }
}

function attack(attacker, enemy) {
  let damageDealt = gameObj.attack(attacker, enemy);

  let actionParagraph = document.querySelector(`#${attacker.id}`);

  if (damageDealt === 0) {
    actionParagraph.innerHTML = `${attacker.name}'s attack failed to hit target ${enemy.name}.`;
  } else {
    actionParagraph.innerHTML = `${attacker.name} dealt ${damageDealt} points of damage to ${enemy.name}.`;

    notifyObservers(enemy);
  }
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

function pullTargetCloserToTheChasm(attacker, target, damage) {
  // TODO: roll the drag damage in here instead
  // let taintedRootDamage = gameObj.attack(attacker, target);
  let distance = gameObj.getDistanceForCharacter(target);

  distance.feet -= 5;
  let paragraphTaintedRootActions = document.querySelector(
    `#${taintedRoot.id}`
  );
  paragraphTaintedRootActions.innerHTML = `The enemy ${attacker.name} drags ${target.name} 5 feet closer to the Chasm, dealing ${damage} points of damage. ${target.name} is now ${distance.feet} away from the edge!`;

  console.log(
    `Enemy ${attacker.name} pulls ${target.name} closer to the chasm. ${target.name} is now ${distance.feet} away from the Chasm.`
  );

  return distance;
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
    toggleButton(btnBreak);
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
