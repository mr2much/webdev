let gameObj;

function optionOneWasClicked() {
  console.log("You investigate the chasm");
}

function optionTwoWasClicked() {
  console.log("You run away");
}

function optionThreeWasClicked() {
  console.log("You search the campsite");

  let newScene = window.open(
    "../../../../../conclusions/you_search_the_camp.html"
  );

  newScene.onload = function () {
    this.gameObject = gameObj;
  };
}
