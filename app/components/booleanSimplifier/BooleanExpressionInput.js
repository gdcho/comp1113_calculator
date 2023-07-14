// booleanSimplifier/BooleanExpressionInput.js
"use client";

import React from "react";

function BooleanExpressionInput({ expression, setExpression }) {
  return (
    <div>
      <label htmlFor="booleanExpression" style={{ display: "block" }}>
        Enter Boolean Expression:
      </label>
      <input
        id="booleanExpression"
        type="text"
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "4px",
          border: "1px solid gray",
        }}
        value={expression}
        onChange={(event) => setExpression(event.target.value)}
      />
    </div>
  );
}

export default BooleanExpressionInput;
