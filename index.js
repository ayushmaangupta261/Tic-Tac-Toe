const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer; // X or O, initially X
let gameGrid; // status of the game

const winningPositions = [
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// lets create a function to initiate the game
function initGame() {
    // newGameBtn.classList.add("active");
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    // Empty on ui also
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //    remove green color, initialize box with css properties again
        box.classList = `box box${index + 1}`;

        box.classList = `box box${index + 1}`;
    })

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    // update on UI
    gameInfo.innerText = ` Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // check if winner is x
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            // if won then stop the game
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Now we know the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // if we have a winner
    if (answer !== "") {
        // gameInfo.innerText = ``;
        gameInfo.innerText = ` Winner is - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //If answer is empty then there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    //board is filled then game is tied
    if (fillCount === 9) {
        // gameGrid.innerText = ``;
        gameInfo.innerText = `Game Tied !!`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap the turn
        swapTurn();
        //check winning
        checkGameOver();
    }
}

newGameBtn.addEventListener("click", initGame);