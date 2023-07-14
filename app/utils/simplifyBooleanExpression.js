// utils/simplifyBooleanExpression.js

export function simplifyBooleanExpression(expression) {
  let simplifiedExpression = expression;

  // Identity A + 0 = A
  simplifiedExpression = simplifiedExpression.replace(/(\w)\s*\+\s*0/g, "$1");
  simplifiedExpression = simplifiedExpression.replace(/0\s*\+\s*(\w)/g, "$1");

  // Identity A . 1 = A
  simplifiedExpression = simplifiedExpression.replace(/(\w)\s*\.\s*1/g, "$1");
  simplifiedExpression = simplifiedExpression.replace(/1\s*\.\s*(\w)/g, "$1");

  // Identity A + A' = 1
  simplifiedExpression = simplifiedExpression.replace(/(\w)\s*\+\s*\1'/g, "1");
  simplifiedExpression = simplifiedExpression.replace(/(\w)'\s*\+\s*\1/g, "1");

  // Identity A . A' = 0
  simplifiedExpression = simplifiedExpression.replace(/(\w)\s*\.\s*\1'/g, "0");
  simplifiedExpression = simplifiedExpression.replace(/(\w)'\s*\.\s*\1/g, "0");

  return simplifiedExpression;
}
