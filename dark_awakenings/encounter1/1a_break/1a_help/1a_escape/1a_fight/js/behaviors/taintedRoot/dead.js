import { behaviorMap, entities } from "../../1a_fight.js";

export function dead(enemy) {
  let target = enemy.target;
  let paragraphTaintedRootActions = document.querySelector(
    `#${enemy.id}${enemy.uid}`
  );

  paragraphTaintedRootActions.innerHTML = `Enemy ${enemy.name}${enemy.uid} was slain!`;

  // if the Tainted Root was grabbing someone, who has not already fallen down into the Chasm
  if (target) {
    let condition = target.condition;

    switch (condition) {
      case "grappled":
        paragraphTaintedRootActions.innerHTML += ` ${target.name} is no longer grappled.`;
        target.condition = "healthy";

        break;

      default:
        break;
    }
  }
  // if taintedRoot is dead, remove it from entities and remove its behavior
  entities.remove(enemy);

  behaviorMap.removeBehavior(enemy);
  //   behaviorMap.delete(enemy);
}
