import { behaviorMap } from "../../1a_fight.js";

export function idle(enemy) {
  if (enemy.hp <= 0) {
    enemy.state = "dead";
    return;
  }

  enemy.target = behaviorMap.getEntityOfType("ally");

  if (enemy.target) {
    enemy.state = "attack";

    // TODO: This should be a function
    let p = document.querySelector(`#${enemy.id}${enemy.uid}`);

    p.innerHTML = ` The ${enemy.name}${enemy.uid} lashes at ${enemy.target.name}!`;
  } else {
    // TODO: Implement this scenario
    console.log("Doesn't have a target for some reason");
  }
}
