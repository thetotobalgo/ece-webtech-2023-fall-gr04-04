const url = require('url')
const http = require('http')
const qs = require('querystring')
const express = require('express');
const app = express();

const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'       <a>Salut a tous c\'est l\'alien<a>' +
'    </body>' +
'</html>'

const serverHandle = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})


  res.write(content)

  res.end()
}

http
.createServer(serverHandle)
.listen(8080)