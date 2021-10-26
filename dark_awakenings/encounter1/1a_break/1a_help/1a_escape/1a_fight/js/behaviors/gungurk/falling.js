import { gameObj, behaviorMap, allies } from "../../1a_fight.js";

let display = document.getElementById("feedback");

export function falling(gungurk) {
  console.log(`Target: ${gungurk.name} fell`);
  let index = allies.indexOf(gungurk);

  if (index >= 0) {
    allies.splice(index, 1);
  }

  behaviorMap.remove(gungurk);

  let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
  paragraphGungurkActions.innerHTML += ` ${gungurk.name} squeals like a terrified pig, and he disappears into the chasm. He splashes down, followed by disconcerting silence. At least the root that dragged him into the chasm apparently died from the fall.`;

  let fallDamage = Math.floor(Math.random() * 10 + 1);

  paragraphGungurkActions.innerHTML += `<br>${gungurk.name} received ${fallDamage} points of damage from the fall.`;
  gungurk.receiveDamage(fallDamage);

  // this is to prevent that the Tainted Root keeps targetting Gungurk after he has fallen
  gameObj.removeFromParty(allies, gungurk); // should change targets

  // TODO: try to look for a way to avoid repeatedly checking the target's hp

  notifyObservers(gungurk);

  if (gungurk.hp <= 0) {
    console.log("The fall killed Gungurk");
    gungurk.state = "dead";

    paragraphGungurkActions.innerHTML += `<br>${gungurk.name} seems to have gone awfully quiet. You fear for the worse.`;
  }

  // timer to remove gungurk's paragraph from the page
  setTimeout(() => {
    let paragraphGungurkActions = document.querySelector(`#${gungurk.id}`);
    if (paragraphGungurkActions) {
      display.removeChild(paragraphGungurkActions);
    }
  }, 15000);

  //   behaviorMap.delete(gungurk);
}
