import { theStone, gungurk } from "./characters.js";
import { taintedRoot } from "./enemies.js";
import { punch, handaxe, dagger, longsword, grasp, drag } from "./weapons.js";
import { distanceFromChasm } from "./gameProperties.js";

//TODO: move this to its own separate file, possibly game.js
export const gameObject = {
  weapons: {
    punch: punch,
    handaxe: handaxe,
    dagger: dagger,
    longsword: longsword,
    grasp: grasp,
    drag: drag,
  },
  creatures: { players: { theStone, gungurk }, hostiles: { taintedRoot } },
  distanceFromChasm,
  party: [],
  enemies: [],
  attack(attacker, target) {
    console.log(
      `${attacker.name} is attacking ${target.name} with ${attacker.weapon.name}`
    );
    if (this.attackHits(attacker, target)) {
      let damage = attacker.attack(target);
      target.receiveDamage(damage);
      console.log(`${target.name} received ${damage} points of damage!`);
      console.log(`${target.hp}`);

      return damage;
    }

    return 0;
  },

  attackHits(attacker, target) {
    if (attacker.weapon.alwaysHit) {
      return true;
    }

    let attackRoll = attacker.rollAttack();

    return target.attackHits(attackRoll);
  },

  getTotalDamage(attacker) {
    let totalDamage = Math.floor(
      Math.random() * attacker.weapon.damage +
        1 +
        Math.max(attacker.strengthMod, attacker.dexterityMod)
    );

    return totalDamage;
  },
  getDistanceForCharacter({ name }) {
    return gameObject.distanceFromChasm.find((char) => char.name === name);
  },
  removeFromParty(party, member) {
    let index = party.indexOf(member);

    if (index > 0) {
      party.splice(index, 1);
    }
  },
};
