const https = require("https");

function clearMessages() {
  error = "";
  message = "";
}

//Inside Module:
function generateRandomWord(length, setAns, setErr) {
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

function validateEnteredWord(
  https,
  gridSize,
  correctWord,
  row,
  inputedWord,
  addWords,
  addWordClasses,
  setMsg,
  setErr,
  setRow,
  redirect
) {
  if (inputedWord === "") {
    setErr("No word entered");
    redirect();
  } else if (inputedWord.length < gridSize || inputedWord.length > gridSize) {
    setErr(
      "World length should be " + gridSize + " instead of " + inputedWord.length
    );
    redirect();
  } else {
    checkWordExistence(
      https,
      gridSize,
      correctWord,
      row,
      inputedWord,
      addWords,
      addWordClasses,
      setMsg,
      setErr,
      setRow,
      redirect
    );
  }
}

// checkWordExistence function ---------------------------
function checkWordExistence(
  https,
  gridSize,
  correctWord,
  row,
  inputedWord,
  addWords,
  addWordClasses,
  setMsg,
  setErr,
  setRow,
  redirect
) {
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputedWord;

  https.get(url, function (res) {
    res.on("data", function (data) {
      if (res.statusCode === 200) {
        addWords(inputedWord);
        processInputWord(
          https,
          gridSize,
          correctWord,
          row,
          inputedWord,
          addWords,
          addWordClasses,
          setMsg,
          setErr,
          setRow,
          redirect
        );
      } else {
        setErr("Not an English Word!");
        redirect();
      }
    });
  });
}

function processInputWord(
  https,
  gridSize,
  correctWord,
  row,
  inputedWord,
  addWords,
  addWordClasses,
  setMsg,
  setErr,
  setRow,
  redirect
) {
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
  addWordClasses(charClass);
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
  redirect();
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
