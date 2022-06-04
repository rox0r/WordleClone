// -------------------Dependencies--------------------------
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const logic = require("./logic.js");
const app = express();

// -------------------Variables--------------------------
var defaultGridSize = 5;
var gridSize = defaultGridSize;
var row = 0;
var ans = "";
var message = "";
var error = "";
const enteredWords = [];
const wordClasses = [];
var gameStatus = "active";
var testingCode = "qwerty";

// -------------------Setup--------------------------
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

logic.genWord(gridSize, setAns, setErr); // Generate a random word as Answer

// -------------------GET Routing--------------------------
app.get("/", function (req, res) {
  res.render("game.ejs", {
    gridSize: gridSize,
    error: error,
    message: message,
    enteredWords: enteredWords,
    wordClasses: wordClasses,
  });
});

// -------------------POST Routing--------------------------
app.post("/", function (req, res) {
  let inputedWord = req.body.inputedWord;
  clearMessages();

  // validate word length
  if (logic.valWordLen(gridSize, inputedWord, setErr)) {
    // validate if input is english word
    if (inputedWord) {
      enteredWords.push(inputedWord);
      // generate classes for word characters
      let bgClasses = logic.setBgColor(ans, inputedWord);
      wordClasses.push(bgClasses);
      row++;
      // eval game active status
      logic.evalGameStatus(
        inputedWord,
        ans,
        row,
        gridSize,
        setMsg,
        setErr,
        setGameStatus
      );
    }
  }
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("started listening at PORT 3000");
});

// -------------------Functions--------------------------

function setAns(word) {
  ans = word;
}
function setRow(res) {
  row++;
}
function setErr(res) {
  error = "Error: " + res;
}
function setMsg(res) {
  message = res;
}

function addWords(inputedWord) {
  enteredWords.push(inputedWord);
}

function setGameStatus(status) {
  gameStatus = status;
}

function cb(status) {
  return status;
}

function clearMessages() {
  error = "";
  message = "";
}
