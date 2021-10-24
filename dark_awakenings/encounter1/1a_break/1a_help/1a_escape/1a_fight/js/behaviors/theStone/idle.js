import { entities } from "../../1a_fight.js";

export function idle(theStone) {
  if (!theStone.target) {
    theStone.target = entities.getEntityOfType("hostile");

    let paragraphTheStoneActions = document.querySelector(`#${theStone.id}`);

    paragraphTheStoneActions.innerHTML = `${theStone.name} scans the battle field, setting his eyes on ${theStone.target.name}${theStone.target.uid} and charges!`;
    theStone.state = "attack";
  }
}
