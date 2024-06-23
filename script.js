let boxes = document.querySelectorAll(".gridBlocks");
let winText = document.querySelector(".result");
let body = document.querySelector("body");
let playerTurn1 = document.querySelector("#playerTurn1");
let playerTurn2 = document.querySelector("#playerTurn2");
let playerTurn = 1;
let totalMoves = 0;
let winner = -1;
let winArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [1, 5, 9],
];

function removeEvents() {
  boxes.forEach((box) => {
    box.removeEventListener("click", clickFunction);
  });
}

const checkWin = (params) => {
  let winner = -1;
  for (let arr of winArray) {
    let pos1Val = boxes[arr[0] - 1].innerText;
    let pos2Val = boxes[arr[1] - 1].innerText;
    let pos3Val = boxes[arr[2] - 1].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        if (pos1Val == "x") winner = 1;
        else if (pos1Val == "o") winner = 2;
      }
    }
  }
  return winner;
};

const playerTurnFunc = () => {
  if (winner != -1 || totalMoves >= 9) {
    playerTurn1.style.visibility = "hidden";
    playerTurn2.style.visibility = "hidden";
    return;
  }
  // Remove all the previously added classes
  body.classList.remove("toRedClass", "toGreenClass");

  // Add the respective color class according to player's turn
  if (playerTurn == 1) {
    body.classList.add("toRedClass");
    playerTurn2.style.visibility = "hidden";
    playerTurn1.style.visibility = "initial";
  } else if (playerTurn == 2) {
    body.classList.add("toGreenClass");
    playerTurn1.style.visibility = "hidden";
    playerTurn2.style.visibility = "initial";
  }
};

const checkDraw = () => {
  if (totalMoves == 9 && winner == -1) {
    winText.innerText = "Match Draw";
    removeEvents();
  }
};
playerTurnFunc();
function clickFunction(evt) {
  let box = evt.target;
  let boxId = box.getAttribute("id");
  let boxStatus = box.getAttribute("status");

  if (playerTurn == 1 && boxStatus == "unclicked") {
    box.style.backgroundColor = "red";
    playerTurn = 2;
    box.innerText = "x";
    box.setAttribute("status", "player1");
    totalMoves++;
  } else if (playerTurn == 2 && boxStatus == "unclicked") {
    box.style.backgroundColor = "rgb(0, 200, 0)";
    playerTurn = 1;
    box.innerText = "o";
    box.setAttribute("status", "player2");
    totalMoves++;
  }

  console.log("clicked -", boxId);
  winner = checkWin();
  console.log(winner);
  if (winner == 1) {
    winText.innerText = "Player - 1 Win";
    removeEvents();
  } else if (winner == 2) {
    winText.innerText = "Player - 2 Win";
    removeEvents();
  }

  playerTurnFunc();
  checkDraw();
}

// Add event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", clickFunction);
});
