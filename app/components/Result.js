import React from 'react';

function Result({ result, calculation, toBase }) {
  return (
    <div>
      <p>
        Result: ({result})<sub>{toBase}</sub>
      </p>
      <p>Calculation:</p>
      <pre>{calculation}</pre>
    </div>
  );
}

export default Result;
