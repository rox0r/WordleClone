function clearMessages() {
  error = "";
  message = "";
}

//Inside Module
function generateRandomWord(https, gridSize) {
  var url = "https://random-word-api.herokuapp.com/word?length=" + gridSize;
  https.get(url, function (res) {
    res.on("data", function (data) {
      if (res.statusCode === 200) {
        correctWord = JSON.parse(data)[0];
        answer = "Correct Word is " + correctWord;
        console.log(answer);
      } else {
        error = "error" + res.statusCode;
      }
    });
  });
}
// validateEnteredWord function ---------------------------

function validateEnteredWord(inputedWord, gridSize) {
  if (inputedWord === "") {
    error = "No word entered";
  } else if (inputedWord.length < gridSize || inputedWord.length > gridSize) {
    error =
      "World length should be " +
      gridSize +
      " instead of " +
      inputedWord.length;
  } else {
    checkWordExistence(inputedWord);
  }
}

// checkWordExistence function ---------------------------
function checkWordExistence(inputedWord,https) {
  let url =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputedWord;

    https.get(url, function (res) {
      res.on("data", function (data) {
        if (res.statusCode === 200) {
      enteredWords.push(inputedWord);
      processInputWord(inputedWord);
    } else {
      error = "Not an English Word!";
    }
  };
}

function processInputWord(inputedWord) {
  for (let i in inputedWord) {
    let charClass = [];
    if (inputedWord[i] === correctWord[i]) {
      charClass.push("posMatch");
    } else if (correctWord.includes(inputedWord[i])) {
      charClass.push("charMatch");
    } else {
      charClass.push("");
    }
    wordClasses.push(charClass);
  }
  if (inputedWord === correctWord) {
    message = "You Won!";
  } else {
    row++;
    if (row === gridSize) {
      error = "YOU LOST, GAME OVER !";
    }
  }
}

function test() {
  console.log("testing export- success");
}

module.exports = {
  clearMessages,
  generateRandomWord,
  validateEnteredWord,
  checkWordExistence,
  processInputWord,
  test,
};
