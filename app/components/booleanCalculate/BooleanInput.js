// booleanInput.js
"use client";

import React from "react";

export default function BooleanInput({ value, setValue }) {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => setValue(e.target.checked)}
    />
  );
}
