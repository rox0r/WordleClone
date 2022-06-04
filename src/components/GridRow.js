import React from "react";

export default function GridRow({ wordSize }) {
  let RowItems = [...Array(wordSize)];
  return RowItems.map((_, i) => {
    return <td key={i} className="rowItem"></td>;
  });
}
