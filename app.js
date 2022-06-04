const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const logic = require("./logic.js");
const app = express();

var answer = "sup";
var defaultGridSize = 5;
var gridSize = 5;
var correctWord = "";
var error = "";
var message = "";
const enteredWords = [];
const wordClasses = [];
var testingCode = "qwerty";
let z = logic.generateRandomWord(https, gridSize);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

logic.test();
console.log(testingCode);

app.get("/", function (req, res) {
  console.log(z);
  console.log("print");
  console.log(answer);
  //res.sendFile(__dirname + "/index.html");
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
  logic.clearMessages();
  logic.validateEnteredWord(req.body.inputedWord, gridSize);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("started listening");
});
