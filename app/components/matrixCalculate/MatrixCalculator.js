// matrixCalculator.js
"use client";

import React, { useState } from "react";
import MatrixInput from "./MatrixInput";
import MatrixSelect from "./MatrixSelect";
import CalculateMatrixResult from "./CalculateMatrixResult"; // import this component
import { calculateMatrixOperation } from '../../utils/matrixOperations.js';

export default function MatrixCalculator({
  matrix1,
  setMatrix1,
  matrix2,
  setMatrix2,
  operation,
  setOperation,
}) {
  const [result, setResult] = useState(""); // Add a new state variable for the result

  // Add a new function to handle the 'Calculate' button click
  const calculateResult = () => {
    try {
      const result = calculateMatrixOperation(matrix1, matrix2, operation);
      setResult(result);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <MatrixInput matrix={matrix1} setMatrix={setMatrix1} id="matrix1" />
      <MatrixSelect operation={operation} setOperation={setOperation} />
      <MatrixInput matrix={matrix2} setMatrix={setMatrix2} id="matrix2" />
      <button onClick={calculateResult}>
        Calculate
      </button>
      <CalculateMatrixResult result={result} /> {/* Display the result */}
    </div>
  );
}
