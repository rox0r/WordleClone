import React from "react";
import WordRow from "./WordRow";

export default function Words({ formattedWords }) {
  return formattedWords.map((word, i) => {
    return (
      <tbody>
        <tr key={i}>
          <WordRow word={word} />
        </tr>
      </tbody>
    );
  });
}
