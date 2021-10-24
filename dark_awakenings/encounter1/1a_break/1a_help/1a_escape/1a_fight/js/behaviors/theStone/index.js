import { gameObj } from "../../1a_fight.js";

import { idle } from "./idle.js";
import { attack } from "./attack.js";
import { dead } from "./dead.js";
import { falling } from "./falling.js";
import { escape } from "./escape.js";

let btnBreak = document.getElementById("break");

const behaviors = {
  attack,
  dead,
  escape,
  falling,
  idle,
};

export function theStoneBehaviorHandler(theStone) {
  let state = theStone.state;
  let distance = gameObj.getDistanceForCharacter(theStone);

  if (distance.feet <= 0) {
    theStone.state = "falling";
  }

  btnBreak.disabled = !(theStone.condition === "grappled");

  if (btnBreak.disabled) {
    btnBreak.classList.add("noHover");
  } else {
    btnBreak.classList.remove("noHover");
  }

  if (theStone.hp <= 0) {
    theStone.state = "dead";
  }

  if (behaviors[state]) {
    behaviors[state](theStone);
  }
}
