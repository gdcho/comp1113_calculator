"use client";

export function calculateMatrixOperation(matrix1, matrix2, operation) {
    // Parse matrix strings into 2D arrays
    const m1 = matrix1.split('\n').map(row => row.split(' ').map(Number));
    const m2 = matrix2.split('\n').map(row => row.split(' ').map(Number));
  
    let result;
  
    switch(operation) {
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
        result = transposeMatrix(m1); // Let's suppose it transposes the first matrix
        break;
      case "Determinant":
        result = determinantMatrix(m1); // Let's suppose it calculates the determinant of the first matrix
        break;
      case "Inverse":
        result = inverseMatrix(m1); // Let's suppose it calculates the inverse of the first matrix
        break;
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  
    // Convert result back into a string
    return result.map(row => row.join(' ')).join('\n');
  }
  
  // Below, you would have to define your matrix operation functions such as addMatrices, subtractMatrices, etc.
  // For example, the addMatrices function might look like this:
  
  function addMatrices(m1, m2) {
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) {
      throw new Error('Matrices must have the same dimensions to be added');
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
  