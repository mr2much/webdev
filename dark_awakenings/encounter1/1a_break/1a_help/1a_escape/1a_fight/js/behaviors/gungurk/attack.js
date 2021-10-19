import { gameObj, notifyObservers } from "../../1a_fight.js";

export function attack(gungurk) {
  // Pick a random tainted root from the array of enemies
  let enemy = gungurk.target;

  if (enemy.hp > 0) {
    let attacker = gungurk;

    execute(attacker, enemy);

    console.log(`UID: ${enemy.uid} HP: ${enemy.hp}`);

    if (enemy.hp <= 0) {
      enemyDied(enemy);

      let distance = gameObj.getDistanceForCharacter(gungurk);

      // TODO: This can be a function
      // if target has not fallen yet
      if (distance.feet >= 5) {
        let actionParagraph;
        distance.feet += 5;
        actionParagraph = document.querySelector(`#${gungurk.id}`);
        actionParagraph.innerHTML += `<br>${gungurk.name} steps 5 feet away from the Chasm!`;
        console.log(`${distance.name} is now ${distance.feet}`);
      }

      gungurk.target = null;
      gungurk.state = "idle";
    }
  } else {
    gungurk.target = null;
    gungurk.state = "idle";
  }
}

function execute(attacker, enemy) {
  console.log("GUNGURK ESTA ATACANDO!!!");
  let damageDealt = gameObj.attack(attacker, enemy);

  let actionParagraph = document.querySelector(`#${attacker.id}`);

  if (damageDealt === 0) {
    actionParagraph.innerHTML = `${attacker.name}'s attack failed to hit target ${enemy.name}${enemy.uid}.`;
  } else {
    actionParagraph.innerHTML = `${attacker.name} dealt ${damageDealt} points of damage to ${enemy.name}${enemy.uid}.`;

    notifyObservers(enemy);
  }
}
