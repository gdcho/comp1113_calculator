// components/baseConvert/OperationTypeSelect.js
import React from 'react';

function OperationTypeSelect({ operationType, setOperationType, options, operationStyle }) {
  const handleChange = (event) => {
    setOperationType(event.target.value);
  };

  return (
    <select value={operationType} onChange={handleChange} style={operationStyle}>
      {options.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default OperationTypeSelect;
