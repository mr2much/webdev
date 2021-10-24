import { behaviorMap, entities } from "../../1a_fight.js";

let display = document.getElementById("feedback");

export function dead(gungurk) {
  console.log("Gungurk died!");
  // this is to prevent that the Tainted Root keeps targetting Gungurk after he has fallen
  entities.remove(gungurk);
  behaviorMap.removeBehavior(gungurk);

  setTimeout(() => {
    let pGungurkActions = document.querySelector(`#${gungurk.id}`);

    if (pGungurkActions) {
      display.removeChild(pGungurkActions);
    }
  }, 6000);

  //   behaviorMap.delete(gungurk); // Remove Gungurk's behavior
}
