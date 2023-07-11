// utils/miniFloat.js
export function convertToMiniFloat(decimal) {
    let buffer = new ArrayBuffer(8);
    let dataView = new DataView(buffer);
    dataView.setFloat64(0, decimal);

    let sign = (dataView.getUint8(0) & 0b10000000) >>> 7;
    let exponent = ((dataView.getUint8(0) & 0b01111111) << 4 | (dataView.getUint8(1) & 0b11110000) >>> 4) - 1023;
    let mantissa = (dataView.getUint32(1) & 0b00001111111111111111111111111111);

    exponent = Math.floor((exponent + 15) / 2) + 7;

    if (exponent <= 0) {
        mantissa = Math.floor(mantissa / Math.pow(2, -exponent + 1));
        exponent = 0;
    } else if (exponent >= 15) {
        if (mantissa === 0) {
            exponent = 15;
        } else {
            exponent = 15;
            mantissa = 1;
        }
    } else {
        mantissa = Math.floor(mantissa / Math.pow(2, 21));
    }

    let miniFloat = sign << 9 | exponent << 5 | mantissa;
    // convert to binary string and pad it to 10 bits
    return miniFloat.toString(2).padStart(10, '0');
}

export function convertFromMiniFloat(miniFloat) {
    let sign = (parseInt(miniFloat, 2) & 0b1000000000) >>> 9;
    let exponent = (parseInt(miniFloat, 2) & 0b0111110000) >>> 5;
    let mantissa = parseInt(miniFloat, 2) & 0b00000011111;

    let buffer = new ArrayBuffer(8);
    let dataView = new DataView(buffer);

    if (exponent === 0) {
        if (mantissa !== 0) {
            exponent = -6;
        }
    } else if (exponent === 15) {
        if (mantissa === 0) {
            exponent = 1023 + 7;
        } else {
            return NaN;
        }
    } else {
        exponent = (exponent - 7) * 2 - 1;
        mantissa = mantissa << 21;
    }

    sign = sign << 7;
    exponent = (exponent + 1023) << 4 | ((mantissa & 0b111100000000000000000) >>> 17);
    mantissa = mantissa & 0b00001111111111111111;

    dataView.setUint8(0, sign | (exponent >>> 4));
    dataView.setUint8(1, (exponent << 4) | (mantissa >>> 16));
    dataView.setUint16(2, (mantissa & 0b1111111111111111) << 16);

    return dataView.getFloat64(0);
}

