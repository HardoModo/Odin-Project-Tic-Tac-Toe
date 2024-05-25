console.log("Connected")

function createPlayer (name, symbol) {
  
    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;
  
    return { name, symbol, getScore, giveScore };
}

const gameMaster = (function () {
    let gameArray = []
    let playerArray = []

    const collectPlayerInfo = (playerid) =>
        {
            const playerName = document.getElementById(playerid+"name").value
            const playerSymbol = document.getElementById(playerid+"symbol").value

            if (playerName == "" || playerSymbol == "") {
                window.alert("Missing player info.")
            } else {
                playerArray.push(createPlayer(playerName, playerSymbol))
                document.getElementById(playerid+"form").style.visibility = "hidden"
                console.log(playerArray)
                document.getElementById(playerid+"side").innerHTML = "Test"
            }
        };
    return { collectPlayerInfo };
  })();