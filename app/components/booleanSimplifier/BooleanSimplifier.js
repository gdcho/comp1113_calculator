// ./components/booleanSimplifier/BooleanSimplifier.js
import React, { useState } from "react";
import BooleanExpressionInput from "./BooleanExpressionInput";
import axios from 'axios';

function BooleanSimplifier() {
  const [expression, setExpression] = useState("");
  const [simplifiedExpression, setSimplifiedExpression] = useState("");

  const handleSimplifyExpression = async () => {
    const response = await axios.post('http://127.0.0.1:5000/simplify', { expression });
    const simplified = response.data.result;
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
