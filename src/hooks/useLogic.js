import { useState } from "react";

export default function useLogic(solution) {
  const [wordSize, setWordSize] = useState(solution.length);
  const [gameStatus, setGameStatus] = useState("active");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [currentWord, setCurrentWord] = useState(""); // is String
  const [formattedWords, setFormattedWords] = useState([]); //Arr of obj

  //Handle Key Up
  function handleKey({ key }) {
    setMessage("");
    // Key is an Alphabet
    if (/^[A-Za-z]$/.test(key) && currentWord.length !== wordSize) {
      setCurrentWord((prev) => {
        return prev + key.toUpperCase();
      });
      // Key is Backspace
    }
    // key is backspace
    else if (key === "Backspace") {
      setCurrentWord((prev) => {
        return prev.slice(0, -1);
      });
      // key is Enter
    }
    //key is Enter
    else if (key === "Enter") {
      // If Input Length is OK
      if (currentWord.length === solution.length) {
        isAWord();
      } else {
        setMessage("Word length should be: " + solution.length);
      }
    } else {
      return;
    }
  }

  function isAWord() {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + currentWord;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.message
          ? setMessage("Error: Not an English Word")
          : wordFormatter();
      })
      .catch((err) => setMessage("Err: " + err));
  }

  function wordFormatter() {
    let inputChars = currentWord.split("");
    const formattedWord = inputChars.map((char, i) => {
      if (char === solution[i]) {
        return { key: char, color: "green" };
      } else if ([...solution].includes(char)) {
        return { key: char, color: "orange" };
      } else {
        return { key: char, color: "gray" };
      }
    });
    setFormattedWords((prev) => {
      return [...prev, formattedWord];
    });
    gameStatusEval();
  }

  function gameStatusEval() {
    // Attempt increment
    setAttempts((prev) => {
      return prev + 1;
    });
    //Evaluate gameStatus
    if (solution === currentWord) {
      setGameStatus("over");
      setMessage("YOU WON !");
    } else if (attempts === 5) {
      setGameStatus("over");
      setMessage("YOU LOST !");
    }
    setCurrentWord("");
  }

  return {
    wordSize,
    gameStatus,
    message,
    currentWord,
    handleKey,
    formattedWords,
  };
}
