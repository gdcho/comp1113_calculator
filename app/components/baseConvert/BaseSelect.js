import React from 'react';

function BaseSelect({ base, setBase, style }) {
  return (
    <select
      style={style}
      value={base}
      onChange={(e) => setBase(parseInt(e.target.value))}
    >
      {Array.from({ length: 35 }, (_, i) => i + 2).map((base) => (
        <option key={base} value={base}>
          Base {base}
        </option>
      ))}
    </select>
  );
}

export default BaseSelect;
