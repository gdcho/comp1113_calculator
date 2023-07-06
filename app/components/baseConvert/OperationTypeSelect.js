// components/baseConvert/OperationTypeSelect.js
import React from 'react';

function OperationTypeSelect({ operationType, setOperationType, options }) {
  const handleChange = (event) => {
    setOperationType(event.target.value);
  };

  return (
    <select value={operationType} onChange={handleChange}>
      {options.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default OperationTypeSelect;
