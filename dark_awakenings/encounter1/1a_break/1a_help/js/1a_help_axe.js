let theStone = {};
let taintedRoot = {};
let paragraph = document.getElementById("narration");
let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;
  theStone = gameObj.creatures.players.theStone;
  taintedRoot = gameObj.enemies.shift();

  attack(theStone, taintedRoot);
});

function attack(attacker, target) {
  console.log(`${attacker.name} is attacking with ${attacker.weapon.name}`);
  let damage = getTotalDamage(attacker);
  target.hp = target.hp - damage;
  console.log(`Enemy: ${target.name} received ${damage} points of damage`);
  console.log(`${target.hp}`);
}

function getTotalDamage(attacker) {
  let totalDamage = Math.floor(
    Math.random() * attacker.weapon.damage +
      1 +
      Math.max(attacker.strengthMod, attacker.dexterityMod)
  );

  return totalDamage;
}

function optionOneWasClicked() {
  if (taintedRoot.hp > 0) {
    paragraph.innerHTML =
      "Despite your best efforts, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Keep going, precious! We believes in you!'";

    attack(theStone, taintedRoot);

    if (taintedRoot.hp <= 0) {
      console.log(`Enemy ${taintedRoot.name} was slain!`);
      let newScene = window.open(
        "/dark_awakenings/encounter1/1a_break/1a_help/1a_escape/1a_escape_success.html"
      );

      newScene.onload = function () {
        this.gameObject = gameObj;
      };
    }
  }
}

function optionTwoWasClicked() {
  console.log("You decided to run away!");
}
