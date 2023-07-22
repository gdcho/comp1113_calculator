// matrixSelect.js
"use client";

import React from "react";

const operations = ["Add", "Subtract", "Multiply", "Transpose", "Determinant", "Inverse"];

export default function MatrixSelect({ matrixOperation, setMatrixOperation, style }) {
  return (
    <div>
      <label htmlFor="operation">Operation:</label>
      <br />
      <select
        id="operation"
        value={matrixOperation}
        onChange={(e) => setMatrixOperation(e.target.value)}
        style={style}
      >
        {operations.map((operation) => (
          <option key={operation} value={operation}>
            {operation}
          </option>
        ))}
      </select>
    </div>
  );
}
