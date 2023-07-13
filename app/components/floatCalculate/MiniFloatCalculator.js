import React, { useState } from "react";
import {
  miniFloatAddition,
  miniFloatSubtraction,
} from "../../utils/miniFloatCalculate";

export default function MiniFloatCalculator() {
  const [numberA, setNumberA] = useState("");
  const [numberB, setNumberB] = useState("");
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState("add");

  const isDecimal = (num) => {
    return /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(num);
  };

  const calculate = () => {
    if (
      numberA !== "" &&
      numberB !== "" &&
      !isNaN(numberA) &&
      !isNaN(numberB)
    ) {
      const isDecimalA = isDecimal(numberA);
      const isDecimalB = isDecimal(numberB);

      let res;
      if (operation === "add") {
        res = miniFloatAddition(
          parseFloat(numberA),
          parseFloat(numberB),
          isDecimalA && isDecimalB
        );
      } else if (operation === "sub") {
        res = miniFloatSubtraction(
          parseFloat(numberA),
          parseFloat(numberB),
          isDecimalA && isDecimalB
        );
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
    <div>
      <input
        type="text"
        value={numberA}
        onChange={(e) => setNumberA(e.target.value)}
        placeholder="Enter decimal or mini float"
      />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">+</option>
        <option value="sub">-</option>
      </select>
      <input
        type="text"
        value={numberB}
        onChange={(e) => setNumberB(e.target.value)}
        placeholder="Enter decimal or mini float"
      />
      <br />
      <button onClick={calculate}>Calculate</button>
      {result && <ResultDisplay result={result} />}
    </div>
  );
}
