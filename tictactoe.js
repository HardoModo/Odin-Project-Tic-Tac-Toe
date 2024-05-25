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
    }

    const startGame = () =>
    {
        gameBoard.setUpBoard()
        var endGame = false
        gameMaster.playerTurn = 0

        while (endGame == false) {
            gameMaster.startPlayerTurn(gameMaster.playerTurn)
            gameMaster.checkGameConditions()

            gameMaster.playerTurn += 1
            break
        }

    }

    return { playerArray, playerTurn, collectPlayerInfo, startGame, startPlayerTurn, checkGameConditions };
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
                        console.log(gameMaster.playerArray)
                        console.log(gameMaster.playerTurn)
                        event.target.innerHTML = gameMaster.playerArray[gameMaster.playerTurn].symbol;
                    }
                );
                
                gameContainer.appendChild(gameSquare)
            }
        }

    return { setUpBoard };
})();