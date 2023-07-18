// utils/simplifyBooleanExpression.js

// export function simplifyBooleanExpression(expression) {
//   let simplifiedExpression = expression;

//   const replacements = [
//     // Distributivity A . (B + C) = (A . B) + (A . C)
//     {
//       regex: /(\w)\s*\.\s*(?:\(\s*)?(\w)\s*\+\s*(\w)(?:\s*\))?/g,
//       replacement: "($1 . $2) + ($1 . $3)",
//     },

//     // Reverse Distributivity (A . B) + (A . C) = A . (B + C)
//     {
//       regex: /(?:\(\s*)?(\w)\s*\.\s*(\w)(?:\s*\))?\s*\+\s*(?:\(\s*)?\1\s*\.\s*(\w)(?:\s*\))?/g,
//       replacement: "$1 . ($2 + $3)",
//     },

//     // Identity A + 0 = A and A . 1 = A
//     { regex: /(\w)\s*\+\s*0/g, replacement: "$1" },
//     { regex: /0\s*\+\s*(\w)/g, replacement: "$1" },
//     { regex: /(\w)\s*\.\s*1/g, replacement: "$1" },
//     { regex: /1\s*\.\s*(\w)/g, replacement: "$1" },

//     // Commutative Property for A . B = B . A and A + B = B + A
//     {
//       regex: /\(\s*(\w)\s*\+\s*(\w)\s*\)/g,
//       replacement: function (match, p1, p2) {
//         return p1 <= p2 ? match : `(${p2} + ${p1})`;
//       },
//     },
//     {
//       regex: /\(\s*(\w)\s*\.\s*(\w)\s*\)/g,
//       replacement: function (match, p1, p2) {
//         return p1 <= p2 ? match : `(${p2} . ${p1})`;
//       },
//     },

//     // Domination A + 1 = 1 and A . 0 = 0
//     { regex: /(\w)\s*\+\s*1/g, replacement: "1" },
//     { regex: /1\s*\+\s*(\w)/g, replacement: "1" },
//     { regex: /(\w)\s*\.\s*0/g, replacement: "0" },
//     { regex: /0\s*\.\s*(\w)/g, replacement: "0" },

//     // Idempotency A + A = A and A . A = A
//     { regex: /(\w)\s*\+\s*\1/g, replacement: "$1" },
//     { regex: /(\w)\s*\.\s*\1/g, replacement: "$1" },

//     // Double Negation A'' = A
//     { regex: /(\w)''/g, replacement: "$1" },

//     // DeMorgan’s Theorems (A + B)' = A'.B' and (A . B)' = A' + B'
//     { regex: /\(\s*(\w)\s*\+\s*(\w)\s*\)'/g, replacement: "$1' . $2'" },
//     { regex: /\(\s*(\w)\s*\.\s*(\w)\s*\)'/g, replacement: "$1' + $2'" },

//     // Inverse Elements A + A' = 1 and A . A' = 0
//     { regex: /(\w)\s*\+\s*\1'/g, replacement: "1" },
//     { regex: /(\w)'\s*\+\s*\1/g, replacement: "1" },
//     { regex: /(\w)\s*\.\s*\1'/g, replacement: "0" },
//     { regex: /(\w)'\s*\.\s*\1/g, replacement: "0" },

//     // Absorption A + A.B = A and A.(A + B) = A
//     { regex: /(\w)\s*\+\s*\1\s*\.\s*(\w)/g, replacement: "$1" },
//     { regex: /(\w)\s*\.\s*\(\s*\1\s*\+\s*(\w)\s*\)/g, replacement: "$1" },
//   ];

//   let modified;
//   do {
//     modified = false;
//     for (let { regex, replacement } of replacements) {
//       const newExpression = simplifiedExpression.replace(regex, replacement);
//       if (newExpression !== simplifiedExpression) {
//         simplifiedExpression = newExpression;
//         modified = true;
//       }
//     }
//   } while (modified);

//   return simplifiedExpression;
// }

import { tokenize, parse, TYPES } from './tokenizerAndParser';

function simplifyTree(tree) {
  if (tree.type === 'AND' || tree.type === 'OR') {
    const left = simplifyTree(tree.left);
    const right = simplifyTree(tree.right);

    if (left.type === TYPES.SYMBOL && right.type === TYPES.SYMBOL) {
      if (left.value === right.value) {
        return left;
      }
    }

    return { type: tree.type, left, right };
  }

  if (tree.type === TYPES.NOT) {
    const child = simplifyTree(tree.child);

    if (child.type === TYPES.SYMBOL && child.value === tree.value) {
      return child;
    }

    return { type: TYPES.NOT, child };
  }

  return tree;
}

export function simplifyBooleanExpression(expression) {
  const tokens = tokenize(expression);
  const tree = parse(tokens);
  const simplified = simplifyTree(tree);

  const simplifiedExpression = treeToString(simplified);
  return simplifiedExpression;
}

function treeToString(tree) {
  if (tree.type === 'AND' || tree.type === 'OR') {
    const operator = tree.type === 'AND' ? '.' : '+';
    return `(${treeToString(tree.left)} ${operator} ${treeToString(tree.right)})`;
  }

  if (tree.type === TYPES.NOT) {
    return `${tree.child.value}'`;
  }

  return tree.value;
}
