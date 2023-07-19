from flask import Flask, request
from sympy import symbols, simplify_logic, sympify
from sympy.abc import A, B, C

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def parse_expression(expression):
    return sympify(expression)

@app.route('/simplify', methods=['POST'])
def simplify():
    expression = request.json.get('expression')
    sympy_expr = parse_expression(expression)
    simplified_expr = simplify_logic(sympy_expr, "dnf", force=True)

    return {'result': str(simplified_expr)}

if __name__ == "__main__":
    app.run(port=5000)
