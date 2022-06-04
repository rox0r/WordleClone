import React, { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import "./index.css";

export default function App() {
  const [solution, setSolution] = useState(null);
  const [wordLength, setWordLength] = useState(5);
  var url = "https://random-word-api.herokuapp.com/word?length=" + wordLength;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setSolution(data[0].toUpperCase()));
  }, [setSolution, url]);

  return <div>{solution && <Wordle solution={solution} />}</div>;
}

/* 
html
  header
  body
    gameContainer
      instructions
      gameGrid
        gridContainer
        wordsGridContainer
          wordRows
            charTile
    other
  footer
 */
