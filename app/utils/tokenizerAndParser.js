// utils/tokenizerAndParser.js

// Define the types of tokens.
export const TYPES = {
    VARIABLE: "VARIABLE",
    NOT: "NOT",
    AND: "AND",
    OR: "OR",
    OPEN_PARENTHESIS: "OPEN_PARENTHESIS",
    CLOSE_PARENTHESIS: "CLOSE_PARENTHESIS",
  };
  
  // The function that transforms a string into an array of tokens.
  export function tokenize(expression) {
    // Use regular expressions to identify tokens.
    const regex = /\s*(=>|.|[A-Za-z_]\w*|\d+|\S)\s*/g;
    let result;
  
    const tokens = [];
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
  
      tokens.push({ type, value: token });
    }
  
    return tokens;
  }
  
  // The function that transforms an array of tokens into an abstract syntax tree.
  export function parse(tokens) {
    let current = 0;
  
    function walk() {
      let token = tokens[current];
  
      if (token.type === TYPES.VARIABLE) {
        current++;
        return {
          type: 'Symbol',
          value: token.value,
        };
      }
  
      if (token.type === TYPES.NOT) {
        token = tokens[++current];
        current++;
        return {
          type: TYPES.NOT,
          child: walk(),
        };
      }
  
      if (token.type === TYPES.OPEN_PARENTHESIS) {
        token = tokens[++current];
  
        let node = {
          type: TYPES.AND,
          left: walk(),
          right: null,
        };
  
        token = tokens[current];
        if (token && token.type === TYPES.AND) {
          current++;
          node.right = walk();
        }
  
        token = tokens[current];
        if (token && token.type === TYPES.CLOSE_PARENTHESIS) {
          current++;
          return node;
        }
      }
  
      throw new TypeError(token.type);
    }
  
    const ast = {
      type: 'Program',
      body: [],
    };
  
    while (current < tokens.length) {
      ast.body.push(walk());
    }
  
    return ast;
  }
  
  