// booleanOperation.js
"use client";

import React from "react";

export default function BooleanOperation({ operation, setOperation }) {
  return (
    <select value={operation} onChange={(e) => setOperation(e.target.value)}>
      <option value="AND">AND</option>
      <option value="OR">OR</option>
      <option value="XOR">XOR</option>
      <option value="NOT">NOT</option>
    </select>
  );
}
