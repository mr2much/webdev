import { entities } from "../../1a_fight.js";

export function idle(gungurk) {
  if (!gungurk.target) {
    gungurk.target = entities.getEntityOfType("hostile");

    let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);

    paragraphGungurkActions.innerHTML = `${gungurk.name} scans the battle field, setting his eyes on ${gungurk.target.name}${gungurk.target.uid} and charges!`;
    gungurk.state = "attack";
  }
}
