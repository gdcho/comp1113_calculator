// matrixCalculator.js
"use client";

import React, { useState } from "react";
import MatrixInput from "./MatrixInput";
import MatrixSelect from "./MatrixSelect";
import CalculateMatrixResult from "./CalculateMatrixResult"; // import this component
import { calculateMatrixOperation } from '../../utils/matrixOperations.js';

export default function MatrixCalculator() {
  const [matrix1, setMatrix1] = useState("");
  const [matrix2, setMatrix2] = useState("");
  const [matrixOperation, setMatrixOperation] = useState("Add");
  const [result, setResult] = useState(""); // Add a new state variable for the result

  // Add a new function to handle the 'Calculate' button click
  const calculateResult = () => {
    try {
      const result = calculateMatrixOperation(matrix1, matrix2, matrixOperation);
      setResult(result);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <MatrixInput matrix={matrix1} setMatrix={setMatrix1} id="matrix1" />
      <MatrixSelect matrixOperation={matrixOperation} setMatrixOperation={setMatrixOperation} />
      <MatrixInput matrix={matrix2} setMatrix={setMatrix2} id="matrix2" />
      <button onClick={calculateResult}>
        Calculate
      </button>
      <CalculateMatrixResult result={result} /> {/* Display the result */}
    </div>
  );
}
