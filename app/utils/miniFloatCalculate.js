// utils/miniFloatCalculate.js

import { convertToMiniFloat, convertFromMiniFloat } from './miniFloat.js';

export function miniFloatAddition(a, b, isDecimal = true) {
    // If inputs are in decimal form, convert them to mini float
    if (isDecimal) {
        a = convertToMiniFloat(a);
        b = convertToMiniFloat(b);
    }

    // Convert mini float to decimal for addition
    let aDecimal = convertFromMiniFloat(a);
    let bDecimal = convertFromMiniFloat(b);
    let decimalSum = aDecimal + bDecimal;

    // Convert decimal sum back to mini float
    let miniFloatSum = convertToMiniFloat(decimalSum);

    // Convert mini float sum to decimal for output
    let decimalResult = convertFromMiniFloat(miniFloatSum);

    // Calculate % loss
    let lossPercentage = (Math.abs(decimalSum - decimalResult) / Math.abs(decimalSum)) * 100;

    return { miniFloatSum, decimalResult, lossPercentage };
}


export function miniFloatSubtraction(a, b, isDecimal = true) {
    // If inputs are in decimal form, convert them to mini float
    if (isDecimal) {
        a = convertToMiniFloat(a);
        b = convertToMiniFloat(b);
    }

    // Convert mini float to decimal for subtraction
    let aDecimal = convertFromMiniFloat(a);
    let bDecimal = convertFromMiniFloat(b);
    let decimalDifference = aDecimal - bDecimal;

    // Convert decimal difference back to mini float
    let miniFloatResult = convertToMiniFloat(decimalDifference);

    // Calculate % loss
    let decimalDifferenceFromMiniFloat = convertFromMiniFloat(miniFloatResult);
    let lossPercentage = (Math.abs(decimalDifference - decimalDifferenceFromMiniFloat) / Math.abs(decimalDifference)) * 100;

    return { miniFloatResult, lossPercentage };
}