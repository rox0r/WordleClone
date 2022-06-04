const https = require("https");

//Inside Module:
function genWord(length, setAns, setErr) {
  var url = "https://random-word-api.herokuapp.com/word?length=" + length;
  https.get(url, function (res) {
    res.on("data", function (data) {
      if (res.statusCode === 200) {
        word = JSON.parse(data)[0];
        console.log("Generated word is: " + word);
        setAns(word);
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
        setErr("Not an English Word");
      }
    });
  });
}

function setBgColor(ans, inputedWord) {
  console.log("genClasses func started");
  console.log(ans);
  console.log(inputedWord);
  let charClass = [];
  for (let i in inputedWord) {
    if (inputedWord[i] === ans[i]) {
      charClass.push("posMatch");
    } else if (ans.includes(inputedWord[i])) {
      charClass.push("charMatch");
    } else {
      charClass.push("");
    }
  }
  return charClass;
}

function evalGameStatus(
  inputedWord,
  ans,
  row,
  gridSize,
  setMsg,
  setErr,
  setGameStatus
) {
  console.log("evalGameStatus func started");
  if (inputedWord === ans) {
    setMsg("You Won!");
    setGameStatus("over");
  } else if (row === gridSize) {
    setErr("YOU LOST, GAME OVER !");
    setGameStatus("over");
  }
}

module.exports = {
  genWord,
  valWordLen,
  isAWord,
  setBgColor,
  evalGameStatus,
};
