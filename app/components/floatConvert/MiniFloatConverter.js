import React, { useState, useEffect } from "react";
import { convertToMiniFloat, convertFromMiniFloat } from "../../utils/miniFloat";

export default function MiniFloatConverter() {
  const [decimalValue, setDecimalValue] = useState("");
  const [miniFloatValue, setMiniFloatValue] = useState("");

  const handleDecimalChange = (e) => {
    const val = e.target.value;
    setDecimalValue(val);
    if (val !== "" && !isNaN(val)) {
      const miniFloat = convertToMiniFloat(parseFloat(val));
      setMiniFloatValue(miniFloat);
    }
  }

  const handleMiniFloatChange = (e) => {
    const val = e.target.value;
    setMiniFloatValue(val);
    if (val !== "" && val.length === 10) {
      const decimal = convertFromMiniFloat(val);
      setDecimalValue(decimal);
    }
  }

  return (
    <div>
      <input 
        type="text" 
        value={decimalValue} 
        onChange={handleDecimalChange} 
        placeholder="Enter a decimal value"
      />
      <input 
        type="text" 
        value={miniFloatValue} 
        onChange={handleMiniFloatChange} 
        placeholder="Enter a 10-bit floating point value"
      />
    </div>
  );
}
