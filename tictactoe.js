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
        if (gameBoard.gameBoardArray[0] == gameBoard.gameBoardArray[1] && gameBoard.gameBoardArray[0] == gameBoard.gameBoardArray[2] && gameBoard.gameBoardArray[0] !== undefined ||
        gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[8] && gameBoard.gameBoardArray[0] !== undefined ||
        gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[3] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[6] && gameBoard.gameBoardArray[0] !== undefined ||
        gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[6] && gameBoard.gameBoardArray[2] !== undefined ||
        gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[5] && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[8] && gameBoard.gameBoardArray[2] !== undefined ||
        gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[7] && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[8] && gameBoard.gameBoardArray[6] !== undefined ||
        gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[7] && gameBoard.gameBoardArray[1] !== undefined ||
        gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[5] && gameBoard.gameBoardArray[3] !== undefined) 
        {
            // Current player wins. Game ends
            // Give point to player
            console.log("Winner!")
        } else {
            gameMaster.playerTurn += 1

            if (gameMaster.playerTurn == 9) {
                console.log("Game ends in a tie")
            }

            gameMaster.gameLoop()
        }
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
                            gameBoard.gameBoardArray[event.target.id.slice(-1)] = gameMaster.playerArray[gameMaster.playerTurn % 2].symbol;
                            gameMaster.checkGameConditions()
                        }
                    }
                );
                
                gameContainer.appendChild(gameSquare)
            }
        }

    return { gameBoardArray, setUpBoard };
})();