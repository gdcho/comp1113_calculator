// components/baseCalculate/OperationSelect.js
import React from 'react';

function OperationSelect({ operation, setOperation, operationStyle }) {
  return (
    <select 
      value={operation} 
      onChange={(e) => setOperation(e.target.value)}
      style={operationStyle}
    >
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>
  );
}

export default OperationSelect;