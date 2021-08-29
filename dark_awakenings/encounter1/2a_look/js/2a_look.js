let theStone = {};
let gameObj;

let divFeedback = document.getElementById("feedback");
let olChoices = document.getElementById("choices");
let liOneTimeChoice = document.getElementById("one-time-choice");

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  theStone = gameObject.creatures.players.theStone;
  console.log(`${theStone.name} loaded. HP:${theStone.hp}`);
  console.log(`Number of Enemies: ${gameObj.enemies.length}`);
});

function optionOneWasClicked() {
  theStone.weapon = gameObj.weapons.handaxe;

  console.log(`${theStone.name} equipped ${theStone.weapon.name}!`);

  let newScene = window.open("1a_handaxe/1a_handaxe.html");
  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function optionTwoWasClicked() {
  console.log("You try to break free from the vines");
}

function optionThreeWasClicked() {
  console.log(
    "You let the vine drag you closer to the entrance of your tent and try to hold on to the tent's wall."
  );

  olChoices.removeChild(liOneTimeChoice);

  // this references are not needed here anymore
  liOneTimeChoice = null;
  // olChoices = null;
}
