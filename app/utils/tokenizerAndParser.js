// utils/tokenizerAndParser.js

export const TYPES = {
  VARIABLE: "VARIABLE",
  NOT: "NOT",
  AND: "AND",
  OR: "OR",
  OPEN_PARENTHESIS: "OPEN_PARENTHESIS",
  CLOSE_PARENTHESIS: "CLOSE_PARENTHESIS",
};

export function tokenize(expression) {
  const regex = /\s*(=>|.|[A-Za-z_]\w*|\d+|\S)\s*/g;
  let result;

  const tokens = [];
  let previousToken = null;
  while ((result = regex.exec(expression)) !== null) {
    const token = result[1];
    let type;

    if (token === ".") {
      type = TYPES.AND;
    } else if (token === "+") {
      type = TYPES.OR;
    } else if (token === "(") {
      type = TYPES.OPEN_PARENTHESIS;
    } else if (token === ")") {
      type = TYPES.CLOSE_PARENTHESIS;
    } else if (/^[a-zA-Z]\w*$/.test(token)) {
      type = TYPES.VARIABLE;
    } else if (token === "'") {
      type = TYPES.NOT;
    } else {
      throw new Error(`Unknown token: ${token}`);
    }

    // If the previous token and the current token are both VARIABLE types,
    // insert an AND operator between them.
    if (previousToken && previousToken.type === TYPES.VARIABLE && type === TYPES.VARIABLE) {
      tokens.push({ type: TYPES.AND, value: '.' });
    }

    tokens.push({ type, value: token });
    previousToken = { type, value: token };
  }

  return tokens;
}

export function parse(tokens) {
  let current = 0;

  function walk() {
    if (current >= tokens.length) {
      return null;
    }
  
    let token = tokens[current];
    let node;
  
    if (token.type === TYPES.VARIABLE) {
      current++;
      return {
        type: 'SYMBOL',
        value: token.value,
      };
    }
  
    if (token.type === TYPES.NOT) {
      current++;
      return {
        type: TYPES.NOT,
        child: walk(),
      };
    }
  
    if (token.type === TYPES.OPEN_PARENTHESIS) {
      current++; 
      node = walk(); 
      token = tokens[current];
  
      while (token && (token.type === TYPES.AND || token.type === TYPES.OR)) {
        current++;
        node = {
          type: token.type,
          left: node,
          right: walk(),
        };
        if (current < tokens.length) {
          token = tokens[current];
        } else {
          token = null;
        }
      }
  
      if (!token || token.type !== TYPES.CLOSE_PARENTHESIS) {
        throw new Error('Expected a closing parenthesis');
      }
      current++; 
  
      return node;
    }

    if (token.type === TYPES.AND || token.type === TYPES.OR) {
      current++;
      node = {
        type: token.type,
        left: walk(),
        right: walk(),
      };
      return node;
    }
  
    throw new TypeError(`Unhandled token type: ${token.type}`);
  }
  

  const ast = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    let result = walk();
    if (result) {
      ast.body.push(result);
    }
  }

  return ast;
}


