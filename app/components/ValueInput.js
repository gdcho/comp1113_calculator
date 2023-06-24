import React from 'react';

function ValueInput({ value, setValue }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Value"
    />
  );
}

export default ValueInput;
