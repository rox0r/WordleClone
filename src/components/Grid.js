import React from "react";
import GridRow from "./GridRow";

export default function Grid({ wordSize }) {
  let gridRows = [...Array(6)];
  return gridRows.map((_, i) => {
    return (
      <tr key={i}>
        <GridRow wordSize={wordSize} />
      </tr>
    );
  });
}
