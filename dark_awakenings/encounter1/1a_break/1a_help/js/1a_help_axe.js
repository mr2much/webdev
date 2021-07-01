let theStone = {};
let taintedRoot = {};
let paragraph = document.getElementById("narration");

window.addEventListener("load", (e) => {
  localStorage = window.localStorage;
});

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
