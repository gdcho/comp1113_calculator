"use client";

export function calculateMatrixOperation(matrix1, matrix2, operation) {
  // Parse matrix strings into 2D arrays
  const m1 = matrix1.split("\n").map((row) => row.split(" ").map(Number));
  const m2 = matrix2.split("\n").map((row) => row.split(" ").map(Number));

  let result;

  switch (operation) {
    case "Add":
      result = addMatrices(m1, m2);
      break;
    case "Subtract":
      result = subtractMatrices(m1, m2);
      break;
    case "Multiply":
      result = multiplyMatrices(m1, m2);
      break;
    case "Transpose":
      result = transposeMatrix(m1); // It transposes the first matrix
      break;
    case "Determinant":
      result = determinantMatrix(m1); // It calculates the determinant of the first matrix
      break;
    case "Inverse":
      result = inverseMatrix(m1); // It calculates the inverse of the first matrix
      break;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }

  if (Array.isArray(result)) {
    // Convert result back into a string
    return result.map((row) => row.join(" ")).join("\n");
  } else {
    // If result is not an array, convert it to a string and return it
    return result.toString();
  }
}

function addMatrices(m1, m2) {
  if (m1.length !== m2.length || m1[0].length !== m2[0].length) {
    throw new Error("Matrices must have the same dimensions to be added");
  }

  const result = [];

  for (let i = 0; i < m1.length; i++) {
    const row = [];
    for (let j = 0; j < m1[i].length; j++) {
      row.push(m1[i][j] + m2[i][j]);
    }
    result.push(row);
  }

  return result;
}

function subtractMatrices(m1, m2) {
  if (m1.length !== m2.length || m1[0].length !== m2[0].length) {
    throw new Error("Matrices must have the same dimensions to be subtracted");
  }

  const result = [];

  for (let i = 0; i < m1.length; i++) {
    const row = [];
    for (let j = 0; j < m1[i].length; j++) {
      row.push(m1[i][j] - m2[i][j]);
    }
    result.push(row);
  }

  return result;
}

function multiplyMatrices(m1, m2) {
  if (m1.length !== m2.length) {
    throw new Error("The number of columns in the first matrix must be equal to the number of rows in the second matrix");
  }

  const result = [];

  for (let i = 0; i < m1.length; i++) {
    const row = [];
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < m1[i].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }

  return result;
}

function transposeMatrix(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

// This implementation assumes that you've imported the mathjs library
import * as math from 'mathjs';

function determinantMatrix(matrix) {
  return math.det(matrix);
}

function inverseMatrix(matrix) {
  return math.inv(matrix);
}

