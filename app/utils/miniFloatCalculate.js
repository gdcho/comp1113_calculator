// utils/miniFloatCalculate.js

import { convertToMiniFloat, convertFromMiniFloat } from "./miniFloat.js";

function isBinary(num) {
  num = num.toString();
  return /^[01]+$/.test(num) && num.length === 10; 
}

function isDecimal(num) {
  num = num.toString();
  return /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(num);
}

export function miniFloatAddition(a, b) {
  a = a.toString();
  b = b.toString();

  let isBinaryA = isBinary(a);
  let isBinaryB = isBinary(b);

  let isDecimalA = isDecimal(a);
  let isDecimalB = isDecimal(b);

  if (isBinaryA) {
    a = convertFromMiniFloat(a);
  }
  if (isBinaryB) {
    b = convertFromMiniFloat(b);
  }

  let sum = parseFloat(a) + parseFloat(b);

  let miniFloatSum = convertToMiniFloat(sum);

  let lossPercentage =
    (Math.abs(sum - convertFromMiniFloat(miniFloatSum)) / Math.abs(sum)) * 100;

  return {
    miniFloatResult: miniFloatSum,
    decimalResult: sum,
    lossPercentage: lossPercentage,
  };
}

export function miniFloatSubtraction(a, b) {
  a = a.toString();
  b = b.toString();

  let isBinaryA = isBinary(a);
  let isBinaryB = isBinary(b);

  let isDecimalA = isDecimal(a);
  let isDecimalB = isDecimal(b);

  if (isBinaryA) {
    a = convertFromMiniFloat(a);
  }
  if (isBinaryB) {
    b = convertFromMiniFloat(b);
  }

  let difference = parseFloat(a) - parseFloat(b);

  let miniFloatDifference = convertToMiniFloat(difference);

  let decimalDifferenceFromMiniFloat =
    convertFromMiniFloat(miniFloatDifference);
  let lossPercentage =
    (Math.abs(difference - decimalDifferenceFromMiniFloat) /
      Math.abs(difference)) *
    100;

  return { miniFloatResult: miniFloatDifference, lossPercentage };
}
