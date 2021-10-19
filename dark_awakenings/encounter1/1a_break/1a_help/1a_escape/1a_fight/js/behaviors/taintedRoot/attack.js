import { grasp } from "../../../../../../../../js/weapons.js";
import { gameObj, notifyObservers } from "../../1a_fight.js";

export function attack(enemy) {
  let paragraphTaintedRootActions = document.querySelector(
    `#${enemy.id}${enemy.uid}`
  );
  enemy.weapon = grasp;
  let target = enemy.target;

  if (target.hp <= 0) {
    target.state = "dead";
    enemy.state = "idle";

    return;
  }

  let taintedRootDamage = gameObj.attack(enemy, target);

  // if the attack hits:
  if (taintedRootDamage > 0) {
    // Notify the target of the change in their HP
    notifyObservers(target);

    // show message showing the damage caused by the attack done to the target
    // show message showing that the target is now grappled
    paragraphTaintedRootActions.innerHTML = `The enemy ${enemy.name}${enemy.uid} lashes at ${target.name}, dealing ${taintedRootDamage} points of damage with its vines! ${target.name} is now grabbed as the Tainted Root wraps its vines around him!`;

    if (enemy.target.hp <= 0) {
      // show message indicating the the Tainted Root's last attack killed the target

      target.state = "dead";

      // If the target is dead, the Tainted Root should go to idle state
      enemy.state = "idle";
      return;
    }

    // change condition of target to "grappled"
    // taintedRoot.target = target;
    target.condition = "grappled";

    // If is not already grappled, then grapple it and start dragging him. If it is already grappled the vine will just keep attacking
    if (!target.grappledBy) {
      target.grappledBy = enemy;
      // change state of Tainted Root to drag
      enemy.state = "drag";
    }
  } else {
    // if attack misses show message indicating the attack failed to hit the target
    paragraphTaintedRootActions.innerHTML = `The enemy ${enemy.name}${enemy.uid}'s attack failed to hit target ${target.name}`;

    // if you are more than 5 feet away from the chasm, and are not more than 15ft away from it

    // This check should be in the ally's behaviors
    // let distance = gameObj.getDistanceForCharacter(enemy.target);

    // if (distance.feet <= 10) {
    //   distance.feet += 5;
    //   console.log(`${distance.name} is now ${distance.feet}`);
    //   console.log(`${gameObj.distanceFromChasm[`${enemy.target.name}`]}`);
    //   paragraphTaintedRootActions.innerHTML += ` and he immediately walks 5 feet away from the threatening Chasm up ahead.`;
    // }
  }
}
