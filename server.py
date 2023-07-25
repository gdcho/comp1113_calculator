## server.py
from flask import Flask, request
from sympy import symbols, simplify, sympify, to_cnf
from sympy.abc import A, B, C
from sympy.core.sympify import SympifyError

from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def parse_expression(expression):
    try:
        return sympify(expression)
    except SympifyError:
        return None

@app.route('/simplify', methods=['POST', 'OPTIONS'])
def simplify_expression():
    if request.method == 'OPTIONS':
        return {}, 200

    expression = request.json.get('expression')
    sympy_expr = parse_expression(expression)

    if sympy_expr is None:
        return {'error': 'Invalid boolean expression'}, 400

    try:
        simplified_expr = simplify(to_cnf(sympy_expr))
    except Exception as e:
        return {'error': str(e)}, 500

    return {'result': str(simplified_expr)}, 200

