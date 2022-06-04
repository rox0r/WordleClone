import React, { useEffect } from "react";
import useLogic from "../hooks/useLogic";
import Grid from "./Grid";
import Words from "./Words";
import CurrentWordRow from "./CurrentWordRow";

export default function Wordle({ solution }) {
  const {
    wordSize,
    gameStatus,
    message,
    currentWord,
    handleKey,
    formattedWords,
  } = useLogic(solution);

  useEffect(() => {
    if (gameStatus === "active") {
      window.addEventListener("keyup", handleKey);

      return () => {
        window.removeEventListener("keyup", handleKey);
      };
    }
  }, [handleKey]);

  return (
    <div>
      <p>Solution is: {solution}</p>
      <p>CurrentWord is: {currentWord}</p>
      <p>{message}</p>
      <div className="gameGridContainer">
        <table className="wordsTable">
          <Words formattedWords={formattedWords} />
          <tr>
            <CurrentWordRow currentWord={currentWord} />
          </tr>
        </table>
        <table className="gridTable">
          <Grid wordSize={wordSize} />
        </table>
      </div>
    </div>
  );
}
