// booleanAlgebra/SOPPOS.js
"use client";
import React, { useState } from 'react';

function BooleanExpression() {
  const [terms, setTerms] = useState('xy\' + xyz\' + x\'z');

  const handleTermsChange = (event) => {
    setTerms(event.target.value);
  };

  const mode = terms.includes('(' && ')') ? 'POS' : 'SOP';
  console.log(mode)
  const binaryConverter = mode === 'SOP' ? convertToBinarySOP : convertToBinaryPOS;
  const currentTerms = calculateTerms(terms, binaryConverter);
  
  // Compute complementary terms
  const complementaryTerms = calculateComplementaryTerms(currentTerms);

  function calculateTerms(terms, binaryConverter) {
    // Split the terms and convert them to binary representation
    const splitChar = mode === 'SOP' ? '+' : '*';
    const splitTerms = terms.split(splitChar).map(term => term.trim());
    const binaryTermsList = splitTerms.map(term => binaryConverter(term));
    
    // Calculate terms by converting binary to decimal
    const termValues = binaryTermsList.flat().map(binaryTerm => parseInt(binaryTerm, 2));
    
    // Sort in ascending order and remove duplicates
    termValues.sort((a, b) => a - b);
    const uniqueTerms = Array.from(new Set(termValues));
    
    return uniqueTerms;
  }

  function calculateComplementaryTerms(terms) {
    const allPossibleTerms = Array.from({length: 8}, (_, i) => i); // [0, 1, 2, ..., 7]
    const complementaryTerms = allPossibleTerms.filter(term => !terms.includes(term));
    
    return complementaryTerms;
  }

  function convertToBinarySOP(term) {
    const variables = ['x', 'y', 'z'];
    const combinations = generateCombinations(term, variables, mode);
    
    return combinations;
  }

  function convertToBinaryPOS(term) {
    term = term.replace(/[()]/g, ''); // remove parentheses
    const variables = ['x', 'y', 'z'];
    const combinations = generateCombinations(term, variables, mode);
    
    return combinations;
  }

  function generateCombinations(term, variables, mode) {
    const combinations = [];

    for (let i = 0; i < 8; i++) { // loop for 8 combinations of three binary variables
      let combination = i.toString(2).padStart(3, '0'); // convert i to binary string of length 3
      let valid = true;

      for (let j = 0; j < 3; j++) { // loop for three variables x, y, z
        let variable = variables[j];
        let bit = combination.charAt(j);

        if (term.includes(variable)) {
          if ((mode === 'SOP' && bit === '1') || (mode === 'POS' && bit === '0')) {
            if (term.includes(variable + '\'')) {
              valid = false;
              break;
            }
          } else {
            if (!term.includes(variable + '\'')) {
              valid = false;
              break;
            }
          }
        }
      }

      if (valid) {
        combinations.push(combination);
      }
    }

    return combinations;
  }

  return (
    <div>
      <textarea value={terms} onChange={handleTermsChange} />
      <div>
        {mode === 'SOP' && (
          <>
            <div>Minterms: Σm({currentTerms.join(', ')})</div>
            <div>Maxterms: πM({complementaryTerms.join(', ')})</div>
          </>
        )}
        {mode === 'POS' && (
          <>
            <div>Minterms: Σm({complementaryTerms.join(', ')})</div>
            <div>Maxterms: πM({currentTerms.join(', ')})</div>
          </>
        )}
      </div>
    </div>
  );
}

export default BooleanExpression;
