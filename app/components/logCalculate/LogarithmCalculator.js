// components/logCalculate/LogarithmCalculator.js
"use client";
import React, { useEffect } from "react";
import ValueInput from '../baseConvert/ValueInput';

function LogarithmCalculator({
  base,
  value,
  setValue,
  setBase,
  selectStyles,
  operationStyles,
  setResult,
  calculationResult,
  result,
}) {
  useEffect(() => {
    if (isNaN(value) || isNaN(base)) {
      setResult('Invalid Input');
    } else {
      const result = Math.log(value) / Math.log(base);
      setResult(result);
    }
  }, [value, base]);

  return (
    <div>
      <ValueInput
        value={value}
        setValue={setValue}
      />
      <p>Log base {base} of {value} is: {result}</p>
    </div>
  );
}

export default LogarithmCalculator;
