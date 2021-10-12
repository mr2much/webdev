import { grasp, drag } from "../../../../../../../../js/weapons.js";
import { taintedRoot } from "../../../../../../../../js/enemies.js";
import { gameObj } from "../../1a_fight.js";
import { enemies } from "../../1a_fight.js";
import { entities } from "../../1a_fight.js";
import { notifyObservers } from "../../1a_fight.js";

let amountOfEnemies = 0;
let paragraph = document.getElementById("narration");
let enemy;

export function taintedRootBehaviorHandler() {
  let taintedRootDamage;
  amountOfEnemies = enemies.length;

  // This means that there are no more enemies
  // if (!taintedRoot) {
  //   // remove enemy behavior
  //   behaviorMap.delete("enemy");
  //   return;
  // }

  if (!enemy) {
    enemy = pickRandomEntityOfType("hostile");
  }

  let state = enemy.state;

  if (enemy.hp <= 0) {
    enemey.state = "dead";
  }

  switch (state) {
    case "dead":
      // if taintedRoot is dead, remove it from entities and pick a new taintedRoot
      let index = entities.indexOf(enemy);

      if (index >= 0) {
        entities.splice(index, 1);
      }

      enemy = pickRandomEntityOfType("hostile");

      // This means that there are no more enemies
      if (!enemy) {
        // remove enemy behavior
        behaviorMap.delete("enemy");
        return;
      }

      enemy.state = "idle";
      break;
    case "idle":
      // look for a target
      if (!enemy.target) {
        enemy.target = pickRandomEntityOfType("ally");
      }

      if (enemy.target) {
        enemy.state = "attack";

        // TODO: This should be a function
        if (amountOfEnemies > 1) {
          paragraph.innerHTML = ` The ${enemy.name}${enemy.uid} lashes at ${enemy.target.name}!`;
        } else {
          paragraph.innerHTML = `The last enemy lashes at ${enemy.target.name}!`;
        }
      } else {
        // TODO: Implement this scenario
        console.log("Doesn't have a target for some reason");

        return;
      }

      break;
    case "attack":
      let paragraphTaintedRootActions = document.querySelector(`#${enemy.id}`);
      enemy.weapon = grasp;
      taintedRootDamage = gameObj.attack(enemy, enemy.target);

      // if the attack hits:
      if (taintedRootDamage > 0) {
        // show message showing the damage caused by the attack done to the target
        // show message showing that the target is now grappled
        paragraphTaintedRootActions.innerHTML = `The enemy ${enemy.name}${enemy.uid} lashes at ${enemy.target.name}, dealing ${taintedRootDamage} points of damage with its vines! ${enemy.target.name} is now grabbed as the Tainted Root wraps its vines around him!`;

        if (enemy.target.hp <= 0) {
          // show message indicating the the Tainted Root's last attack killed the target

          enemy.target.state = "dead";

          // If the target is dead, the Tainted Root should look go to idle state
          enemy.state = "idle";
        }

        // change condition of target to "grappled"
        // taintedRoot.target = target;
        enemy.target.condition = "grappled";

        // change state of Tainted Root to drag
        enemy.state = "drag";

        // Notify the target of the change in their HP
        notifyObservers(enemy.target);
      } else {
        // if attack misses show message indicating the attack failed to hit the target
        paragraphTaintedRootActions.innerHTML = `The enemy ${enemy.name}${enemy.uid}'s attack failed to hit target ${enemy.target.name}`;

        // if you are more than 5 feet away from the chasm, and are not more than 15ft away from it

        // This check should be in the ally's behaviors
        let distance = gameObj.getDistanceForCharacter(enemy.target);
        if (distance.feet <= 10) {
          distance.feet += 5;
          console.log(`${distance.name} is now ${distance.feet}`);
          console.log(`${gameObj.distanceFromChasm[`${enemy.target.name}`]}`);
          paragraphTaintedRootActions.innerHTML += ` and he immediately walks 5 feet away from the threatening Chasm up ahead.`;
        }
      }

      break;
    case "drag":
      // Keep dragging the target until you bring it down the chasm, or kill it, if you kill it go idle, if you die, set state to dead
      // change weapon of choice to drag
      enemy.weapon = drag;

      // when the weapon is dragWeapon, the attack always hits, so the Tainted Root always deals damage with it
      taintedRootDamage = gameObj.attack(enemy, enemy.target);
      let distance = gameObj.getDistanceForCharacter(enemy.target);

      distance = pullTargetCloserToTheChasm(
        enemy,
        enemy.target,
        taintedRootDamage
      );

      notifyObservers(enemy.target);

      if (enemy.target.hp <= 0) {
        // target died
        enemy.target.state = "dead";

        // Should probably display a message indicating that the Tainted Root's last attack killed the target

        enemy.state = "idle";

        return;
      }

      if (distance.feet <= 0) {
        enemy.target.state = "falling";
        enemy.hp = 0;
        notifyObservers(enemy);
        enemyDied(enemy);
      }

      break;
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
