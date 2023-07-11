const pad = (num, size) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const padForComplement = (num, size) => {
  let s = num + "";
  while (s.length < size) s = "1" + s;
  return s;
};

export const signedMagnitudeToDecimal = (binary) => {
  const sign = binary.charAt(0) === '1' ? -1 : 1;
  const number = parseInt(binary.substring(1), 2);
  return sign * number;
};

export const decimalToSignedMagnitude = (decimal) => {
  const sign = decimal < 0 ? '1' : '0';
  const number = pad(Math.abs(decimal).toString(2), 7);
  return sign + number;
};

export const excessKToDecimal = (binary, k) => {
  const decimal = parseInt(binary, 2);
  return decimal - k;
};

export const decimalToExcessK = (decimal, k) => {
  return pad((decimal + k).toString(2), 8);
};

export const onesComplementToDecimal = (binary) => {
  if (binary.charAt(0) === '1') {
    let onesComplement = '';
    for (let i = 0; i < binary.length; i++) {
      onesComplement += binary.charAt(i) === '1' ? '0' : '1';
    }
    return -1 * parseInt(onesComplement, 2);
  }
  return parseInt(binary, 2);
};

export const decimalToOnesComplement = (decimal) => {
  const binary = Math.abs(decimal).toString(2);
  if (decimal < 0) {
    let onesComplement = '';
    for (let i = 0; i < binary.length; i++) {
      onesComplement += binary.charAt(i) === '1' ? '0' : '1';
    }
    return padForComplement(onesComplement, 8);
  }
  return pad(binary, 8);
};

export const twosComplementToDecimal = (binary) => {
  if (binary.charAt(0) === '1') {
    let onesComplement = '';
    for (let i = 0; i < binary.length; i++) {
      onesComplement += binary.charAt(i) === '1' ? '0' : '1';
    }
    const decimal = parseInt(onesComplement, 2) + 1;
    return -1 * decimal;
  }
  return parseInt(binary, 2);
};

export const decimalToTwosComplement = (decimal) => {
  if (decimal >= 0) {
    return pad(decimal.toString(2), 8);
  } else {
    let binary = pad(Math.abs(decimal).toString(2), 8);
    let onesComplement = '';
    for (let i = 0; i < binary.length; i++) {
      onesComplement += binary.charAt(i) === '1' ? '0' : '1';
    }
    let twosComplement = (parseInt(onesComplement, 2) + 1).toString(2);
    return pad(twosComplement, 8);
  }
};
