import { entities } from "../../1a_fight.js";

export function idle(theStone) {
  if (!theStone.target) {
    theStone.target = pickRandomEntityOfType("hostile");

    let paragraphTheStoneActions = document.querySelector(`#${theStone.id}`);

    paragraphTheStoneActions.innerHTML = `${theStone.name} scans the battle field, setting his eyes on ${theStone.target.name}${theStone.target.uid} and charges!`;
    theStone.state = "attack";
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
