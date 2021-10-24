import { gameObj, hpObservers as notifyObservers } from "../../1a_fight.js";
import { drag as pull } from "../../../../../../../../js/weapons.js";

export function drag(enemy) {
  // Keep dragging the target until you bring it down the chasm, or kill it, if you kill it go idle, if you die, set state to dead
  // change weapon of choice to drag
  enemy.weapon = pull;
  let target = enemy.target;

  // when the weapon is dragWeapon, the attack always hits, so the Tainted Root always deals damage with it
  let taintedRootDamage = gameObj.attack(enemy, target);
  let distance = gameObj.getDistanceForCharacter(target);

  distance = pullTargetCloserToTheChasm(enemy, target, taintedRootDamage);

  notifyObservers.notify(target);

  if (target.hp <= 0) {
    // target died
    target.state = "dead";

    enemy.state = "idle";

    return;
  }

  if (distance.feet <= 0) {
    let targetActions = document.querySelector(`#${target.id}`);

    targetActions.innerHTML = `${target.name} plummets into the chasm, falling into water as the ${enemy.name} drags you the the remaining 5 feet over the edge.`;
    target.state = "falling";
    enemy.hp = 0;
    notifyObservers.notify(enemy);
  }
}

function pullTargetCloserToTheChasm(attacker, target, damage) {
  // TODO: roll the drag damage in here instead
  // let taintedRootDamage = gameObj.attack(attacker, target);
  let distance = gameObj.getDistanceForCharacter(target);

  distance.feet -= 5;
  let paragraphTaintedRootActions = document.querySelector(
    `#${attacker.id}${attacker.uid}`
  );
  paragraphTaintedRootActions.innerHTML = `The enemy ${attacker.name}${attacker.uid} drags ${target.name} 5 feet closer to the Chasm, dealing ${damage} points of damage. ${target.name} is now ${distance.feet} away from the edge!`;

  console.log(
    `Enemy ${attacker.name} pulls ${target.name} closer to the chasm. ${target.name} is now ${distance.feet} away from the Chasm.`
  );

  if (distance.feet <= 0) {
    attacker.hp = 0;
    notifyObservers.notify(attacker);
    target.state = "falling";
  }

  return distance;
}
