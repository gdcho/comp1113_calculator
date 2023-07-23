// components/logCalculate/LogarithmCalculator.js
"use client";
import React, { useEffect } from "react";
import ValueInput from "../baseConvert/ValueInput";
import BaseSelect from "../baseConvert/BaseSelect";

function LogarithmCalculator({
  base,
  value,
  setValue,
  setBase,
  setResult,
  result,
}) {
  useEffect(() => {
    if (isNaN(value) || isNaN(base)) {
      setResult("Invalid Input");
    } else {
      const result = Math.log(value) / Math.log(base);
      setResult(result);
    }
  }, [value, base, setResult]);

  const operationStyles = {
    display: "inline-block",
    position: "relative",
    textAlign: "center",
    width: "80px",
    height: "30px",
    fontSize: "12px",
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
      <br />
      <ValueInput value={value} setValue={setValue} />
      <br />
      <BaseSelect
        base={base}
        setBase={setBase}
        operationStyle={operationStyles}
      />
      <p>
        Log base {base} of {value} is: {result}
      </p>
    </>
  );
}

export default LogarithmCalculator;
