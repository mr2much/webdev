import {
  gameObj,
  hpObservers as notifyObservers,
  allies,
} from "../../1a_fight.js";

export function falling(theStone) {
  disableAllOptions();

  let paragraphTheStoneActions = document.querySelector(`#${theStone.id}`);

  //   paragraphTheStoneActions.innerHTML = `${theStone.name} plummets into the chasm, falling into water as the ${taintedRoot.name} drags you the the remaining 5 feet over the edge.`;

  let fallDamage = Math.floor(Math.random() * 10 + 1);
  theStone.receiveDamage(fallDamage);

  paragraphTheStoneActions.innerHTML += `<br>${theStone.name} receives ${fallDamage} of damage from the fall.`;

  notifyObservers.notify(theStone);

  if (theStone.hp <= 0) {
    // load dead scenario after a set interval
    paragraphTheStoneActions.innerHTML += ` The fall killed ${theStone.name}.`;

    theStone.state = "dead";
    theStone.condition = "fell";

    setTimeout(() => {
      // load scenario where you died from the fall
      window.open("../../../../../gameover/you_drowned.html");
    }, 6000);

    return;
  } else {
    //   Must make a pause
    setTimeout(() => {
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
