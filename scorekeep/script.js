var pOneBtn = document.querySelector("#p-one");
var pTwoBtn = document.querySelector("#p-two");
var resetBtn = document.querySelector("#b-reset");
var pOneScr = 0;
var pTwoScr = 0;
var pOneScoreBoard = document.querySelector("#player-one");
var pTwoScoreBoard = document.querySelector("#player-two");
var inputWinScore = document.querySelector("#winScore");
var pGoal = document.querySelector("#goal");
var winningScore = 5;

var isWinner = false;

pOneBtn.addEventListener("click", function() {
  if (!isWinner) {
    pOneScr++;
    pOneScoreBoard.textContent = pOneScr;
    if (pOneScr >= winningScore) {
      isWinner = true;
      pOneScoreBoard.classList.add("winner");
    }
  }
});

pTwoBtn.addEventListener("click", function() {
  if (!isWinner) {
    pTwoScr++;
    pTwoScoreBoard.textContent = pTwoScr;
    if (pTwoScr >= winningScore) {
      isWinner = true;
      pTwoScoreBoard.classList.add("winner");
    }
  }
});

resetBtn.addEventListener("click", function() {
  reset();
});

inputWinScore.addEventListener("change", function() {
  winningScore = Number(this.value);
  pGoal.textContent = winningScore;
  reset();
});

function reset() {
  pOneScr = 0;
  pTwoScr = 0;
  pGoal.textContent = winningScore;
  pOneScoreBoard.textContent = pOneScr;
  pOneScoreBoard.classList.remove("winner");

  pTwoScoreBoard.textContent = pTwoScr;
  pTwoScoreBoard.classList.remove("winner");
  isWinner = false;
}

/* <h1><span id="player-one">0</span> to <span id="player-two">0</span></h1>
    <p>Playing to: <span id="goal">5</span></p>
    <input type="number" />
    <button id="p-one">Player One</button>
    <button id="p-two">Player Two</button>
    <button id="b-reset">Reset</button> */
