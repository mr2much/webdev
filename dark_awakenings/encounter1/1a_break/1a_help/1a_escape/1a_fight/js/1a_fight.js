import { CharGUI } from "../../../../../../js/components/char_gui.js";
import { grasp } from "../../../../../../js/weapons.js";

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

  taintedRoot = enemies.shift();
  // target = pickRandomEntityOfType("ally");
  // target = pickRandomTarget();

  // paragraph.innerHTML += `<br><br>There are still ${amountOfEnemies} enemies left. You both tighten the grip on your weapons and attack them. One of the ${taintedRoot.name}s lashes at ${target.name}!`;

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

// function pickRandomTarget() {
//   console.log("pickRandomTarget()");
//   let numberOfAllies = allies.length;
//   let randomIndex = Math.floor(Math.random() * numberOfAllies);

//   console.log(`Random Number: ${randomIndex}`);

//   return allies[randomIndex];
// }

function toggleButton(button) {
  button.disabled = !button.disabled;

  button.classList.toggle("noHover");
}

function enemyBehavior() {
  let taintedRootDamage;

  // This should ensure that once a taintedRoot is picked, it is not randomly switched
  // taintedRoot = pickRandomEnemy();

  // This means that there are no more enemies
  if (!taintedRoot) {
    // remove enemy behavior
    behaviorMap.delete("enemy");
    return;
  }

  let state = taintedRoot.state;

  if (!isAlive(taintedRoot)) {
    taintedRoot.state = "dead";
  }

  switch (state) {
    case "dead":
      // if taintedRoot is dead, remove it from entities and pick a new taintedRoot
      let index = entities.indexOf(taintedRoot);

      if (index >= 0) {
        entities.splice(index, 1);
      }

      taintedRoot = pickRandomEntityOfType("hostile");
      // taintedRoot = pickRandomEnemy();

      // This means that there are no more enemies
      if (!taintedRoot) {
        // remove enemy behavior
        behaviorMap.delete("enemy");
        return;
      }

      taintedRoot.state = "idle";
      break;
    case "idle":
      // look for a target
      if (!target) {
        target = pickRandomEntityOfType("ally");
      }

      // Should display message indicating which character the Tainted Root is attacking

      // target = pickRandomTarget();
      if (target) {
        taintedRoot.state = "attack";

        // TODO: This should be a function
        if (amountOfEnemies > 1) {
          paragraph.innerHTML = ` The ${taintedRoot.name}${taintedRoot.uid} lashes at ${target.name}!`;
        } else {
          paragraph.innerHTML = `The last enemy lashes at ${target.name}!`;
        }
      } else {
        // TODO: Implement this scenario
        console.log("Doesn't have a target for some reason");

        return;
      }

      break;
    case "attack":
      let paragraphTaintedRootActions = document.querySelector(
        `#${taintedRoot.id}`
      );
      taintedRoot.weapon = grasp;
      taintedRootDamage = gameObj.attack(taintedRoot, target);

      // if the attack hits:
      if (taintedRootDamage > 0) {
        // show message showing the damage caused by the attack done to the target
        // show message showing that the target is now grappled
        paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name}${taintedRoot.uid} lashes at ${target.name}, dealing ${taintedRootDamage} points of damage with its vines! ${target.name} is now grabbed as the Tainted Root wraps its vines around him!`;

        if (target.hp <= 0) {
          // show message indicating the the Tainted Root's last attack killed the target

          target.state = "dead";

          // If the target is dead, the Tainted Root should look go to idle state
          taintedRoot.state = "idle";
        }

        // change condition of target to "grappled"
        taintedRoot.target = target;
        target.condition = "grappled";

        // change state of Tainted Root to drag
        taintedRoot.state = "drag";

        // Notify the target of the change in their HP
        notifyObservers(target);
      } else {
        // if attack misses show message indicating the attack failed to hit the target
        paragraphTaintedRootActions.innerHTML = `The enemy ${taintedRoot.name}${taintedRoot.uid}'s attack failed to hit target ${target.name}`;

        // if you are more than 5 feet away from the chasm, and are not more than 15ft away from it

        // This check should be in the ally's behaviors
        let distance = gameObj.getDistanceForCharacter(target);
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
      // change weapon of choice to drag
      taintedRoot.weapon = dragWeapon;

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

        // Should probably display a message indicating that the Tainted Root's last attack killed the target

        taintedRoot.state = "idle";

        return;
      }

      if (distance.feet <= 0) {
        target.state = "falling";
        taintedRoot.hp = 0;
        notifyObservers(taintedRoot);
        enemyDied(taintedRoot);
      }

      break;
    default:
      break;
  }
}

