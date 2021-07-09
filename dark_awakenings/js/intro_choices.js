const weapons = {
  punch: {
    name: "Punch",
    damage: 4,
  },
  handaxe: {
    name: "Handaxe",
    damage: 6,
  },
  dagger: {
    name: "Dagger",
    damage: 4,
  },
  longsword: {
    name: "Longsword",
    damage: 8,
  },
};

const players = {
  theStone: {
    name: "The Stone",
    hp: 30,
    strengthMod: 5,
    dexterityMod: 3,
    wisdomMod: 0,
    proficiencyBonus: 2,
    athletics: true,
    acrobatics: true,
    weapon: weapons.punch,
    attack() {
      let totalDamage = Math.floor(
        Math.random() * this.weapon.damage +
          1 +
          Math.max(this.strengthMod, this.dexterityMod)
      );
      console.log(
        `${this.name} attacks using ${this.weapon.name} and does ${totalDamage}`
      );

      return totalDamage;
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
  splug: {
    name: "Splug",
    hp: 26,
    strengthMod: 2,
    dexterityMod: 3,
    wisdomMod: 1,
    athletics: false,
    acrobatics: true,
    weapon: weapons.dagger,
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
    hp: 15,
    strengthMod: 2,
    dexterityMod: 3,
    wisdomMod: 1,
    athletics: true,
    acrobatics: false,
    weapon: {
      name: "Grasp",
      damage: 4,
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
  enemies: [],
};

console.log(gameObject);

let enemiesCount = 6;

(function () {
  for (let i = 0; i < enemiesCount; i++) {
    gameObject.enemies.push(
      Object.create(gameObject.creatures.hostiles.taintedRoot)
    );
  }
})();

gameObject.enemies[0].hp = 30;

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
