import {
  gameObj,
  entities,
  notifyObservers,
  enemyDied,
} from "../../1a_fight.js";

let btnBreak = document.getElementById("break");

export function theStoneBehaviorHandler(theStone) {
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
      if (enemy.hp > 0) {
        // Attack it
        let attacker = theStone;

        attack(attacker, enemy);

        console.log(`UID: ${enemy.uid} HP: ${enemy.hp}`);

        // If the attack killed the enemy Tainted Root
        if (enemy.hp <= 0) {
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