function theStoneBehavior() {
  let state = theStone.state;
  let distance = gameObj.getDistanceForCharacter(theStone);

  if (distance.feet <= 0) {
    theStone.state = "falling";
  }

  btnBreak.disabled = !(theStone.condition === "grappled");

  if (btnBreak.disabled) {
    btnBreak.classList.add("noHover");
  } else {
    btnBreak.classList.remove("noHover");
  }

  // if (theStone.condition === "grappled") {
  //   // Turn on button to allow The Stone to attempt to break free of the grapple
  //   toggleButton(btnBreak);
  // }

  switch (state) {
    case "idle":
      if (!theStone.target) {
        theStone.target = pickRandomEntityOfType("hostile");

        let paragraphTheStoneActions = document.querySelector(
          `#${theStone.id}`
        );

        paragraphTheStoneActions.innerHTML = `${theStone.name} scans the battle field, setting his eyes on ${theStone.target.name}${theStone.target.uid} and charges!`;
        theStone.state = "attack";
      }
      break;
    case "attack":
      let enemy = theStone.target;

      // If the enemy is still alive
      if (isAlive(enemy)) {
        // Attack it
        let attacker = theStone;

        attack(attacker, enemy);

        console.log(`UID: ${enemy.uid} HP: ${enemy.hp}`);

        // If the attack killed the enemy Tainted Root
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

          theStone.target = null;
          theStone.state = "idle";
        }
      } else {
        theStone.target = null;
        theStone.state = "idle";
      }
      break;
    case "dead":
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
    // break;
    case "falling":
      disableAllOptions();

      let paragraphTheStoneActions = document.querySelector(`#${theStone.id}`);

      paragraphTheStoneActions.innerHTML = `${theStone.name} plummets into the chasm, falling into water as the ${taintedRoot.name} drags you the the remaining 5 feet over the edge.`;

      let fallDamage = Math.floor(Math.random() * 10 + 1);
      theStone.receiveDamage(fallDamage);

      paragraphTheStoneActions.innerHTML += `<br>${theStone.name} receives ${fallDamage} of damage from the fall.`;

      notifyObservers(theStone);

      if (theStone.hp <= 0) {
        // load dead scenario after a set interval
        console.log(`${theStone.name} died from the fall!`);

        paragraphTheStoneActions.innerHTML += ` The fall killed ${theStone.name}.`;

        theStone.state = "dead";

        // This is so that the game doesn't continue running.
        // TODO: Find a better way of doing this
        behaviorMap.delete(theStone);
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

        // This is so that the game doesn't continue running.
        // TODO: Find a better way of doing this
        behaviorMap.delete(theStone);
        behaviorMap.delete("enemy");
        if (isAlive(gungurk)) {
          behaviorMap.delete(gungurk);
        }

        return;
      }
    // break;

    default:
      break;
  }
}

