// booleanCalculator.js
"use client";

import React from "react";
import BooleanInput from "./BooleanInput";
import BooleanOperation from "./BooleanOperation";
import { calculateBoolean } from "../../utils/booleanCalculations.js";

export default function BooleanCalculator({
  value1,
  setValue1,
  value2,
  setValue2,
  operation,
  setOperation,
  operationStyle,
}) {
  const result = calculateBoolean(value1, value2, operation);

  return (
    <div>
      <BooleanInput
        value={value1}
        setValue={setValue1}
        style={{ transform: "scale(1)", margin: "0 20px 0 0" }}
      />
      <BooleanOperation
        operation={operation}
        setOperation={setOperation}
        style={{ ...operationStyle, margin: "10px" }}
      />
      <BooleanInput
        value={value2}
        setValue={setValue2}
        style={{ transform: "scale(1)", margin: "0 0 0 20px" }}
      />

      <p>Result: {result.toString()}</p>
    </div>
  );
}
