const localStorage = window.localStorage;

const punch = {
  name: "Punch",
  damage: 4,
};

const handaxe = {
  name: "Handaxe",
  damage: 6,
};

const dagger = {
  name: "Dagger",
  damage: 4,
};

const longsword = {
  name: "Longsword",
  damage: 8,
};

const grasp = {
  name: "Grasp",
  damage: 4,
};

const theStone = {
  name: "The Stone",
  hp: 30,
  strengthMod: 5,
  dexterityMod: 3,
  wisdomMod: 0,
  proficiencyBonus: 2,
  athletics: true,
  acrobatics: true,
  weapon: punch,
  attack() {
    let totalDamage = Math.floor(
      Math.random() * this.weapon.damage +
        1 +
        Math.max(this.strengthMod, this.dexterityMod)
    );
    console.log(
      `${this.name} attacks using ${this.weapon.name} and does ${totalDamage}`
    );
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

const splug = {
  name: "Splug",
  hp: 26,
  strengthMod: 2,
  dexterityMod: 3,
  wisdomMod: 1,
  athletics: false,
  acrobatics: true,
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

const taintedRoot = {
  name: "Tainted Root",
  hp: 15,
  strengthMod: 2,
  dexterityMod: 3,
  wisdomMod: 1,
  athletics: true,
  acrobatics: false,
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

const enemies = [];
let enemiesCount = 6;

(function () {
  for (let i = 0; i < enemiesCount; i++) {
    enemies.push(Object.create(taintedRoot));
  }
})();

enemies[0].hp = 300;

window.addEventListener("load", (e) => {
  saveObjectsAsJSONInLocalStorage();
});

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
    this.enemies = enemies;
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

function saveObjectsAsJSONInLocalStorage() {
  localStorage.setItem("stoneJson", JSON.stringify(theStone));
  localStorage.setItem("splugJson", JSON.stringify(splug));
  localStorage.setItem("taintedRootJson", JSON.stringify(enemies[0]));

  localStorage.setItem("punchJson", JSON.stringify(punch));
  localStorage.setItem("handaxeJson", JSON.stringify(handaxe));
  localStorage.setItem("daggerJson", JSON.stringify(dagger));
  localStorage.setItem("longswordJson", JSON.stringify(longsword));
  localStorage.setItem("graspJson", JSON.stringify(grasp));
}
