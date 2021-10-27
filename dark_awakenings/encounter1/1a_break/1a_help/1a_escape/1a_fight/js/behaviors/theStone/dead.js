export function dead(theStone) {
  disableAllOptions();
  // check if The Stone died from the fall or due to damage
  //   behaviorMap.delete(theStone);
  console.log("The Stone died from the damage!");

  setTimeout(() => {
    // load scenario where you died from damage
    window.open("../../../../../gameover/you_were_killed.html");
  }, 6000);
}

function disableAllOptions() {
  let allOptions = document.querySelectorAll("button.btn");

  for (let i = 0; i < allOptions.length; i++) {
    let button = allOptions[i];

    if (button.disabled) {
      continue;
    }

    toggleButton(button);
  }
}

function toggleButton(button) {
  button.disabled = !button.disabled;

  button.classList.toggle("noHover");
}
