// booleanOperation.js
"use client";

import React from "react";

export default function BooleanOperation({ operation, setOperation, style }) {
  return (
    <select value={operation} onChange={(e) => setOperation(e.target.value)} style={style}>
      <option value="AND">AND</option>
      <option value="OR">OR</option>
      <option value="XOR">XOR</option>
      <option value="NOT">NOT</option>
    </select>
  );
}
