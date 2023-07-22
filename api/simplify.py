from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
from sympy import symbols, simplify, sympify, to_cnf
from sympy.core.sympify import SympifyError

def parse_expression(expression):
    try:
        return sympify(expression)
    except SympifyError:
        return None

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = parse_qs(post_data)

        expression = data.get('expression')

        if expression is None:
            self.send_response(400)
            self.end_headers()
            self.wfile.write('Invalid boolean expression')
            return

        sympy_expr = parse_expression(expression)
        if sympy_expr is None:
            self.send_response(400)
            self.end_headers()
            self.wfile.write('Invalid boolean expression')
            return

        try:
            simplified_expr = simplify(to_cnf(sympy_expr))
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e))
            return

        self.send_response(200)
        self.end_headers()
        self.wfile.write(str(simplified_expr))
        return
