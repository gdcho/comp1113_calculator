// components/signedNumber/NumberConverter.js

import React, { useState, useEffect } from 'react';
import {
  signedMagnitudeToDecimal,
  decimalToSignedMagnitude,
  excessKToDecimal,
  decimalToExcessK,
  onesComplementToDecimal,
  decimalToOnesComplement,
  twosComplementToDecimal,
  decimalToTwosComplement
} from '../../utils/numberConversions';

const NumberConverter = () => {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [representation, setRepresentation] = useState('signedMagnitude');
  const [k, setK] = useState('');

  useEffect(() => {
    if (decimal !== '') {
      switch (representation) {
        case 'signedMagnitude':
          setBinary(decimalToSignedMagnitude(parseInt(decimal, 10)));
          break;
        case 'excessK':
          setBinary(decimalToExcessK(parseInt(decimal, 10), parseInt(k, 10)));
          break;
        case 'onesComplement':
          setBinary(decimalToOnesComplement(parseInt(decimal, 10)));
          break;
        case 'twosComplement':
          setBinary(decimalToTwosComplement(parseInt(decimal, 10)));
          break;
        default:
          break;
      }
    }
  }, [representation, decimal, k]);

  const handleDecimalChange = (event) => {
    const newDecimal = event.target.value;
    setDecimal(newDecimal);
  }

  const handleBinaryChange = (event) => {
    const newBinary = event.target.value;
    setBinary(newBinary);

    if (newBinary !== '') {
      switch (representation) {
        case 'signedMagnitude':
          setDecimal(signedMagnitudeToDecimal(newBinary).toString());
          break;
        case 'excessK':
          setDecimal(excessKToDecimal(newBinary, k).toString());
          break;
        case 'onesComplement':
          setDecimal(onesComplementToDecimal(newBinary).toString());
          break;
        case 'twosComplement':
          setDecimal(twosComplementToDecimal(newBinary).toString());
          break;
        default:
          break;
      }
    } else {
      setDecimal('');
    }
  }

  const handleKChange = (event) => {
    const newK = event.target.value;
    setK(newK);
  }

  return (
    <div>
      <input type="text" value={decimal} onChange={handleDecimalChange} placeholder="Enter decimal number" />
      <input type="text" value={binary} onChange={handleBinaryChange} placeholder="Enter binary number" />
      <select value={representation} onChange={(event) => setRepresentation(event.target.value)}>
        <option value="signedMagnitude">Signed Magnitude</option>
        <option value="excessK">Excess K</option>
        <option value="onesComplement">One's Complement</option>
        <option value="twosComplement">Two's Complement</option>
      </select>
      {representation === 'excessK' && (
        <input type="text" value={k} onChange={handleKChange} placeholder="Enter K value" />
      )}
    </div>
  );
}

export default NumberConverter;
