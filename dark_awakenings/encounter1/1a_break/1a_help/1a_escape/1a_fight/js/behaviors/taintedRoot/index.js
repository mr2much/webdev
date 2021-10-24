import { dead } from "./dead.js";
import { idle } from "./idle.js";
import { attack } from "./attack.js";
import { drag } from "./drag.js";

const behaviors = {
  attack,
  dead,
  drag,
  idle,
};

export function taintedRootBehaviorHandler(enemy) {
  let state = enemy.state;

  if (enemy.hp <= 0) {
    state = "dead";
  }

  if (behaviors[state]) {
    behaviors[state](enemy);
  }
}
