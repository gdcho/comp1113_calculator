import React, { useState } from "react";
import {
  miniFloatAddition,
  miniFloatSubtraction,
} from "../../utils/miniFloatCalculate";

export default function MiniFloatCalculator({operationStyle}) {
  const [numberA, setNumberA] = useState("");
  const [numberB, setNumberB] = useState("");
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState("add");

  const isDecimal = (num) => {
    return /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(num);
  };

  const isBinary = (num) => {
    return /^[01]+$/.test(num);
  };

  const calculate = () => {
    if (
      numberA !== "" &&
      numberB !== "" &&
      !isNaN(numberA) &&
      !isNaN(numberB)
    ) {
      const isDecimalA = isDecimal(numberA) && !isBinary(numberA);
      const isDecimalB = isDecimal(numberB) && !isBinary(numberB);

      let res;
      if (operation === "add") {
        res = miniFloatAddition(numberA, numberB, isDecimalA && isDecimalB);
      } else if (operation === "sub") {
        res = miniFloatSubtraction(numberA, numberB, isDecimalA && isDecimalB);
      }
      setResult(res);
    }
  };

  const ResultDisplay = ({ result }) => {
    if (!result) {
      return null;
    }

    return (
      <div>
        <p>Mini Float Result: {result.miniFloatResult}</p>
        <p>Decimal Result: {result.decimalResult}</p>
        <p>Loss Percentage: {result.lossPercentage.toFixed(2)}%</p>
      </div>
    );
  };

  return (
    <>
      <input
        type="text"
        value={numberA}
        onChange={(e) => setNumberA(e.target.value)}
        placeholder="Enter decimal or mini float"
      />
      <br />
      <select value={operation} onChange={(e) => setOperation(e.target.value)} style={operationStyle}>
        <option value="add">+</option>
        <option value="sub">-</option>
      </select>
      <br />
      <input
        type="text"
        value={numberB}
        onChange={(e) => setNumberB(e.target.value)}
        placeholder="Enter decimal or mini float"
      />
      <br />
      <button onClick={calculate}>Calculate</button>
      {result && <ResultDisplay result={result} />}
    </>
  );
}
