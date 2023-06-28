// components/baseCalculate/OperationSelect.js
import React from 'react';

function OperationSelect({ operation, setOperation }) {
  return (
    <select value={operation} onChange={(e) => setOperation(e.target.value)}>
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>
  );
}

export default OperationSelect;