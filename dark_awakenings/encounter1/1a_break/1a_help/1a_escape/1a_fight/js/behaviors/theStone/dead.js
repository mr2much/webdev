import { behaviorMap } from "../../1a_fight.js";

export function dead(theStone) {
  disableAllOptions();
  // check if The Stone died from the fall or due to damage
  //   behaviorMap.delete(theStone);
  console.log("The Stone died from the damage!");

  behaviorMap.clear();

  setTimeout(() => {
    if (theStone.condition === "fell") {
      // load scenario where you died from the fall
      window.open("../../../../../gameover/you_drowned.html");
    } else {
      // load scenario where you died from damage
      window.open("../../../../../gameover/you_were_killed.html");
    }
  }, 1000);
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
