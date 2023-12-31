// ./components/booleanSimplifier/BooleanSimplifier.js
import React, { useState } from "react";
import BooleanExpressionInput from "./BooleanExpressionInput";
import axios from "axios";
import { re } from "mathjs";

function BooleanSimplifier() {
  const [expression, setExpression] = useState("");
  const [simplifiedExpression, setSimplifiedExpression] = useState("");

  const handleSimplifyExpression = async () => {
    if (expression.trim() === "") {
      alert("Please input an expression");
      return;
    }
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/simplify',
      data: {
        expression,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const simplified = response.data.result;
    setSimplifiedExpression(simplified);
  };

  return (
    <>
      <div
        style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
      >
        <ul>
          <li>
            <b>&amp;</b> (ampersand) for AND operation
          </li>
          <li>
            <b>|</b> (vertical bar) for OR operation
          </li>
          <li>
            <b>~</b> (tilde) for NOT operation
          </li>
          <li>
            Use parentheses <b>()</b> to denote operation precedence
          </li>
          <li>
            Expressions should be formed with the variables <b>A, B, C</b>
          </li>
        </ul>
      </div>
      <BooleanExpressionInput
        expression={expression}
        setExpression={setExpression}
      />
      <button onClick={handleSimplifyExpression}>Simplify Expression</button>
      <p>Simplified Expression: {simplifiedExpression}</p>
    </>
  );
}

export default BooleanSimplifier;
