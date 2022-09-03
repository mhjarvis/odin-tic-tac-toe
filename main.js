 
/* ======================
        GAMEBOARD OBJ
   ====================== */

   const gameBoard = (() => {

    let boardStatus = ['', '', '', '', '', '', '', '', ''];
    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function buildGameBoard() {
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i}`);
            box.innerHTML = boardStatus[i];
        }
    }

    /* ====================== EVENT LISTENERS ====================== */

    for(let i = 0; i < 9; i++) {
        const box = document.getElementById(`box${i}`);     // for all individual game squares
        box.addEventListener("click", function() {
            
            if(boardStatus[i] !== '') {                     // do nothing if index has a value
                return;
            }
            
            makeMark(i);
            checkForWin();
            gamePlay.playTurn();
        })
    }

    const startButton = document.querySelector('.start-game-button');       // start-game button
    startButton.addEventListener("click", function() {
        console.log("start-button");
    })
    
    const resetButton = document.querySelector('.reset-game-button');       // reset-game button
    resetButton.addEventListener("click", function() {
        console.log("restart-button");
        resetGameBoard();
    })

    /* ====================== RESET GAME BOARD ====================== */

    function resetGameBoard() {
        boardStatus = ['', '', '', '', '', '', '', '', ''];
        buildGameBoard();
    }

    function makeMark(position) {
        boardStatus[position] = gamePlay.getCurrentPlayersMark();
        buildGameBoard();
    }

    function checkForWin() {

        for(let i = 0; i < 8; i++) {
            if(boardStatus[winCondition[i][0]] === 'X' && boardStatus[winCondition[i][1]] === 'X' && boardStatus[winCondition[i][2]] === 'X') {
                console.log('X Wins');
            } else if(boardStatus[winCondition[i][0]] === 'O' && boardStatus[winCondition[i][1]] === 'O' && boardStatus[winCondition[i][2]] === 'O') {
                console.log('O Wins');
            }
        }
    }

    return { buildGameBoard, winCondition };
})();



/* ======================
        PLAYER FACTORY
   ====================== */

const player = (playerName, playerMark) => {
    let wins = 0;
    return { playerName, playerMark, wins};
}

// Create player and computer
const player1 = player('Player 1', '');
const player2 = player('Player 2', '');



/* ======================
        GAME-PLAY OBJ
   ====================== */
   
const gamePlay = (() => {

    gameBoard.buildGameBoard();                 // initialize gameboard

    let playerTurn = pickWhoGoesFirst();        // hold current player's turn
    updatePlayerTurnInDOM();                    // set initial value for playerturn

    /* ====================== PLAY TURN ====================== */
    function playTurn() {

        updatePlayerTurn();                     // update the current player status 
        updatePlayerTurnInDOM();                // notify players who's turn it is

    }

    /* ====================== TEXT OUTPUT TO PLAYERS ====================== */
    function updatePlayerTurnInDOM() {
        console.log(playerTurn.playerName + " in dom");

        const turnText = document.querySelector('.scoreboard-updates');

        if(turnText.innerHTML === '') {
            turnText.innerHTML = `${playerTurn.playerName} goes first.`;
            return;
        }

        turnText.innerHTML = '';
        turnText.innerHTML += `It is ${playerTurn.playerName}'s turn.`;
    }

    /* ====================== PLAYER TURN UPDATER ====================== */
    function updatePlayerTurn() {
        if(playerTurn == player1) {
            playerTurn = player2;
        } else {
            playerTurn = player1;
        }
    }

    /* ====================== SET WHO GOES FIRST / SET PLAYER MARKERS ====================== */
    function pickWhoGoesFirst() {
        if(Math.random() >= 0.5) {
            player1.playerMark = 'X';
            player2.playerMark = 'O';
            return player1;
        }
        player2.playerMark = 'X';
        player1.playerMark = 'O';
        return player2;
    } 

    function getCurrentPlayersMark() {
        return playerTurn.playerMark;
    }

    return { playTurn, getCurrentPlayersMark, updatePlayerTurn }
})();

   
/*
4. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

5. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

6. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!

    6a. Start by just getting the computer to make a random legal move.
    6b. Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
    6c. If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

*/

/* To Do:

Game Object:
    1. setCurrentPlayer();
    2. startGameButton() action (event listener is added)

Gameboard Object:
    1. checkForMark()
    2. addMarkToBoard()
    3. checkWinCondition();
        a. output after window

Player Object:
    1. setPlayerName() */



/* Completed:

Game Object:
    3. resetGameButton() action (event listener is added) - completed, resets array and displays array;

Gameboard Object:


Player Object:

*/
