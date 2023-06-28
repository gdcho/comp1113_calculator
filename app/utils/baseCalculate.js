// utils/baseCalculate.js
export const baseCalculate = (num1, num2, operation, base) => {
  // Convert numbers from the specified base to decimal
  let num1Decimal = convertBaseToDecimal(num1, base);
  let num2Decimal = convertBaseToDecimal(num2, base);
  
  let result = 0;
  
  // Perform the operation in decimal
  switch (operation) {
    case "+":
      result = num1Decimal + num2Decimal;
      break;
    case "-":
      result = num1Decimal - num2Decimal;
      break;
    case "*":
      result = num1Decimal * num2Decimal;
      break;
    case "/":
      if (num2Decimal !== 0) {
        result = num1Decimal / num2Decimal;
      } else {
        return null;
      }
      break;
    default:
      return;
  }
  
  // Convert the result back to the specified base
  return convertDecimalToBase(result, base);
};

// Convert a number from a specific base to decimal, supporting decimals
function convertBaseToDecimal(num, base) {
  let [integer, fraction = ''] = num.split('.');

  integer = parseInt(integer, base);
  fraction = fraction.split('').reduce((result, digit, index) => {
    return result + parseInt(digit, base) / Math.pow(base, index + 1);
  }, 0);

  return integer + fraction;
}

// Convert a number from decimal to a specific base, supporting decimals
function convertDecimalToBase(num, base) {
  let integer = Math.floor(num);
  let fraction = num - integer;
  integer = integer.toString(base);

  let fractionPart = '';
  while(fraction !== 0 && fractionPart.length < 16) {
    fraction *= base;
    let fractionDigit = Math.floor(fraction);
    fraction -= fractionDigit;
    fractionPart += fractionDigit.toString(base);
  }
  
  return integer + (fractionPart.length ? '.' + fractionPart : '');
}


