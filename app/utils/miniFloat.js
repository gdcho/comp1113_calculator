// utils/miniFloat.js
export function convertToMiniFloat(decimal) {
    let sign = decimal < 0 ? 1 : 0;

    decimal = Math.abs(decimal);

    if (decimal === 0) {
        return '0000000000';
    } else if (!Number.isFinite(decimal)) {
        return decimal > 0 ? '0111100000' : '1111100000';
    } else {
        let binary = decimal.toString(2);

        let decimalExponent, normalizedBinary;

        if (Number.isInteger(decimal)) {
            decimalExponent = binary.length - 1;
            normalizedBinary = binary;
        } else {
            let integerPart = binary.substring(0, binary.indexOf('.')) || '0';
            let fractionPart = binary.substring(binary.indexOf('.')+1);
            if(integerPart !== '0') { 
                decimalExponent = integerPart.length - 1;
                normalizedBinary = integerPart + fractionPart;
            } else {
                let firstNonZeroInFraction = fractionPart.indexOf('1');
                decimalExponent = -firstNonZeroInFraction - 1;
                normalizedBinary = fractionPart.substring(firstNonZeroInFraction);
            }
        }

        let miniExponent = decimalExponent + 7;
        let miniMantissa = normalizedBinary.slice(1, 6);

        let miniFloat = `${sign}${miniExponent.toString(2).padStart(4, '0')}${miniMantissa.padEnd(5, '0')}`;
        return miniFloat.padStart(10, '0');
    }
}

export function convertFromMiniFloat(miniFloat) {
    let sign = parseInt(miniFloat.slice(0, 1), 2);
    let exponent = parseInt(miniFloat.slice(1, 5), 2) - 7;
    let mantissa = miniFloat.slice(5); 

    if (exponent === -7 && mantissa !== "00000") { // denormalized form
        exponent = -6;
        mantissa = '0' + mantissa.slice(1);
    } else if (exponent === 8) { // Infinity or NaN
        if (mantissa === "00000") {
            return sign === 1 ? -Infinity : Infinity;
        } else {
            return NaN;
        }
    } else {
        mantissa = '1' + mantissa;
    }

    // Convert mantissa to decimal
    let mantissaDecimal = 0;
    for (let i = 0; i < mantissa.length; i++) {
        mantissaDecimal += parseInt(mantissa[i]) * Math.pow(2, -i);
    }

    // Compute the decimal number from the mini float representation
    let decimal = mantissaDecimal * Math.pow(2, exponent);
    return sign === 1 ? -decimal : decimal;
}
