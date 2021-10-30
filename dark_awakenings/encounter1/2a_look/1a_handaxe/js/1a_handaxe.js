let btnThrowAxe = document.querySelector("#throw-axe");
let btnHackvine = document.querySelector("#hackvine");

let gameObj;
window.addEventListener("load", (e) => {
  gameObj = gameObject;

  gameObj.creatures.players.theStone.weapon = gameObj.weapons.handaxe;

  console.log(`Number of Enemies: ${gameObj.enemies.length}`);

  btnThrowAxe.addEventListener("click", optionOneWasClicked);
  btnHackvine.addEventListener("click", handaxeHackVineOption);
});

function optionOneWasClicked() {
  console.log("Option One Was Clicked");
}

function handaxeHackVineOption() {
  console.log("Option Two Was Clicked on 1a_handaxe");
  let newScene = window.open("2a_hackvine/2a_hackvine.html");
  newScene.onload = function () {
    this.gameObject = gameObj;
  };
  console.log("Combat initiated");
}
