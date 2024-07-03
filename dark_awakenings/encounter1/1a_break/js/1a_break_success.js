let paragraph = document.getElementById("narration");
let theStone = {};
let gungurk = {};
let taintedRoot = {};
let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  theStone = gameObj.creatures.players.theStone;
  gungurk = gameObj.creatures.players.gungurk;
  taintedRoot = gameObj.enemies[0];

  // in this scenario, we start with Gungurk grappled by the vine
  taintedRoot.grabTarget(gungurk);
  console.log(`Number of Enemies: ${gameObj.enemies.length}`);

  if (hasAxe(theStone)) {
    paragraph.innerHTML =
      "It seems like the hand axe you hold in your hand might end up being more useful than you thought. Or not.";
  }
});

function optionOneWasClicked() {
  console.log("You help Gungurk");

  taintedRoot.targetGrappled = false;
  let newScene;

  if (hasAxe(theStone)) {
    console.log(`${theStone.name} has ${theStone.weapon.name}`);
    newScene = window.open("1a_help/1a_help_axe.html");
  } else {
    newScene = window.open("1a_help/1a_help_unarmed.html");
  }

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}

function hasAxe({ weapon }) {
  return weapon.name === "Handaxe";
}

function optionTwoWasClicked() {
  console.log("You escaped alone");
  let newScene = window.open("../conclusions/the_stone_escaped_alone.html");

  newScene.onload = function () {
    this.gameObject = gameObj;
  };

  console.log("You ran");
}
