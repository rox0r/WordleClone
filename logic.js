const https = require("https");

function clearMessages() {
  error = "";
  message = "";
}

//Inside Module:
function genWord(length, setErr) {
  var url = "https://random-word-api.herokuapp.com/word?length=" + length;
  https.get(url, function (res) {
    res.on("data", function (data) {
      if (res.statusCode === 200) {
        word = JSON.parse(data)[0];
        console.log("Generated word is: " + word);
        return word;
      } else {
        setErr(res.statusCode);
      }
    });
  });
}

// validateEnteredWord function ---------------------------
function valWordLen(gridSize, inputedWord, setErr) {
  if (inputedWord.length === gridSize) {
    console.log("Word length is ok");
    return true;
  } else {
    setErr(
      "World length should be " + gridSize + " instead of " + inputedWord.length
    );
  }

  /*   if (inputedWord === "") {
    setErr("No word entered");
  } else if (inputedWord.length < gridSize || inputedWord.length > gridSize) {
    setErr(
      "World length should be " + gridSize + " instead of " + inputedWord.length
    );
  } else {
    console.log("Word length is ok");
    return true;
  } */
}

// checkWordExistence function ---------------------------
function isAWord(inputedWord, cb) {
  console.log("checkWordExistence func started");
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputedWord;

  https.get(url, function (res) {
    res.on("data", function (data) {
      if (res.statusCode === 200) {
        cb("true");
      } else {
        cb("false");
      }
    });
  });
}

function setBgColor(correctWord, inputedWord, addWordClasses) {
  console.log("genClasses func started");
  let charClass = [];
  for (let i in inputedWord) {
    if (inputedWord[i] === correctWord[i]) {
      charClass.push("posMatch");
    } else if (correctWord.includes(inputedWord[i])) {
      charClass.push("charMatch");
    } else {
      charClass.push("");
    }
  }
  return charClass;
}

function evalGameStatus(
  inputedWord,
  correctWord,
  row,
  gridSize,
  setMsg,
  setErr,
  setRow
) {
  console.log("gameStatus func started");
  if (inputedWord === correctWord) {
    setMsg("You Won!");
  } else {
    row++;
    if (row === gridSize) {
      setErr("YOU LOST, GAME OVER !");
    } else {
      setRow();
    }
  }
}

function test() {
  console.log("testing export- success");
}

module.exports = {
  clearMessages,
  genWord,
  valWordLen,
  isAWord,
  setBgColor,
  evalGameStatus,
  test,
};
