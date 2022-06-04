var defaultGridSize = 5;
var gridSize = defaultGridSize;
var correctWord = "hello";
var tiles = "";
var row = 0;
var gameGrid = "";
var inputedWord = "hoxlo";
generateGrid(gridSize);
//generateRandomWord(defaultGridSize);
//checkWordExistence(inputedWord);
//evaluateInput();

// generateGrid function ---------------------------
function generateGrid(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    tiles = "";
    for (let j = 0; j < gridSize; j++) {
      tiles += "<td id='tile" + i + j + "'></td>";
    }
    gameGrid += "<tr id= 'gridRow" + i + "'>" + tiles + "</tr>";
  }
  document.getElementById("gameGrid").innerHTML = gameGrid;
}

// generateRandomWord function ---------------------------
function generateRandomWord(gridSize) {
  var generateRandomWord =
    "https://random-word-api.herokuapp.com/word?length=" + gridSize;

  http.open("GET", generateRandomWord);
  http.send();
  http.onload = () => {
    if (http.status === 200) {
      console.log("word generated successfully");
      correctWord = JSON.parse(http.response);
      inputedWord = correctWord;
      console.log("InputWord set to: " + inputedWord);
    } else {
      document.getElementById(
        "error"
      ).innerHTML = `error ${http.status} : ${http.statusText}`;
    }
  };
}

// checkWordExistence function ---------------------------
function checkWordExistence(inputedWord) {
  var wordCheckAPI =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputedWord;

  http.open("GET", wordCheckAPI);
  http.send();
  http.onload = () => {
    if (http.status === 200) {
      evaluateInput();
    } else {
      message.innerHTML = "Not an English Word!";
    }
  };
}

// evaluateInput function ---------------------------
function evaluateInput() {
  if (inputedWord === correctWord) {
    document.getElementById("gridRow" + row).style.backgroundColor += "green";
    message.innerHTML = "YOU WON !!!!";
  } else {
    for (let i in inputedWord) {
      let tile = document.getElementById("tile0" + i);
      if (inputedWord[i] === correctWord[i]) {
        tile.style.backgroundColor = "green";
      } else if (correctWord.includes(inputedWord[i])) {
        tile.style.backgroundColor = "orange";
      }
    }
    if (row === gridSize) {
      message.innerHTML = "YOU LOST, GAME OVER !";
    } else {
      row++;
    }
  }
}

function createTiles() {}
