// booleanCalculations.js
"use client";

export function calculateBoolean(value1, value2, operation) {
  switch (operation) {
    case "AND":
      return value1 && value2;
    case "OR":
      return value1 || value2;
    case "XOR":
      return value1 ^ value2; // ^ is the JavaScript operator for XOR
    case "NOT":
      return !value1;
    default:
      return false;
  }
}
