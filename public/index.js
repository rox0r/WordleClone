let http = new XMLHttpRequest();
var defaultGridSize = 5;
var gridSize = defaultGridSize;
var correctWord = "";
var tiles = "";
var row = 0;
var gameGrid = "";
var answer = document.getElementById("answer");
var error = document.getElementById("error");
var message = document.getElementById("message");

//create Default Grid upon page load
generateGrid(gridSize);
generateRandomWord(gridSize);

function clearMessages() {
  error.innerHTML = "";
  message.innerHTML = "";
}

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
      correctWord = JSON.parse(http.response)[0]; // JSON str to js Obj, then [0] to get first element as string
      answer.innerHTML = "Correct Word is " + correctWord;
    } else {
      document.getElementById(
        "error"
      ).innerHTML = `error ${http.status} : ${http.statusText}`;
    }
  };
}

// validateEnteredWord function ---------------------------

function validateEnteredWord() {
  inputedWord = document.getElementById("inputedWord").value;
  document.getElementById("inputedWord").value = "";
  if (inputedWord === "") {
    error.innerHTML = "No word entered";
  } else if (inputedWord.length < gridSize || inputedWord.length > gridSize) {
    error.innerHTML =
      "World length should be " +
      gridSize +
      " instead of " +
      inputedWord.length;
  } else {
    checkWordExistence(inputedWord);
  }
}

// checkWordExistence function ---------------------------
function checkWordExistence(inputedWord) {
  var wordCheckAPI =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputedWord;

  http.open("GET", wordCheckAPI);
  http.send();
  http.onload = () => {
    if (http.status === 200) {
      createWordTiles(inputedWord);
    } else {
      error.innerHTML = "Not an English Word!";
    }
  };
}

// createWordTiles function ---------------------------
function createWordTiles(inputedWord) {
  let wordTile = "";
  for (let i in inputedWord) {
    wordTile += "<td id='wordTile" + row + i + "'>" + inputedWord[i] + "</td>";
  }
  let wordTiles = "<tr id='wordRow" + row + "'>" + wordTile + "</tr>";
  document.getElementById("enteredWords").innerHTML += wordTiles;
  matchWithAnswer(inputedWord);
}

// matchWithAnswer function ---------------------------
function matchWithAnswer(inputedWord) {
  if (inputedWord === correctWord) {
    document.getElementById("wordRow" + row).style.backgroundColor += "green";
    message.innerHTML = "YOU WON !!!!";
  } else {
    for (let i in inputedWord) {
      let tile = document.getElementById("wordTile" + row + i);
      if (inputedWord[i] === correctWord[i]) {
        tile.style.backgroundColor = "green";
      } else if (correctWord.includes(inputedWord[i])) {
        tile.style.backgroundColor = "orange";
      }
    }
    row++;
    if (row === gridSize) {
      error.innerHTML = "YOU LOST, GAME OVER !";
    }
  }
}
