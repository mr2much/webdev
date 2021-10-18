import { gameObj, notifyObservers, enemyDied } from "../../1a_fight.js";
import { drag as pull } from "../../../../../../../../js/weapons.js";

function drag(enemy) {
  // Keep dragging the target until you bring it down the chasm, or kill it, if you kill it go idle, if you die, set state to dead
  // change weapon of choice to drag
  enemy.weapon = pull;

  // when the weapon is dragWeapon, the attack always hits, so the Tainted Root always deals damage with it
  let taintedRootDamage = gameObj.attack(enemy, enemy.target);
  let distance = gameObj.getDistanceForCharacter(enemy.target);

  distance = pullTargetCloserToTheChasm(enemy, enemy.target, taintedRootDamage);

  notifyObservers(enemy.target);

  if (enemy.target.hp <= 0) {
    // target died
    enemy.target.state = "dead";

    // Should probably display a message indicating that the Tainted Root's last attack killed the target
    console.log(`${enemy.target.name} was killed!`);

    enemy.state = "idle";

    return;
  }

  if (distance.feet <= 0) {
    enemy.target.state = "falling";
    enemy.hp = 0;
    notifyObservers(enemy);
    enemyDied(enemy);
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
    notifyObservers(attacker);
    target.state = "falling";
  }

  return distance;
}

export { drag };
