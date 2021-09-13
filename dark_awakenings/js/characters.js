import { punch, handaxe, dagger, longsword, grasp, drag } from "./weapons.js";

const theStone = {
  id: "theStone",
  name: "The Stone",
  src: "./res/img/TheStone.jpg",
  alt: "The Stone's character portrait",
  maxHP: 30,
  hp: 30,
  armor: 19,
  proficiencyBonus: 2,
  strengthMod: 5,
  dexterityMod: 3,
  wisdomMod: 0,
  proficiencyBonus: 2,
  athletics: true,
  acrobatics: false,
  weapon: punch,
  isDead() {
    return this.getCurrentHP() <= 0;
  },
  getCurrentHP() {
    return this.hp;
  },
  setCurrentHP(hp) {
    this.hp = hp;
  },
  receiveDamage(damage) {
    this.hp -= damage;
  },
  receiveHealing(healing) {
    this.hp += healing;
  },
  attack(target) {
    let totalDamage = Math.floor(
      Math.random() * this.weapon.damage +
        1 +
        Math.max(this.strengthMod, this.dexterityMod)
    );
    console.log(
      `${this.name} attacks ${target.name} using ${this.weapon.name} and does ${totalDamage}`
    );

    return totalDamage;
  },
  rollAttack() {
    let attackRoll =
      Math.floor(
        Math.random() * 20 + 1 + Math.max(this.strengthMod, this.dexterityMod)
      ) + 2;

    return attackRoll;
  },
  attackHits(roll) {
    return roll >= this.armor;
  },
  equipWeapon(weapon) {
    this.weapon = weapon;
  },
  setStrengthMod(newValue) {
    this.strengthMod = newValue;
  },
  rollAthletics() {
    if (this.athletics) {
      return this.strengthMod + this.proficiencyBonus;
    }

    return this.strengthMod;
  },
  rollAcrobatics() {
    if (this.acrobatics) {
      return this.dexterityMod + this.proficiencyBonus;
    }

    return this.dexterityMod;
  },
  escapeGrapple() {
    if (
      Math.max(this.strengthMod, this.dexterityMod) === this.strengthMod ||
      athletics
    ) {
      return this.rollAthletics();
    }

    return this.rollAcrobatics();
  },
  getStrengthMod() {
    return this.strengthMod;
  },
  getWisdomMod() {
    return this.wisdomMod;
  },
};

const gungurk = {
  id: "gungurk",
  name: "Gungurk",
  src: "./res/img/Gungurk.jpg",
  alt: "Gungurk's character portrait",
  maxHP: 26,
  hp: 26,
  armor: 16,
  proficiencyBonus: 2,
  strengthMod: 2,
  dexterityMod: 3,
  wisdomMod: 1,
  athletics: false,
  acrobatics: true,
  weapon: dagger,
  getCurrentHP() {
    return this.hp;
  },
  setCurrentHP(hp) {
    this.hp = hp;
  },
  receiveDamage(damage) {
    this.hp -= damage;
  },
  receiveHealing(healing) {
    this.hp += healing;
  },
  attack(target) {
    let totalDamage = Math.floor(
      Math.random() * this.weapon.damage +
        1 +
        Math.max(this.strengthMod, this.dexterityMod)
    );
    console.log(
      `${this.name} attacks ${target.name} using ${this.weapon.name} and does ${totalDamage}`
    );

    return totalDamage;
  },
  rollAttack() {
    let attackRoll =
      Math.floor(
        Math.random() * 20 + 1 + Math.max(this.strengthMod, this.dexterityMod)
      ) + 2;

    return attackRoll;
  },
  attackHits(roll) {
    return roll >= this.armor;
  },
  setStrengthMod(newValue) {
    this.strengthMod = newValue;
  },
  rollAthletics() {
    if (this.athletics) {
      return this.strengthMod + this.proficiencyBonus;
    }

    return this.strengthMod;
  },
  rollAcrobatics() {
    if (this.acrobatics) {
      return this.dexterityMod + this.proficiencyBonus;
    }

    return this.dexterityMod;
  },
  escapeGrapple() {
    if (
      Math.max(this.strengthMod, this.dexterityMod) === this.strengthMod ||
      athletics
    ) {
      return this.rollAthletics();
    }

    return this.rollAcrobatics();
  },
  getStrengthMod() {
    return this.strengthMod;
  },
  getWisdomMod() {
    return this.wisdomMod;
  },
};

export { theStone, gungurk };
