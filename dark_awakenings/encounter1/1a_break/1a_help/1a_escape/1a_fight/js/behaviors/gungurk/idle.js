import { entities } from "../../1a_fight.js";

export function idle(gungurk) {
  if (!gungurk.target) {
    gungurk.target = pickRandomEntityOfType("hostile");

    let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);

    paragraphGungurkActions.innerHTML = `${gungurk.name} scans the battle field, setting his eyes on ${gungurk.target.name}${gungurk.target.uid} and charges!`;
    gungurk.state = "attack";
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
