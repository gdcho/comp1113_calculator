// calculateMatrixResult.js
"use client";

import React from "react";

export default function CalculateMatrixResult({ result }) {
  return (
    <div>
      <label>Result:</label>
      <pre>{result}</pre>
    </div>
  );
}
