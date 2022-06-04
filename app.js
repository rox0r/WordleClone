const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

/* app.post("/", function (req, res) {
  attemptedWords.push(req.body.word);
  res.redirect("/");
}); */

app.listen(3000, function () {
  console.log("started listening");
});
