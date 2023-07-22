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

  const operationStyles = {
    display: "inline-block",
    position: "relative",
    textAlign: "center",
    width: "100px",
    height: "45px",
    padding: "5px 5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg fill='%232C3E50' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.5em center",
    backgroundSize: "0.9em 0.9em",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  };

  return (
    <>
      <ValueInput
        value={value}
        setValue={setValue}
      />
      <BaseSelect base={base} setBase={setBase} operationStyle={operationStyles} />
      <p>Base {base} to the power of {value} is: {result}</p>
    </>
  );
}

export default ExponentialCalculator;
