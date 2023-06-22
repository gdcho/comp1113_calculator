"use client";
import { useState, useEffect } from 'react';

function convertBase(value, fromBase, toBase) {
  // Split the input into integer and fractional parts
  const [integerPart, fractionalPart] = value.split('.');

  // Convert the integer part
  let decimalInteger = parseInt(integerPart, fromBase);
  if (isNaN(decimalInteger)) {
    return 'Invalid input';
  }

  // Convert the fractional part
  let decimalFraction = 0;
  if (fractionalPart !== undefined) {
    for (let i = 0; i < fractionalPart.length; i++) {
      let digitValue = parseInt(fractionalPart[i], fromBase);
      if (isNaN(digitValue)) {
        return 'Invalid input';
      }
      decimalFraction += digitValue / Math.pow(fromBase, i + 1);
    }
  }

  // Combine the integer and fractional parts and convert to the target base
  const decimalValue = decimalInteger + decimalFraction;
  return decimalValue.toString(toBase);
}

function calculateConversion(value, fromBase, toBase) {
  const [integerPart, fractionalPart] = value.split('.');

  let calculation = '';

  // Conversion from Decimal to Other Base System
  if (fromBase === 10) {
    let integerCalculation = parseInt(integerPart, 10);
    let convertedInteger = '';
    calculation += `${integerPart}(10) = `;
    while (integerCalculation > 0) {
      const remainder = integerCalculation % toBase;
      convertedInteger = remainder.toString() + convertedInteger;
      calculation += `${integerCalculation} ÷ ${toBase} = ${Math.floor(integerCalculation / toBase)} (Quotient), ${remainder} (Remainder)\n`;
      integerCalculation = Math.floor(integerCalculation / toBase);
    }

    let convertedFractional = '';
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
  // Conversion from Other Base System to Decimal
  else if (toBase === 10) {
    let decimalValue = 0;
    calculation += `${value}(${fromBase}) = `;

    // Integer part calculations
    for (let i = 0; i < integerPart.length; i++) {
      const digitValue = parseInt(integerPart[i], fromBase);
      const power = integerPart.length - i - 1;
      const term = `${digitValue} × ${fromBase}^${power}`;
      decimalValue += digitValue * Math.pow(fromBase, power);
      calculation += term + (i !== integerPart.length - 1 ? ' + ' : '');
    }

    // Fractional part calculations
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
  // Conversion from Other Base System to Non-Decimal System
  else {
    const decimalValue = convertBase(value, fromBase, 10);
    calculation += `${value}(${fromBase}) = ${decimalValue}(10)`;

    const convertedValue = convertBase(decimalValue, 10, toBase);

    calculation += ` = ${convertedValue}(${toBase})`;
  }

  return calculation;
}



export default function Home() {
  const [value, setValue] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(10);
  const [result, setResult] = useState('');
  const [calculation, setCalculation] = useState('');

  useEffect(() => {
    const converted = convertBase(value, fromBase, toBase);
    setResult(converted);
    setCalculation(calculateConversion(value, fromBase, toBase));
  }, [value, fromBase, toBase]);

  return (
    <div>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Value" />
      <br />
      <select value={fromBase} onChange={e => setFromBase(parseInt(e.target.value))}>
        {Array.from({length: 35}, (_, i) => i + 2).map(base => <option key={base} value={base}>Base {base}</option>)}
      </select>
      <p>to</p>
      <br />
      <select value={toBase} onChange={e => setToBase(parseInt(e.target.value))}>
        {Array.from({length: 35}, (_, i) => i + 2).map(base => <option key={base} value={base}>Base {base}</option>)}
      </select>
      <p>Result: ({result})<sub>{toBase}</sub></p>
      <p>Calculation:</p>
      <pre>{calculation}</pre>
    </div>
  );
}
