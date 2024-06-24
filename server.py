import ssl
from flask import Flask, render_template,  request, jsonify
from http.server import HTTPServer, SimpleHTTPRequestHandler
from flask_cors import CORS



context = {  
    'url' : "https://api.www.documentcloud.org/api/users/me/",
    'projectsUrl' :"https://api.www.documentcloud.org/api/projects/218188",
    'projectDocsUrl' :"https://api.www.documentcloud.org/api/projects/218188/documents",
    'documentStub' : "https://api.www.documentcloud.org/api/documents/",
    'emptyProject' :"https://api.www.documentcloud.org/api/projects/218484/documents",
    'proxyUrl' :"http://127.0.0.1:5000/proxy/"
}

import requests

"""
httpd = HTTPServer(("localhost", 8080), SimpleHTTPRequestHandler)
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
httpd.socket = ssl_context.wrap_socket(
    httpd.socket,
    server_side=True,
)

ssl_context.load_cert_chain(
    certfile="./muckrock.github.io.pem",
    keyfile="./muckrock.github.io-key.pem",
    )

httpd.serve_forever()
"""
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})



@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/gen')
def gen():
    return render_template('./tagGen.html', **context)

@app.route('/create')
def create():
    return render_template('./createDocs.html',**context)


@app.route('/project')
def createProj():
    return render_template('./createProject.html', **context)


@app.route('/proxy/<path:path>', methods=['PUT','PATCH'])
def proxy_put(path):
    url = f"https://api.www.documentcloud.org/{path}"
    headers = {"Content-Type": "application/json"}
    data = {
    "id": 218484,
    "created_at": "2024-06-17T18:11:44.727458Z",
    "description": "Wow this changes the Description",
    "edit_access": true,
    "add_remove_access": true,
    "private": false,
    "slug": "empty-project",
    "title": "Empty Project 39",
    "updated_at": "2024-06-17T19:53:41.329536Z",
    "user": 121134,
    "pinned": true
}
    response = requests.put(url, json=data, headers=headers, cookies=request.cookies)
    return jsonify(response.json()), response.status_code



@app.route('/proxy/<path:path>', methods=['GET'])
def proxy_get(path):
    url = f"https://api.www.documentcloud.org/{path}"
    headers = {"Content-Type": "application/json"}
    data = request.json
    response = requests.put(url, json=data, headers=headers, cookies=request.cookies)
    return jsonify(response.json()), response.status_code





@app.route('/proxy/<path:path>',methods=['DELETE'])
def proxy_delete(path):
    print("Proxy Path used")
    url = f"{path}"
    print(url)
    
    headers = {"Content-Type": "application/json"}
    print("Got to here")
   
    
    
    response = requests.put(url,headers=headers, cookies=request.cookies)
    print(response)
    print("Response recieved")
    return jsonify(response.json()), response.status_code
