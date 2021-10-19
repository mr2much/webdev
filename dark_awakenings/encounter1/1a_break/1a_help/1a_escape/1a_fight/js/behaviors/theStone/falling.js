import {
  behaviorMap,
  gameObj,
  notifyObservers,
  allies,
} from "../../1a_fight.js";

export function falling(theStone) {
  disableAllOptions();

  let paragraphTheStoneActions = document.querySelector(`#${theStone.id}`);

  //   paragraphTheStoneActions.innerHTML = `${theStone.name} plummets into the chasm, falling into water as the ${taintedRoot.name} drags you the the remaining 5 feet over the edge.`;

  let fallDamage = Math.floor(Math.random() * 10 + 1);
  theStone.receiveDamage(fallDamage);

  paragraphTheStoneActions.innerHTML += `<br>${theStone.name} receives ${fallDamage} of damage from the fall.`;

  notifyObservers(theStone);

  if (theStone.hp <= 0) {
    // load dead scenario after a set interval
    console.log(`${theStone.name} died from the fall!`);

    paragraphTheStoneActions.innerHTML += ` The fall killed ${theStone.name}.`;

    theStone.state = "dead";

    return;
  } else {
    //   Must make a pause
    setTimeout(() => {
      console.log("Executing timeout function");
      if (allies.indexOf(gameObj.creatures.players.gungurk) < 0) {
        let newScene = window.open(
          "../../../../../encounter2/gungurk_fell_first.html"
        );
        newScene.onload = function () {
          this.gameObject = gameObj;
        };
      } else {
        //   and then load the second encounter
        let newScene = window.open("../../../../../encounter2/stone_fell.html");

        newScene.onload = function () {
          this.gameObject = gameObj;
        };
      }
    }, 6000);

    // This is so that the game doesn't continue running.
    // TODO: Find a better way of doing this
    behaviorMap.clear();
  }
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
