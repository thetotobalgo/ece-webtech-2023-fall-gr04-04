const url = require('url')
const http = require('http')
const qs = require('querystring')

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

  // Retrieve and print the current path
  const path = url.parse(req.url).pathname

  // Retrieve and print query parameters
  const queryParams = qs.parse(url.parse(req.url).query)

  res.writeHead(200, {'Content-Type': 'text/html'})

  // Display the content
  res.write(content)

  // Display the Path
  console.log(path)



  res.end()
}

http
.createServer(serverHandle)
.listen(8080)