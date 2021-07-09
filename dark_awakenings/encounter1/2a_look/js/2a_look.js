let theStone = {};
let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  theStone = gameObject.creatures.players.theStone;
  console.log(`${theStone.name} loaded. HP:${theStone.hp}`);
});

// function loadEnemies() {
//   enemies.forEach((el) => {
//     console.log(`${el.name} - HP:${el.hp}`);
//   });
// }

function optionOneWasClicked() {
  theStone.weapon = gameObj.weapons.handaxe;

  console.log(`${theStone.name} equipped ${theStone.weapon.name}!`);

  let newScene = window.open("1a_handaxe/1a_handaxe.html");
  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}
