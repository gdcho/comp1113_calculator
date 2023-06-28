// components/baseCalculate/Result.js
import React from 'react';

const CalculateResult = ({ result }) => {
  if (result === null) {
    return null;
  }

  return (
    <div>
      <h2>Result</h2>
      <p>{result}</p>
    </div>
  );
};

export default CalculateResult;
