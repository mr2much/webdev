export function dead(enemy) {
  let target = enemy.target;
  let paragraphTaintedRootActions = document.querySelector(
    `#${enemy.id}${enemy.uid}`
  );

  paragraphTaintedRootActions.innerHTML = `Enemy ${enemy.name}${enemy.uid} was slain!`;

  // if the Tainted Root was grabbing someone, who has not already fallen down into the Chasm
  if (target && target.hp > 0) {
    let condition = target.condition;

    switch (condition) {
      case "grappled":
        paragraphTaintedRootActions.innerHTML += ` ${target.name} is no longer grappled.`;
        target.condition = "healthy";

        break;

      default:
        break;
    }
  }
}
