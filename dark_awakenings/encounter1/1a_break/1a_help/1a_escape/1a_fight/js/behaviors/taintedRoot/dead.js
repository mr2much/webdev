import { behaviorMap, entities } from "../../1a_fight.js";

export function dead(enemy) {
  // if taintedRoot is dead, remove it from entities and remove its behavior
  let index = entities.indexOf(enemy);

  if (index >= 0) {
    entities.splice(index, 1);
  }

  behaviorMap.delete(enemy);
}
