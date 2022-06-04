import React from "react";

export default function CurrentWordRow({ currentWord }) {
  let word = currentWord.split("");
  return word.map((char, i) => {
    return (
      <td key={i} className="currentTile">
        {char}
      </td>
    );
  });
}
