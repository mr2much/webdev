// import { gameObject } from "../../../../js/gameBehavior.js";

let btnThrowAxe = document.querySelector("#throw-axe");
let btnHackvine = document.querySelector("#hackvine");

let gameObj;
window.addEventListener("load", (e) => {
  gameObj = gameObject;
  console.log(`Number of Enemies: ${gameObj.enemies.length}`);

  gameObj.creatures.players.theStone.weapon = gameObj.weapons.handaxe;

  btnThrowAxe.addEventListener("click", optionOneWasClicked);
  btnHackvine.addEventListener("click", optionTwoWasClicked);
});

function optionOneWasClicked() {
  console.log("Option One Was Clicked");
}

function optionTwoWasClicked() {
  let newScene = window.open("2a_hackvine/2a_hackvine.html");
  newScene.onload = function () {
    this.gameObject = gameObj;
  };
  console.log("Combat initiated");
}
