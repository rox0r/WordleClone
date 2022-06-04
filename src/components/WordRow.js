import React from "react";

export default function WordRow({ word }) {
  return word.map((charObj, i) => {
    return (
      <td key={i} className="tile" style={{ backgroundColor: charObj.color }}>
        {charObj.key}
      </td>
    );
  });
}
