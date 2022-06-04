const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const logic = require("./logic.js");
const app = express();

var defaultGridSize = 5;
var gridSize = defaultGridSize;
var correctWord = "";
var row = 0;
var answer = "";
var error = "";
var message = "";
const enteredWords = [];
const wordClasses = [];
var testingCode = "qwerty";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

logic.test();
console.log(testingCode);

logic.generateRandomWord(https, gridSize, setAns, setErr);

function setAns(res) {
  correctWord = res;
  answer = "Correct Word is: " + correctWord;
  console.log("ans Setter");
  console.log(correctWord);
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

app.get("/", function (req, res) {
  res.render("game.ejs", {
    gridSize: gridSize,
    answer: answer,
    error: error,
    message: message,
    enteredWords: enteredWords,
    wordClasses: wordClasses,
  });
});

app.post("/", function (req, res) {
  error = "";
  message = "";
  logic.validateEnteredWord(
    https,
    gridSize,
    correctWord,
    row,
    req.body.inputedWord,
    addWords,
    addWordClasses,
    setMsg,
    setErr,
    setRow,
    redirect
  );
  function redirect() {
    console.log(wordClasses);
    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("started listening");
});
