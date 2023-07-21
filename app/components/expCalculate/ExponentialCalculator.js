// components/expCalculate/ExponentialCalculator.js
"use client";
import React, { useEffect } from "react";
import ValueInput from '../baseConvert/ValueInput';
import BaseSelect from '../baseConvert/BaseSelect';

function ExponentialCalculator({
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
      const result = Math.pow(base, value);
      setResult(result);
    }
  }, [value, base, setResult]);

  return (
    <>
      <ValueInput
        value={value}
        setValue={setValue}
      />
      <BaseSelect base={base} setBase={setBase} style={selectStyles} />
      <p>Base {base} to the power of {value} is: {result}</p>
    </>
  );
}

export default ExponentialCalculator;
