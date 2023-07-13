// utils/miniFloatCalculate.js

import { convertToMiniFloat, convertFromMiniFloat } from "./miniFloat.js";

// Helper function to check if a number is binary
function isBinary(num) {
  num = num.toString();
  return /^[01]+$/.test(num) && num.length === 10; // The number is 10 bits binary
}

// Helper function to check if a number is decimal
function isDecimal(num) {
  num = num.toString();
  return /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(num);
}

export function miniFloatAddition(a, b) {
  // Convert inputs to string
  a = a.toString();
  b = b.toString();

  // Check if input is binary
  let isBinaryA = isBinary(a);
  let isBinaryB = isBinary(b);

  // Check if input is decimal
  let isDecimalA = isDecimal(a);
  let isDecimalB = isDecimal(b);

  // Convert from mini float to decimal if input is binary
  if (isBinaryA) {
    a = convertFromMiniFloat(a);
  }
  if (isBinaryB) {
    b = convertFromMiniFloat(b);
  }

  // Perform addition operation
  let sum = parseFloat(a) + parseFloat(b);

  // Convert back to mini float
  let miniFloatSum = convertToMiniFloat(sum);

  // Calculate loss percentage
  let lossPercentage =
    (Math.abs(sum - convertFromMiniFloat(miniFloatSum)) / Math.abs(sum)) * 100;

  return {
    miniFloatResult: miniFloatSum,
    decimalResult: sum,
    lossPercentage: lossPercentage,
  };
}

export function miniFloatSubtraction(a, b) {
  // Convert inputs to string
  a = a.toString();
  b = b.toString();

  // Check if input is binary
  let isBinaryA = isBinary(a);
  let isBinaryB = isBinary(b);

  // Check if input is decimal
  let isDecimalA = isDecimal(a);
  let isDecimalB = isDecimal(b);

  // Convert from mini float to decimal if input is binary
  if (isBinaryA) {
    a = convertFromMiniFloat(a);
  }
  if (isBinaryB) {
    b = convertFromMiniFloat(b);
  }

  // Perform subtraction operation
  let difference = parseFloat(a) - parseFloat(b);

  // Convert difference back to mini float
  let miniFloatDifference = convertToMiniFloat(difference);

  // Calculate % loss
  let decimalDifferenceFromMiniFloat =
    convertFromMiniFloat(miniFloatDifference);
  let lossPercentage =
    (Math.abs(difference - decimalDifferenceFromMiniFloat) /
      Math.abs(difference)) *
    100;

  return { miniFloatResult: miniFloatDifference, lossPercentage };
}
