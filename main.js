
// Module function for the gameboard
const gameBoard = (() => {

    let boardStatus = ['x', 'e', 'd', 'e', 'd', 'e', 'd', 'e', 'd'];       // current gameboard layout

    function setGameBoard() {       // populate gameboard with current board status
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i}`);
            box.innerHTML = boardStatus[i];
        }
    }

    return { setGameBoard };

})();

// Module function that runs the game
const game = (() => {

    gameBoard.setGameBoard();

})();

// Factory function for creating players
const player = (name, marker) => {
    let wins = 0;
    return { name, marker, wins};
}

// Create player and computer
const player1 = player('Player 1', 'X');
const computer = player('Computer', 'O');




/*
2. Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

3. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!

    3a. Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

4. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

5. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

6. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!

    6a. Start by just getting the computer to make a random legal move.
    6b. Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
    6c. If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

*/