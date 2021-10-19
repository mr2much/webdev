import { entities } from "../../1a_fight.js";

export function idle(enemy) {
  enemy.target = pickRandomEntityOfType("ally");

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