function gungurkBehavior() {
  let state = gungurk.state;
  let distance = gameObj.getDistanceForCharacter(gungurk);

  if (state !== "dead") {
    if (distance.feet <= 0) {
      state = "falling";
    } else if (distance.feet < 15) {
      state = "retreat";
    }

    if (gungurk.condition === "grappled") {
      state = "escape";
    }
  }

  switch (state) {
    case "falling":
      console.log(`Target: ${gungurk.name} fell`);

      let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
      paragraphGungurkActions.innerHTML += ` ${gungurk.name} squeals like a terrified pig, and he disappears into the chasm. He splashes down, followed by disconcerting silence. At least the root that dragged him into the chasm apparently died from the fall.`;

      let fallDamage = Math.floor(Math.random() * 10 + 1);

      paragraphGungurkActions.innerHTML += `<br>${gungurk.name} received ${fallDamage} points of damage from the fall.`;
      gungurk.receiveDamage(fallDamage);

      // this is to prevent that the Tainted Root keeps targetting Gungurk after he has fallen
      gameObj.removeFromParty(allies, gungurk); // should change targets

      // TODO: try to look for a way to avoid repeatedly checking the target's hp

      notifyObservers(gungurk);

      if (!isAlive(gungurk)) {
        console.log("The fall killed Gungurk");
        gungurk.state = "dead";

        paragraphGungurkActions.innerHTML += `<br>${gungurk.name} seems to have gone awfully quiet. You fear for the worse.`;
      }

      // timer to remove gungurk's paragraph from the page
      setInterval(() => {
        let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
        if (paragraphGungurkActions) {
          display.removeChild(paragraphGungurkActions);
        }
      }, 8000);

      behaviorMap.delete(gungurk);

      break;

    case "dead":
      // gameObj.removeFromParty(allies, gungurk); // should change targets

      // this is to prevent that the Tainted Root keeps targetting Gungurk after he has fallen
      let index = entities.indexOf(gungurk); // Remove Gungurk

      if (index >= 0) {
        entities.splice(index, 1);
      }

      let pGungurkActions = document.querySelector(`#${gungurk.id}`);
      if (pGungurkActions) {
        display.removeChild(pGungurkActions);
      }
      behaviorMap.delete(gungurk); // Remove Gungurk's behavior
      break;

    case "idle":
      if (!gungurk.target) {
        gungurk.target = pickRandomEntityOfType("hostile");

        let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);

        paragraphGungurkActions.innerHTML = `${gungurk.name} scans the battle field, setting his eyes on ${gungurk.target.name}${gungurk.target.uid} and charges!`;
        gungurk.state = "attack";
      }
      break;

    case "attack":
      // Pick a random tainted root from the array of enemies
      let enemy = gungurk.target;

      if (isAlive(enemy)) {
        let attacker = gungurk;

        attack(attacker, enemy);

        console.log(`UID: ${enemy.uid} HP: ${enemy.hp}`);

        if (!isAlive(enemy)) {
          enemyDied(enemy);

          let distance = gameObj.getDistanceForCharacter(gungurk);

          // TODO: This can be a function
          // if target has not fallen yet
          if (distance.feet >= 5) {
            let actionParagraph;
            distance.feet += 5;
            actionParagraph = document.querySelector(`#${gungurk.id}`);
            actionParagraph.innerHTML += `<br>${gungurk.name} steps 5 feet away from the Chasm!`;
            console.log(`${distance.name} is now ${distance.feet}`);
          }

          gungurk.target = null;
          gungurk.state = "idle";
        }
      } else {
        gungurk.target = null;
        gungurk.state = "idle";
      }
      break;

    case "retreat":
      paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
      let distance = gameObj.getDistanceForCharacter(gungurk);

      distance.feet += 5;
      paragraphGungurkActions.innerHTML = `${gungurk.name} steps 5 feet away from the Chasm. He is now ${distance.feet} feet away from the Chasm.`;
      break;

    case "escape":
      attemptToEscapeGrapple(gungurk);
      break;

    default:
      break;
  }

  // console.log("Gungurk's distance: " + distance.feet);

  // if (distance.feet <= 0) {
  //   console.log(`Target: ${gungurk.name} fell`);

  //   let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
  //   paragraphGungurkActions.innerHTML += ` ${gungurk.name} squeals like a terrified pig, and he disappears into the chasm. He splashes down, followed by disconcerting silence. At least the root that dragged him into the chasm apparently died from the fall.`;

  //   let fallDamage = Math.floor(Math.random() * 10 + 1);

  //   paragraphGungurkActions.innerHTML += `<br>${gungurk.name} received ${fallDamage} points of damage from the fall.`;
  //   gungurk.receiveDamage(fallDamage);

  //   gameObj.removeFromParty(allies, gungurk); // should change targets

  //   // TODO: try to look for a way to avoid repeatedly checking the target's hp

  //   notifyObservers(gungurk);

  //   if (!isAlive(gungurk)) {
  //     console.log("The fall killed Gungurk");

  //     paragraphGungurkActions.innerHTML += `<br>${gungurk.name} seems to have gone awfully quiet. You fear for the worse.`;
  //   }

  //   // timer to remove gungurk's paragraph from the page
  //   setInterval(() => {
  //     let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
  //     if (paragraphGungurkActions) {
  //       display.removeChild(paragraphGungurkActions);
  //     }
  //   }, 8000);

  //   target = pickRandomTarget();

  //   // check how Gungurk died and show a message describing it

  //   behaviorMap.delete(gungurk);

  //   return;
  // } else {
  //   if (!isAlive(gungurk)) {
  //     // if the taintedRoot was grappling Gungurk, it should have no one grappled now
  //     if (taintedRoot.hasTargetGrappled()) {
  //       taintedRoot.targetGrappled = false;
  //     }

  //     // check how Gungurk died and show a message describing it

  //     // remove Gungurk from the party
  //     gameObj.removeFromParty(allies, gungurk);
  //     console.table(allies);

  //     // change targets when Gungurk dies
  //     target = pickRandomTarget();

  //     // paragraph.innerHTML += `<br>The vine's last attack killed ${gungurk.name}. <br>After getting rid of him, the enemy ${taintedRoot.name} shifts its focus to ${target.name}.`;

  //     // should set a timer and remove gungurk's paragraph from the page
  //     setInterval(() => {
  //       let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
  //       if (paragraphGungurkActions) {
  //         display.removeChild(paragraphGungurkActions);
  //       }
  //     }, 6000);

  //     // remove Gungurk's reference from gameObject

  //     behaviorMap.delete(gungurk);
  //     console.assert(gungurk.hp > 0, "Gungurk died!");
  //     return;
  //   } else {
  //     // Pick a random tainted root from the array of enemies
  //     let enemy = pickRandomEnemy();

  //     if (isAlive(enemy)) {
  //       let attacker = gungurk;

  //       attack(attacker, enemy);

  //       console.log(`UID: ${enemy.uid} HP: ${enemy.hp}`);

  //       if (!isAlive(enemy)) {
  //         enemyDied(enemy);

  //         // TODO: This can be a function
  //         // if target has not fallen yet
  //         if (distance.feet >= 5) {
  //           let actionParagraph;
  //           distance.feet += 5;
  //           actionParagraph = document.querySelector(`#${gungurk.id}`);
  //           actionParagraph.innerHTML += `<br>${gungurk.name} steps 5 feet away from the Chasm!`;
  //           console.log(`${distance.name} is now ${distance.feet}`);
  //         }

  //         target = pickRandomTarget();
  //       }
  //     }
  //   }
  // }
}

