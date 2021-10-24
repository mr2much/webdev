import { gameObj, hpObservers as notifyObservers } from "../../1a_fight.js";

export function attack(theStone) {
  let enemy = theStone.target;

  // If the enemy is still alive
  if (enemy.hp > 0) {
    // Attack it
    let attacker = theStone;

    execute(attacker, enemy);

    // If the attack killed the enemy Tainted Root
    if (enemy.hp <= 0) {
      // TODO: This can be a function
      // if The Stone has not fallen yet
      let distance = gameObj.getDistanceForCharacter(theStone);

      if (distance.feet >= 5) {
        let actionParagraph;
        distance.feet += 5;
        actionParagraph = document.querySelector(`#${theStone.id}`);
        actionParagraph.innerHTML += `<br>${theStone.name} steps 5 feet away from the Chasm!`;
      }

      theStone.target = null;
      theStone.state = "idle";
    }
  } else {
    theStone.target = null;
    theStone.state = "idle";
  }
}

function execute(attacker, enemy) {
  let damageDealt = gameObj.attack(attacker, enemy);

  let actionParagraph = document.querySelector(`#${attacker.id}`);

  if (damageDealt === 0) {
    actionParagraph.innerHTML = `${attacker.name}'s attack failed to hit target ${enemy.name}${enemy.uid}.`;
  } else {
    actionParagraph.innerHTML = `${attacker.name} dealt ${damageDealt} points of damage to ${enemy.name}${enemy.uid}.`;

    notifyObservers.notify(enemy);
  }
}
