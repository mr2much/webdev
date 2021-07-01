let paragraph = document.getElementById("narration");
let theStone = {};

window.addEventListener("load", (e) => {
  localStorage = window.localStorage;

  if (localStorage.getItem("stoneJson") !== null) {
    theStone = JSON.parse(localStorage.getItem("stoneJson"));

    if (hasAxe(theStone)) {
      paragraph.innerHTML =
        "It seems like the hand axe you hold in your hand might end up being more useful than you thought. Or not.";
    }
  }
});

function optionOneWasClicked() {
  console.log("You help Gungurk");

  if (hasAxe(theStone)) {
    window.open("1a_help/1a_help_axe.html");
  }

  window.open("1a_help_unarmed.html");
}

function optionTwoWasClicked() {
  console.log("You ran");
}

function hasAxe(character) {
  return character.weapon.name === "Handaxe";
}

console.log(enemies);
