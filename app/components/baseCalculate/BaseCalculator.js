// components/baseCalculate/BaseCalculator.js
import React, { useEffect } from "react";
import OperationSelect from "./OperationSelect";
import { baseCalculate } from "../../utils/baseCalculate";
import BaseSelect from "../baseConvert/BaseSelect";

function BaseCalculator({
  num1,
  setNum1,
  num2,
  setNum2,
  operation,
  setOperation,
  base,
  setBase,
  calculationResult,
  setCalculationResult,
}) {
  const handleBaseCalculate = () => {
    const result = baseCalculate(num1, num2, operation, base);
    setCalculationResult(result ? result : "Invalid input");
  };

  useEffect(() => {
    handleBaseCalculate();
  }, [num1, num2, operation, base]);

  return (
    <div>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <BaseSelect base={base} setBase={setBase} />
      <OperationSelect operation={operation} setOperation={setOperation} />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
    </div>
  );
}

export default BaseCalculator;
