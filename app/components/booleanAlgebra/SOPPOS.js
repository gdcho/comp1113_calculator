// booleanAlgebra/SOPPOS.js
"use client";
import { prod } from "mathjs";
import React, { useState } from "react";

function BooleanExpression() {
  const [terms, setTerms] = useState("xy' + xyz' + x'z");

  const handleTermsChange = (event) => {
    setTerms(event.target.value);
  };

  const mode = terms.includes("(" && ")") ? "POS" : "SOP";
  console.log(mode);
  const binaryConverter =
    mode === "SOP" ? convertToBinarySOP : convertToBinaryPOS;
  const currentTerms = calculateTerms(terms, binaryConverter);

  const complementaryTerms = calculateComplementaryTerms(currentTerms);

  function calculateTerms(terms, binaryConverter) {
    const splitChar = mode === "SOP" ? "+" : "*";
    const splitTerms = terms.split(splitChar).map((term) => term.trim());
    const binaryTermsList = splitTerms.map((term) => binaryConverter(term));

    const termValues = binaryTermsList
      .flat()
      .map((binaryTerm) => parseInt(binaryTerm, 2));

    termValues.sort((a, b) => a - b);
    const uniqueTerms = Array.from(new Set(termValues));

    return uniqueTerms;
  }

  function calculateComplementaryTerms(terms) {
    const allPossibleTerms = Array.from({ length: 8 }, (_, i) => i);
    const complementaryTerms = allPossibleTerms.filter(
      (term) => !terms.includes(term)
    );

    return complementaryTerms;
  }

  function convertToBinarySOP(term) {
    const variables = ["x", "y", "z"];
    const combinations = generateCombinations(term, variables, mode);

    return combinations;
  }

  function convertToBinaryPOS(term) {
    const variables = ["x", "y", "z"];
    const combinations = generateCombinations(term, variables, mode);

    return combinations;
  }

  function generateCombinations(term, variables, mode) {
    const combinations = [];

    for (let i = 0; i < 8; i++) {
      let combination = i.toString(2).padStart(3, "0");
      let valid = true;

      if (mode === "POS") {
        term = term.replace(/\)\(/g, ") * (");
        const products = term
          .split(" * ")
          .map((product) => product.replace(/[()]/g, "").trim());
        console.log(products);

        valid = products.every((product) => {
          let productSatisfied = false;

          for (let j = 0; j < 3; j++) {
            let variable = variables[j];
            let bit = combination.charAt(j);

            if (product.includes(variable)) {
              if (
                (bit === "1" && !product.includes(variable + "'")) ||
                (bit === "0" && product.includes(variable + "'"))
              ) {
                productSatisfied = true;
                break; 
              }
            }
          }

          return productSatisfied;
        });
      } else {
        for (let j = 0; j < 3; j++) {
          let variable = variables[j];
          let bit = combination.charAt(j);
          if (term.includes(variable)) {
            if (bit === "1" && term.includes(variable + "'")) {
              valid = false;
              break;
            } else if (bit === "0" && !term.includes(variable + "'")) {
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
    <>
      <textarea value={terms} onChange={handleTermsChange} />
      <>
        {mode === "SOP" && (
          <>
            <div>Minterms: Σm({currentTerms.join(", ")})</div>
            <div>Maxterms: πM({complementaryTerms.join(", ")})</div>
          </>
        )}
        {mode === "POS" && (
          <>
            <div>Minterms: Σm({currentTerms.join(", ")})</div>
            <div>Maxterms: πM({complementaryTerms.join(", ")})</div>
          </>
        )}
      </>
    </>
  );
}

export default BooleanExpression;
