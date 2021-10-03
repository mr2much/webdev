import { punch, handaxe, dagger, longsword, grasp, drag } from "./weapons.js";

let rootPath = window.location.href.match(/^.*\//)[0];

const taintedRoot = {
  id: "taintedRoot",
  name: "Tainted Root",
  src: `${rootPath}res/img/TaintedRoot.png`,
  alt: "Tainted Root's character portrait",
  state: "idle",
  type: "hostile",
  maxHP: 30,
  hp: 30,
  armor: 15,
  proficiencyBonus: 2,
  strengthMod: 2,
  dexterityMod: 3,
  wisdomMod: 1,
  athletics: true,
  acrobatics: false,
  weapon: grasp,
  targetGrappled: false,
  target: {},
  isDead() {
    return this.hp <= 0;
  },
  hasTargetGrappled() {
    return this.targetGrappled;
  },
  grabTarget(target) {
    this.targetGrappled = true;
    this.target = target;
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
    if (Math.max(this.strengthMod, this.dexterityMod) === this.strengthMod) {
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

export { taintedRoot };