function pickRandomEntityOfType(type) {
  let entity;

  if (entities.some((entity) => entity["type"] === type)) {
    do {
      let numberOfEntities = entities.length;
      let randomIndex = Math.floor(Math.random() * numberOfEntities);
      entity = entities[randomIndex];
    } while (entity.type !== type && entity.state !== "dead");
  }

  return entity;
}

function pickRandomEnemy() {
  console.log("pickRandomEnemy()");

  return pickRandomEntityOfType("hostile");
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

  paragraphTaintedRootActions.innerHTML = `Enemy ${enemy.name}${enemy.uid} was slain!`;
  amountOfEnemies--;

  // if the Tainted Root was grabbing someone, who has not already fallen down into the Chasm
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

  if (amountOfEnemies > 1) {
    paragraph.innerHTML = `There are still ${amountOfEnemies} enemies left.`;
  } else {
    paragraph.innerHTML = `Weapons drawn, you engage the last remaining enemy, ${taintedRoot.name}${taintedRoot.uid}`;
  }
}

function attack(attacker, enemy) {
  let damageDealt = gameObj.attack(attacker, enemy);

  let actionParagraph = document.querySelector(`#${attacker.id}`);

  if (damageDealt === 0) {
    actionParagraph.innerHTML = `${attacker.name}'s attack failed to hit target ${enemy.name}${enemy.uid}.`;
  } else {
    actionParagraph.innerHTML = `${attacker.name} dealt ${damageDealt} points of damage to ${enemy.name}${enemy.uid}.`;

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
  paragraphTaintedRootActions.innerHTML = `The enemy ${attacker.name}${attacker.uid} drags ${target.name} 5 feet closer to the Chasm, dealing ${damage} points of damage. ${target.name} is now ${distance.feet} away from the edge!`;

  console.log(
    `Enemy ${attacker.name} pulls ${target.name} closer to the chasm. ${target.name} is now ${distance.feet} away from the Chasm.`
  );

  if (distance.feet <= 0) {
    attacker.hp = 0;
    notifyObservers(attacker);
    target.state = "falling";
  }

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
  let damage = 10;
  console.log(
    `${target.name} is attempting to break free from the ${taintedRoot.name}${taintedRoot.uid}'s grasp!`
  );

  let actionParagrapm = document.querySelector(`#${target.id}`);

  actionParagrapm.innerHTML = `${target.name} attempts to escape from the ${taintedRoot.name}'s grasp. `;

  const escapeCheck = grappleContest(target);
  const contestedCheck = grappleContest(taintedRoot);

  console.log(`${target.name}'s attempt is: ${escapeCheck}`);
  console.log(`${taintedRoot.name}'s attempt is: ${contestedCheck}`);

  if (escapeCheck >= contestedCheck) {
    actionParagrapm.innerHTML += `And is successful to do so!`;

    console.log(`${target.name} broke free!`);
    target.condition = "healthy";
    taintedRoot.state = "attack";
    if (target === theStone) {
      actionParagrapm.innerHTML += ` At ${target.name}'s might, the ${taintedRoot.name} explodes into a bunch of small fragments.`;
      taintedRoot.hp = 0;

      notifyObservers(taintedRoot);
      enemyDied(taintedRoot);

      console.log(`Killing the vine!`);
    } else {
      actionParagrapm.innerHTML += ` ${target.name} immediately steps 5 feet away from the ${taintedRoot.name}`;
      target.state = "retreat";
      console.log(`Immediately stepping 5ft away from the chasm!`);
    }
  } else {
    console.log(`${target.name} failed to break free from the vine`);
    actionParagrapm.innerHTML += ` But is unable to do so.`;
    // TODO: Another reason to roll the drag damage in the function
    pullTargetCloserToTheChasm(taintedRoot, target, damage);

    if (target.hp === 0) {
      target.state = "dead";
      taintedRoot.state = "idle";
    }
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
