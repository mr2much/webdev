let paragraph = document.getElementById("narration");
let theStone = {};
let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  theStone = gameObj.creatures.players.theStone;
  if (hasAxe(theStone)) {
    paragraph.innerHTML =
      "It seems like the hand axe you hold in your hand might end up being more useful than you thought. Or not.";
  }

  // if (localStorage.getItem("stoneJson") !== null) {
  //   theStone = JSON.parse(localStorage.getItem("stoneJson"));

  //   if (hasAxe(theStone)) {
  //     paragraph.innerHTML =
  //       "It seems like the hand axe you hold in your hand might end up being more useful than you thought. Or not.";
  //   }
  // }
});

function optionOneWasClicked() {
  console.log("You help Gungurk");

  let newScene;

  if (hasAxe(theStone)) {
    console.log(`${theStone.name} has ${theStone.weapon.name}`);
    newScene = window.open("1a_help/1a_help_axe.html");
  } else {
    newScene = window.open("1a_help_unarmed.html");
  }

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function hasAxe(character) {
  return character.weapon.name === "Handaxe";
}

function optionTwoWasClicked() {
  console.log("You ran");
}
