import ssl
from http.server import HTTPServer, SimpleHTTPRequestHandler

httpd = HTTPServer(("localhost", 443), SimpleHTTPRequestHandler)
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(
    certfile="./muckrock.github.io.pem",
    keyfile="./muckrock.github.io-key.pem",
    )
httpd.socket = ssl_context.wrap_socket(
    httpd.socket,
    server_side=True,
)
httpd.serve_forever()
