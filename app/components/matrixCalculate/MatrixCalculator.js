// matrixCalculator.js
"use client";

import React, { useState } from "react";
import MatrixInput from "./MatrixInput";
import MatrixSelect from "./MatrixSelect";
import CalculateMatrixResult from "./CalculateMatrixResult";
import { calculateMatrixOperation } from "../../utils/matrixOperations.js";

export default function MatrixCalculator({ operationStyle }) {
  const [matrix1, setMatrix1] = useState("");
  const [matrix2, setMatrix2] = useState("");
  const [matrixOperation, setMatrixOperation] = useState("Add");
  const [result, setResult] = useState("");

  const calculateResult = () => {
    try {
      const result = calculateMatrixOperation(
        matrix1,
        matrix2,
        matrixOperation
      );
      setResult(result);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-around items-center">
        <MatrixInput matrix={matrix1} setMatrix={setMatrix1} id="matrix1" />
        <MatrixSelect
          matrixOperation={matrixOperation}
          setMatrixOperation={setMatrixOperation}
          style={operationStyle}
        />
        <MatrixInput matrix={matrix2} setMatrix={setMatrix2} id="matrix2" />
      </div>
      <button onClick={calculateResult}>Calculate</button>
      <CalculateMatrixResult result={result} />
    </>
  );
}
