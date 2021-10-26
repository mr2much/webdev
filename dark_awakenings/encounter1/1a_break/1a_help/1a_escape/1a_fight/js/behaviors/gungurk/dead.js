import { behaviorMap } from "../../1a_fight.js";

let display = document.getElementById("feedback");

export function dead(gungurk) {
  console.log("Gungurk died!");
  let pGungurkActions = document.querySelector(`#${gungurk.id}`);
  // this is to prevent that the Tainted Root keeps targetting Gungurk after he has fallen

  pGungurkActions.innerHTML = `${gungurk.name} succumbed to the wounds inflicted upon him by the attacks, and died!`;

  behaviorMap.remove(gungurk);

  setTimeout(() => {
    if (pGungurkActions) {
      display.removeChild(pGungurkActions);
    }
  }, 6000);
}
