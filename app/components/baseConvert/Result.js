import React from 'react';

function Result({ result, calculation, toBase }) {
  return (
    <>
      <p>
        Result: ({result})<sub>{toBase}</sub>
      </p>
      <p>Calculation:</p>
      <pre>{calculation}</pre>
    </>
  );
}

export default Result;
