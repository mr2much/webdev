let theStone = {};
let taintedRoot = {};
let paragraph = document.getElementById("narration");

window.addEventListener("load", (e) => {
  localStorage = window.localStorage;

  if (localStorage.getItem("stoneJson") !== null) {
    theStone = JSON.parse(localStorage.getItem("stoneJson"));
    console.log(`${theStone.name} loaded`);
    console.log(`${theStone.weapon.name} equipped`);
  }

  if (localStorage.getItem("taintedRootJson") !== null) {
    taintedRoot = JSON.parse(localStorage.getItem("taintedRootJson"));
    console.log(`${taintedRoot.name} loaded`);
  }

  attack(theStone, taintedRoot);
});

function optionOneWasClicked() {
  console.log(`${taintedRoot.hp}`);

  if (taintedRoot.hp > 0) {
    paragraph.innerHTML =
      "Despite your best efforst, the vine is still alive.<br><br>You hear Gungurk screaming behind you:<br><br>'Hurry up, precious! Hurry!'";
    attack(theStone, taintedRoot);
  } else {
    window.open("/dark_awakenings/encounter1/1a_break/1a_break_success.html");
  }
}

function attack(attacker, target) {
  console.log(`${attacker.name} is attacking with ${attacker.weapon.name}`);
  let damage = getTotalDamage(attacker);
  console.log(`Damage: ${damage}`);
  taintedRoot.hp = taintedRoot.hp - damage;
}

function getTotalDamage(attacker) {
  let totalDamage = Math.floor(
    Math.random() * attacker.weapon.damage +
      1 +
      Math.max(attacker.strengthMod, attacker.dexterityMod)
  );

  return totalDamage;
}
