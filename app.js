const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const logic = require("./logic.js");
const app = express();

var defaultGridSize = 5;
var gridSize = defaultGridSize;
var row = 0;
var correctWord = logic.genWord(gridSize, setErr);
var message = "";
var error = "";
const enteredWords = [];
const wordClasses = [];
var testingCode = "qwerty";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

logic.test();
console.log(testingCode);

function setAns(word) {
  correctWord = word;
  answer = "Correct Word is: " + correctWord;
  console.log("Ans Set to: " + correctWord);
}
function setRow(res) {
  row++;
  console.log("ROW Setter");
  console.log(row);
}
function setErr(res) {
  error = "Error: " + res;
  console.log("err Setter");
  console.log(error);
}
function setMsg(res) {
  message = res;
  console.log("msg Setter");
  console.log(message);
}

function addWords(inputedWord) {
  enteredWords.push(inputedWord);
  console.log("inputedWord added to Words Arr");
}

function addWordClasses(charClass) {
  wordClasses.push(charClass);
  console.log("charClass added to wordClasses Arr");
}

function cb(status) {
  return status;
}

app.get("/", function (req, res) {
  res.render("game.ejs", {
    gridSize: gridSize,
    error: error,
    message: message,
    enteredWords: enteredWords,
    wordClasses: wordClasses,
  });
});

app.post("/", function (req, res) {
  let inputedWord = req.body.inputedWord;
  error = "";
  message = "";

  // validate word length
  if (logic.valWordLen(gridSize, inputedWord, setErr)) {
    // validate if input is english word
    if (inputedWord) {
      enteredWords.push(inputedWord);
      // generate classes for word characters
      let bgClasses = logic.setBgColor(
        correctWord,
        inputedWord,
        addWordClasses
      );
      addWordClasses(bgClasses);
      // eval game win-loose status
      logic.evalGameStatus(
        inputedWord,
        correctWord,
        row,
        gridSize,
        setMsg,
        setErr,
        setRow
      );
      res.redirect("/");
    } else {
      setErr("Not an English Word");
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }

  function reDirect(route) {
    res.redirect(route);
  }
});

app.listen(3000, function () {
  console.log("started listening");
});
