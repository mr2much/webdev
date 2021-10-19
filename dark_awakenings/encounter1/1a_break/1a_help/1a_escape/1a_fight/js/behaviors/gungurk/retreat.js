import { gameObj } from "../../1a_fight.js";

export function retreat(gungurk) {
  let parGungurkActions = document.querySelector(`#${gungurk.id}`);
  let distance = gameObj.getDistanceForCharacter(gungurk);

  distance.feet += 5;
  parGungurkActions.innerHTML = `${gungurk.name} steps 5 feet away from the Chasm. He is now ${distance.feet} feet away from the Chasm.`;
  gungurk.state = "idle";
}
