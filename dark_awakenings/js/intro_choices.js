const weapons = {
  punch: {
    name: "Punch",
    damage: 4,
    alwaysHit: false,
  },
  handaxe: {
    name: "Handaxe",
    damage: 6,
    alwaysHit: false,
  },
  dagger: {
    name: "Dagger",
    damage: 4,
    alwaysHit: false,
  },
  longsword: {
    name: "Longsword",
    damage: 8,
    alwaysHit: false,
  },
  grasp: {
    name: "Grasp",
    damage: 4,
    alwaysHit: false,
  },
  drag: {
    name: "Drag",
    damage: 2,
    alwaysHit: true,
  },
};

//TODO: If I implement a level up system. Proficiency Bonus is calculated as:
// pb = (Level / 4) + 1; rounded up

const players = {
  theStone: {
    name: "The Stone",
    maxHP: 30,
    hp: 30,
    armor: 19,
    proficiencyBonus: 2,
    strengthMod: 5,
    dexterityMod: 3,
    wisdomMod: 0,
    proficiencyBonus: 2,
    athletics: true,
    acrobatics: true,
    weapon: weapons.punch,
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
  },
  gungurk: {
    name: "Gungurk",
    maxHP: 26,
    hp: 26,
    armor: 16,
    proficiencyBonus: 2,
    strengthMod: 2,
    dexterityMod: 3,
    wisdomMod: 1,
    athletics: false,
    acrobatics: true,
    weapon: weapons.dagger,
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
  },
};

const hostiles = {
  taintedRoot: {
    name: "Tainted Root",
    maxHP: 30,
    hp: 30,
    armor: 15,
    proficiencyBonus: 2,
    strengthMod: 2,
    dexterityMod: 3,
    wisdomMod: 1,
    athletics: true,
    acrobatics: false,
    weapon: weapons.grasp,
    targetGrappled: false,
    target: {},
    hasTargetGrappled() {
      return this.targetGrappled;
    },
    grabTarget(target) {
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
  },
};

const creatures = { players: players, hostiles: hostiles };

const gameObject = {
  weapons: weapons,
  creatures: creatures,
  allies: [],
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
};

console.log(gameObject);

let enemiesCount = 6;

(function () {
  gameObject.allies.push(Object.create(gameObject.creatures.players.theStone));
  gameObject.allies.push(Object.create(gameObject.creatures.players.gungurk));
})();

(function () {
  for (let i = 0; i < enemiesCount; i++) {
    gameObject.enemies.push(
      Object.create(gameObject.creatures.hostiles.taintedRoot)
    );
  }
})();

function optionOneWasClicked() {
  console.log("Option1 was clicked");
  let dice = 20;
  let stoneCheck = doStrengthCheck(theStone, dice);
  let rootCheck = doStrengthCheck(enemies[0], dice);

  console.log("The Stone: " + stoneCheck);
  console.log("Root: " + rootCheck);

  if (true) {
    var newScene = window.open("encounter1/1a_break/1a_break_success.html");
  } else {
    window.open("encounter1/1a_break/1a_break_fail.html");
  }

  //   if (stoneCheck >= rootCheck) {
  //     window.open("chapter1/encounter1 - choice1a.html");
  //   } else {
  //     window.open("chapter1/encounter1 - choice1b.html");
  //   }
}

function doStrengthCheck(character, faces) {
  return rollDie(faces) + character.escapeGrapple();
}

function rollDie(faces) {
  return Math.floor(Math.random() * faces);
}

function optionTwoWasClicked() {
  let newScene = window.open(
    "/dark_awakenings/encounter1/2a_look/2a_look.html"
  );
  newScene.onload = function () {
    this.gameObject = gameObject;
  };
}

function optionThreeWasClicked() {
  let dice = 20;
  let survivalCheck = doSurvivalCheck(theStone, dice);
  if (survivalCheck >= 15) {
    console.log("YOU PASS WISDOM CHECK");
  } else {
    console.log("YOU FAIL WISDOM CHECK");
  }
}

function doSurvivalCheck(character, faces) {
  return rollDie(faces) + character.getWisdomMod();
}
