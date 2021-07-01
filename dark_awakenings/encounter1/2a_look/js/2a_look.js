let localStorage = {};
let theStone = {};
let group;

window.addEventListener("load", (e) => {
  localStorage = window.localStorage;

  if (localStorage.getItem("stoneJson") !== null) {
    theStone = JSON.parse(localStorage.getItem("stoneJson"));
    console.log(`${theStone.name} loaded`);
  }

  group = enemies;
});

function loadEnemies() {
  enemies.forEach((el) => {
    console.log(`${el.name} - HP:${el.hp}`);
  });
}

function optionOneWasClicked() {
  let handaxe = {};

  if (localStorage.getItem("handaxeJson") !== null) {
    handaxe = JSON.parse(localStorage.getItem("handaxeJson"));
    console.log(`${handaxe.name} equipped!`);
    theStone.weapon = handaxe;
    localStorage.setItem("stoneJson", JSON.stringify(theStone));
    let newScene = window.open("1a_handaxe/1a_handaxe.html");
    newScene.onload = function () {
      this.enemies = group;
    };
  }
}
