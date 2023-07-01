// booleanCalculator.js
"use client";

import React from "react";
import BooleanInput from "./BooleanInput";
import BooleanOperation from "./BooleanOperation";
import { calculateBoolean } from "../../utils/booleanCalculations.js";

export default function BooleanCalculator({value1, setValue1, value2, setValue2, operation, setOperation}) {

  const result = calculateBoolean(value1, value2, operation);

  return (
    <div>
      <BooleanInput value={value1} setValue={setValue1} />
      <BooleanOperation operation={operation} setOperation={setOperation} />
      <BooleanInput value={value2} setValue={setValue2} />
      <p>Result: {result.toString()}</p>
    </div>
  );
}
