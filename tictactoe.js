function createPlayer (name, symbol, playerid) {
  
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;
  
    return { name, symbol, playerid, getScore, giveScore };
}

const gameMaster = (function () {
    let playerArray = []

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

    const startGame = () =>
    {
        gameBoard.setUpBoard()
    }

    return { collectPlayerInfo, startGame };
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
                
                gameContainer.appendChild(gameSquare)
            }
        }

    return { setUpBoard };
  })();