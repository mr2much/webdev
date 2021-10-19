import { behaviorMap } from "../../1a_fight.js";

export function dead(theStone) {
  disableAllOptions();
  // check if The Stone died from the fall or due to damage
  //   behaviorMap.delete(theStone);
  console.log("The Stone died from the damage!");

  behaviorMap.clear();

  // TODO: Load scenario with The Stone's dead

  //   // TODO: Should load dead scenario specifying The Stone died from the damage
  //   behaviorMap.delete("enemy");
  //   if (gameObj.creatures.players.gungurk.hp > 0) {
  //     behaviorMap.delete(gameObj.creatures.players.gungurk);
  //   }
}

function disableAllOptions() {
  let allOptions = document.querySelectorAll("button.btn");

  for (let i = 0; i < allOptions.length; i++) {
    let button = allOptions[i];

    if (button.disabled) {
      continue;
    }

    toggleButton(button);
  }
}

function toggleButton(button) {
  button.disabled = !button.disabled;

  button.classList.toggle("noHover");
}
