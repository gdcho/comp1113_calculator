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
    let sign = parseInt(miniFloat.charAt(0), 2) === 1 ? -1 : 1;
    let exponent = parseInt(miniFloat.slice(1, 5), 2);
    let mantissa = miniFloat.slice(5); 

    let total = exponent !== 0 ? 1 : 0;
    for (let i = 0; i < mantissa.length; i++) {
        total += parseInt(mantissa.charAt(i), 2) / Math.pow(2, i+1);
    }

    // Handle the special cases
    if (exponent === 0) {
        if (mantissa === "00000") {
            return 0;  // Zero
        } else {
            // De-normalized form
            exponent = -6;
        }
    } else if (exponent === 15) {
        if (mantissa === "00000") {
            return sign === -1 ? -Infinity : Infinity; // Infinity
        } else {
            return NaN; // Not a number
        }
    } else {
        // The bias is -7 for normal numbers
        exponent -= 7;
    }

    let result = sign * total * Math.pow(2, exponent);
    return result;
}


