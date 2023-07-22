function convertBase(value, fromBase, toBase) {
    const [integerPart, fractionalPart] = value.split(".");
  
    let decimalInteger = parseInt(integerPart, fromBase);
    if (isNaN(decimalInteger)) {
      return "Invalid input";
    }
  
    let decimalFraction = 0;
    if (fractionalPart !== undefined) {
      for (let i = 0; i < fractionalPart.length; i++) {
        let digitValue = parseInt(fractionalPart[i], fromBase);
        if (isNaN(digitValue)) {
          return "Invalid input";
        }
        decimalFraction += digitValue / Math.pow(fromBase, i + 1);
      }
    }
  
    const decimalValue = decimalInteger + decimalFraction;
    return decimalValue.toString(toBase);
  }

  export { convertBase };
  
  function calculateConversion(value, fromBase, toBase) {
    const [integerPart, fractionalPart] = value.split(".");
  
    let calculation = "";
  
    if (fromBase === 10) {
      let integerCalculation = parseInt(integerPart, 10);
      let convertedInteger = "";
      calculation += `${integerPart}(10) = `;
      while (integerCalculation > 0) {
        const remainder = integerCalculation % toBase;
        convertedInteger = remainder.toString() + convertedInteger;
        calculation += `${integerCalculation} ÷ ${toBase} = ${Math.floor(
          integerCalculation / toBase
        )} (Quotient), ${remainder} (Remainder)\n`;
        integerCalculation = Math.floor(integerCalculation / toBase);
      }
  
      let convertedFractional = "";
      if (fractionalPart !== undefined) {
        const fractionalValue = parseFloat(`0.${fractionalPart}`);
        let fractionalCalculation = fractionalValue;
        let precision = fractionalPart.length;
        calculation += `${fractionalPart}(10) = `;
        while (fractionalCalculation > 0 && precision > 0) {
          const product = fractionalCalculation * toBase;
          const digit = Math.floor(product);
          convertedFractional += digit.toString();
          calculation += `${fractionalCalculation} × ${toBase} = ${product} (Product), ${digit} (Digit)\n`;
          fractionalCalculation = product - digit;
          precision--;
        }
        calculation += `${convertedFractional} (${toBase})`;
      }
  
      calculation += ` = ${convertedInteger}`;
      if (fractionalPart !== undefined) {
        calculation += `.${convertedFractional}`;
      }
      calculation += ` (${toBase})`;
    }
    else if (toBase === 10) {
      let decimalValue = 0;
      calculation += `${value}(${fromBase}) = `;
  
      for (let i = 0; i < integerPart.length; i++) {
        const digitValue = parseInt(integerPart[i], fromBase);
        const power = integerPart.length - i - 1;
        const term = `${digitValue} × ${fromBase}^${power}`;
        decimalValue += digitValue * Math.pow(fromBase, power);
        calculation += term + (i !== integerPart.length - 1 ? " + " : "");
      }
  
      if (fractionalPart !== undefined) {
        for (let i = 0; i < fractionalPart.length; i++) {
          const digitValue = parseInt(fractionalPart[i], fromBase);
          const power = -(i + 1);
          const term = `${digitValue} × ${fromBase}^${power}`;
          decimalValue += digitValue * Math.pow(fromBase, power);
          calculation += ` + ${term}`;
        }
      }
  
      calculation += ` = ${decimalValue}(10)`;
    }
    else {
      const decimalValue = convertBase(value, fromBase, 10);
      calculation += `${value}(${fromBase}) = ${decimalValue}(10)`;
  
      const convertedValue = convertBase(decimalValue, 10, toBase);
  
      calculation += ` = ${convertedValue}(${toBase})`;
    }
  
    return calculation;
  }

  export { calculateConversion };