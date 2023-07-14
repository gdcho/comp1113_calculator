// ./components/booleanSimplifier/BooleanSimplifier.js

"use client";
import React, { useState } from "react";
import BooleanExpressionInput from "./BooleanExpressionInput";
import { simplifyBooleanExpression } from "../../utils/simplifyBooleanExpression";

function BooleanSimplifier() {
  const [expression, setExpression] = useState("");
  const [simplifiedExpression, setSimplifiedExpression] = useState("");

  const handleSimplifyExpression = () => {
    const simplified = simplifyBooleanExpression(expression);
    console.log(expression); 
    setSimplifiedExpression(simplified);
  };

  return (
    <div>
      <BooleanExpressionInput
        expression={expression}
        setExpression={setExpression}
      />
      <button onClick={handleSimplifyExpression}>Simplify Expression</button>
      <p>Simplified Expression: {simplifiedExpression}</p>
    </div>
  );
}

export default BooleanSimplifier;
