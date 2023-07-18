// components/logCalculate/LogarithmCalculator.js
"use client";
import React, { useEffect } from "react";
import ValueInput from '../baseConvert/ValueInput';
import BaseSelect from '../baseConvert/BaseSelect';

function LogarithmCalculator({
  base,
  value,
  setValue,
  setBase,
  selectStyles,
  setResult,
  result,
}) {
  useEffect(() => {
    if (isNaN(value) || isNaN(base)) {
      setResult('Invalid Input');
    } else {
      const result = Math.log(value) / Math.log(base);
      setResult(result);
    }
  }, [value, base, setResult]);

  return (
    <div>
      <ValueInput
        value={value}
        setValue={setValue}
      />
      <BaseSelect base={base} setBase={setBase} style={selectStyles} />
      <p>Log base {base} of {value} is: {result}</p>
    </div>
  );
}

export default LogarithmCalculator;
