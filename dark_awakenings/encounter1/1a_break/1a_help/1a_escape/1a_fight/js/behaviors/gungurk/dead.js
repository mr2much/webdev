import { behaviorMap, entities } from "../../1a_fight.js";

let display = document.getElementById("feedback");

export function dead(gungurk) {
  // this is to prevent that the Tainted Root keeps targetting Gungurk after he has fallen
  let index = entities.indexOf(gungurk); // Remove Gungurk

  console.log("Gungurk died!");

  if (index >= 0) {
    entities.splice(index, 1);
  }

  let pGungurkActions = document.querySelector(`#${gungurk.id}`);

  if (pGungurkActions) {
    display.removeChild(pGungurkActions);
  }

  behaviorMap.delete(gungurk); // Remove Gungurk's behavior
}
