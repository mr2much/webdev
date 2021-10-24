import { gameObj } from "../../1a_fight.js";

import { attack } from "./attack.js";
import { dead } from "./dead.js";
import { escape } from "./escape.js";
import { falling } from "./falling.js";
import { idle } from "./idle.js";
import { retreat } from "./retreat.js";

const behaviors = {
  attack,
  dead,
  escape,
  falling,
  idle,
  retreat,
};

export function gungurkBehaviorHandler(gungurk) {
  let state = gungurk.state;
  let distance = gameObj.getDistanceForCharacter(gungurk);

  if (distance.feet <= 0) {
    state = "falling";
  } else if (distance.feet < 15) {
    state = "retreat";
  }

  if (gungurk.condition === "grappled") {
    state = "escape";
  }

  if (gungurk.hp <= 0) {
    gungurk.state = "dead";
  }

  if (behaviors[state]) {
    behaviors[state](gungurk);
  }
}
