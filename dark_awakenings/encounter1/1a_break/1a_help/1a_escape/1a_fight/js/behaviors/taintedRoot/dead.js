import { behaviorMap, entities } from "../../1a_fight.js";

function dead(enemy) {
  // if taintedRoot is dead, remove it from entities and pick a new taintedRoot
  let index = entities.indexOf(enemy);

  if (index >= 0) {
    entities.splice(index, 1);
  }

  behaviorMap.delete(enemy);
}

export { dead };
