function createPlayer (name, symbol, playerid) {
  
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;
  
    return { name, symbol, playerid, getScore, giveScore };
}

const gameMaster = (function () {
    let playerArray = []
    let playerTurn

    const collectPlayerInfo = (playerid) =>
    {
        const playerName = document.getElementById(playerid+"name").value
        const playerSymbol = document.getElementById(playerid+"symbol").value

        if (playerName == "" || playerSymbol == "") {
            window.alert("Missing player info.")
        } else {
            const player = createPlayer(playerName, playerSymbol, playerid)
            playerArray.push(player)
            document.getElementById(playerid+"form").style.visibility = "hidden"
            document.getElementById(playerid+"side").innerHTML = 
            "Player: " + player.name + "<br/><br/>" +
            "Symbol: " + player.symbol + "<br/><br/>" +
            "Score: " + player.getScore();

            if (playerArray.length == 2) {
                gameMaster.startGame()
            }
        }
    };

    const startPlayerTurn = (playerTurn) =>
    {
        const headerText = document.getElementById("item1")

        if (playerTurn % 2 == 0) {
            playerTurn = 0
        } else {
            playerTurn = 1
        }

        headerText.innerHTML = "It's " + playerArray[playerTurn].name + "'s turn."
    }

    const checkGameConditions = () =>
    {
        // Check for game wins and ties here with the gameboard array
        // if (gameBoard.Array[0] === gameBoard.Array[1] && gameBoard.Array[0] === gameBoard.Array[2] && gameBoard.Array[0] !== null ||
        // gameBoard.Array[0] === gameBoard.Array[4] && gameBoard.Array[0] === gameBoard.Array[8] && gameBoard.Array[0] !== null ||
        // gameBoard.Array[0] === gameBoard.Array[3] && gameBoard.Array[0] === gameBoard.Array[6] && gameBoard.Array[0] !== null ||
        // gameBoard.Array[2] === gameBoard.Array[4] && gameBoard.Array[2] === gameBoard.Array[6] && gameBoard.Array[2] !== null ||
        // gameBoard.Array[2] === gameBoard.Array[5] && gameBoard.Array[2] === gameBoard.Array[8] && gameBoard.Array[2] !== null ||
        // gameBoard.Array[6] === gameBoard.Array[7] && gameBoard.Array[6] === gameBoard.Array[8] && gameBoard.Array[6] !== null ||
        // gameBoard.Array[1] === gameBoard.Array[4] && gameBoard.Array[1] === gameBoard.Array[7] && gameBoard.Array[1] !== null ||
        // gameBoard.Array[3] === gameBoard.Array[4] && gameBoard.Array[3] === gameBoard.Array[5] && gameBoard.Array[3] !== null) {
            // Current player wins. Game ends
            // Give point to player
        // } else if (playerTurn == 9) {
            // Check for ties
        // } else {
        //     gameMaster.playerTurn += 1

        //     gameMaster.gameLoop()
        // }

        gameMaster.playerTurn += 1

        gameMaster.gameLoop()
    }

    const gameLoop = () => {
        console.log("Player turn: " + gameMaster.playerTurn)
        gameMaster.startPlayerTurn(gameMaster.playerTurn)
    }


    const startGame = () =>
    {
        gameBoard.setUpBoard()
        gameMaster.playerTurn = 0

        gameMaster.gameLoop()

    }

    return { playerArray, playerTurn, collectPlayerInfo, startGame, startPlayerTurn, checkGameConditions, gameLoop };
  })();

const gameBoard = (function () {
    let gameBoardArray = new Array(9)

    const setUpBoard = () =>
        {
            const gameContainer = document.getElementById(`game-container`)

            for (let i = 0; i < gameBoardArray.length; i++) {
                const gameSquare = document.createElement("div")

                gameSquare.id = "grid" + i
                
                gameSquare.addEventListener(
                    "mouseover",
                    (event) => {
                        event.target.style.background = "var(--redorange)";
                    }
                );

                gameSquare.addEventListener(
                    "mouseleave",
                    (event) => {
                        event.target.style.background = "var(--teal)";
                    }
                );

                gameSquare.addEventListener(
                    "click",
                    (event) => {
                        if (event.target.innerHTML != "") {
                            window.alert("That square is already taken")
                        } else {
                            event.target.innerHTML = gameMaster.playerArray[gameMaster.playerTurn % 2].symbol;
                            gameMaster.checkGameConditions()
                        }
                    }
                );
                
                gameContainer.appendChild(gameSquare)
            }
        }

    return { setUpBoard };
})();