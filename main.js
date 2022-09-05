 
/* ===============================================================================================
                                        GAMEBOARD OBJECT
   =============================================================================================== */

const gameBoard = (() => {

    let hasSomeoneWon = false;
    let ties = 0;
    let turnCount = 0;

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

    /* ====================== BOARD SETUP ====================== */
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
 -            runGameplayChecks(i);
        })

        box.onmouseover = function() {
            let value = gamePlay.getCurrentPlayersMark();
            if(boardStatus[i] === '' && hasSomeoneWon === false) {
                box.innerHTML = value;
            }
        }

        box.onmouseout = function() {
            let resetValue = '';
            if(boardStatus[i] === '') {
                box.innerHTML = resetValue;
            }
        }
    }

    const startButton = document.querySelector('.reset-board-button');       // start-game button
    startButton.addEventListener("click", function() {
        resetGameBoard();
    })
    
    const resetButton = document.querySelector('.reset-game-button');       // reset-game button
    resetButton.addEventListener("click", function() {
        resetGame();
    })

    /* ====================== CHECKS AND MAKING PLAYER MARK ====================== */
    function runGameplayChecks(i) {

        if(hasSomeoneWon){ return }             // stop making marks if there is a winner
        if(boardStatus[i] !== '') { return }    // prevent marks on squares that have been marked
        
        addPlayerMark(i);

        let checking = checkForWin();
        if(checking) {
            checking.wins++;
            updateScoreBoard();
            hasSomeoneWon = true;
            return;
        }
        gamePlay.playTurn();
    }

    /* ====================== RESET GAME BOARD ====================== */

    function resetGameBoard() {
        boardStatus = ['', '', '', '', '', '', '', '', ''];
        buildGameBoard();
        hasSomeoneWon = false;
        turnCount = 0;
        gamePlay.updatePlayerTurnInDOM();
    }

    /* ====================== RESET GAME ====================== */

    function resetGame() {
        resetGameBoard();
        gamePlay.player1.wins = 0;
        gamePlay.player2.wins = 0;
        ties = 0;
        updateScoreBoard();
    }

    /* ====================== UPDATE SCOREBOARD DISPLAY ====================== */
    function updateScoreBoard() {
        const player1Name = document.querySelector('.player-one-title');
        const player2Name = document.querySelector('.player-two-title');
        const player1Mark = document.querySelector('.player-one-score');
        const player2Mark = document.querySelector('.player-two-score');
        const tieScore = document.querySelector('.ties-score');
        player1Name.innerHTML = gamePlay.player1.playerName;
        player2Name.innerHTML = gamePlay.player2.playerName;
        player1Mark.innerHTML = gamePlay.player1.wins;
        player2Mark.innerHTML = gamePlay.player2.wins;
        tieScore.innerHTML = ties;
    }

    /* ====================== ADD MARK AND UPDATE GAME BOARD ====================== */
    function addPlayerMark(position) {
        boardStatus[position] = gamePlay.getCurrentPlayersMark();
        buildGameBoard();
    }

    /* ====================== WIN ACTIONS ====================== */
    function checkForWin() {

        turnCount++;

        for(let i = 0; i < 8; i++) {

            if(boardStatus[winCondition[i][0]] === 'X' 
            && boardStatus[winCondition[i][1]] === 'X' 
            && boardStatus[winCondition[i][2]] === 'X') {
                
                gamePlay.updatePlayerTurnInDOM(gamePlay.player1);
                return gamePlay.player1;

            } else if(boardStatus[winCondition[i][0]] === 'O' 
                   && boardStatus[winCondition[i][1]] === 'O' 
                   && boardStatus[winCondition[i][2]] === 'O') {
                
                gamePlay.updatePlayerTurnInDOM(gamePlay.player2);
                return gamePlay.player2;
            }
        }
        
        if(turnCount == 9) {                            // check for tie
            ties++;
            gamePlay.updatePlayerTurnInDOM('tie');
            return 'tie';
        } 
    }

    /* ====================== RETURN ====================== */
    return { updateScoreBoard };

})();


/* ===============================================================================================
                                        PLAYER FACTORY
   =============================================================================================== */

const player = (playerName, playerMark) => {
    let wins = 0;
    return { playerName, playerMark, wins};
}

/* ===============================================================================================
                                        GAMEPLAY OBJECT
   =============================================================================================== */
   
const gamePlay = (() => {

    let player1 = player('Player 1', 'X');
    let player2 = player('Player 2', 'O');
    let playerTurn = pickWhoGoesFirst();        // hold current player's turn

    /* ====================== PLAY TURN ====================== */
    function playTurn() {

        updatePlayerTurn();                     // update the current player status 
        updatePlayerTurnInDOM();                // notify players who's turn it is

    }

    /* ====================== TEXT OUTPUT TO PLAYERS ====================== */
    function updatePlayerTurnInDOM(status) {

        const turnText = document.querySelector('.scoreboard-updates');
        
        if(status == 'tie') {
            turnText.innerHTML = "It's a Tie!";
            return;
        }
        
        if(status) {

            turnText.innerHTML = `${status.playerName} Won!`;
            return false;
        }

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
            return player1;
        }
        return player2;
    } 

    /* ====================== GET CURRENT PLAYER'S MARK ====================== */
    function getCurrentPlayersMark() {
        return playerTurn.playerMark;
    }

    /* ====================== EVENT LISTENER FOR FORM ELEMENT ====================== */
    const submitNamesButton = document.querySelector('#submit-names-button');
    submitNamesButton.addEventListener("click", function() {
        getAndSetPlayerNames();
        const formContainer = document.querySelector('.form-container');
        const formBackground = document.querySelector('.form-background');
        formContainer.style.visibility = 'hidden';
        formBackground.remove();
        updatePlayerTurnInDOM();
        gameBoard.updateScoreBoard();
    })

    /* ====================== GET/SET PLAYER NAMES ====================== */

    function getAndSetPlayerNames() {
        const p1Name = document.querySelector("#player1_name").value;
        const p2Name = document.querySelector("#player2_name").value;
        player1.playerName = p1Name;
        player2.playerName = p2Name;
    }

    return { playTurn, getCurrentPlayersMark, updatePlayerTurn, updatePlayerTurnInDOM, player1, player2}
})();

   
/*

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

/* ====================== ASSOCIATE MARK WITH PLAYERNAME ====================== */
/*     function getWinningPlayer(marker) {
        if(player1.playerMark === 'X') {
            return player1;
        }
        return player2;
    } */