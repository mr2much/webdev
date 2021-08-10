let paragraph = document.getElementById("narration");
let theStone = {};
let gungurk = {};
let taintedRoot = {};
let gameObj;

window.addEventListener("load", (e) => {
  gameObj = gameObject;

  theStone = gameObj.creatures.players.theStone;
  gungurk = gameObj.creatures.players.gungurk;
  taintedRoot = gameObj.creatures.hostiles.taintedRoot;

  // in this scenario, we start with Gungurk grappled by the vine
  taintedRoot.grabTarget(gungurk);

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

function hasAxe(character) {
  return character.weapon.name === "Handaxe";
}

function optionTwoWasClicked() {
  // is this check necessary? in this particular scenario, Gungurk will probably always be grappled anyways.
  for (var i = 0; i < gameObj.party.length; i++) {
    console.log(gameObj.party[i].name);
  }
  if (taintedRoot.hasTargetGrappled()) {
    let index = gameObj.party.indexOf(gungurk);
    gameObj.party.splice(index, 1);

    for (var i = 0; i < gameObj.party.length; i++) {
      console.log(gameObj.party[i].name);
    }

    console.log("You escaped alone");
    let newScene = window.open("../conclusions/the_stone_escaped_alone.html");

    newScene.onload = function () {
      this.gameObject = gameObj;
    };
  } else {
    // In this particular scenario, it's unlikely we will ever get here.
    console.log("You escaped with Gungurk");
  }
  console.log("You ran");
}
