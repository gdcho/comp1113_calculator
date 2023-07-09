// matrixInput.js
"use client";

import React from "react";

export default function MatrixInput({ matrix, setMatrix, id }) {
  return (
    <div>
      <label htmlFor={id}>Matrix:</label>
      <br />
      <textarea
        id={id}
        value={matrix}
        onChange={(e) => setMatrix(e.target.value)}
        rows={5}
        cols={20}
      />
    </div>
  );
}

