const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');

const serverHandle = function (req, res) {
  const route = url.parse(req.url);
  const path = route.pathname;
  const params = qs.parse(route.query);

  if (path === '/') {
    // Route to explain how /hello works
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const explanation = `
      <h1>Welcome to the Hello App</h1>
      <p>To use this app, visit the <a href="/hello?name=yourname">/hello</a> route with a "name" query parameter.</p>
      <p>For the about page, go to <a href="/about">/about</a>.</p>
    `;
    res.end(explanation);
  } else if (path === '/hello' && 'name' in params) {
    // Route to handle /hello with a name query parameter
    const name = params['name'];
    if (name.toLowerCase() === 'thayri') {
      const intro = 'Hello, I am [thayri]. I am the creator of this app.';
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(intro);
    } else {
      const randomGreeting = 'Hello ' + name;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(randomGreeting);
    }
  } else if (path === '/about') {
    // Route to handle /about and serve the content of about.json
    const aboutFilePath = './content/about.json';
    fs.readFile(aboutFilePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('ERROR 404 Not Found');
      } else {
        const aboutData = JSON.parse(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(aboutData, null, 2));
      }
    });
  } else {
    // Any other path replies a 404 code with a not found message
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('ERROR 404 Not Found');
  }

  console.log('Request for:', path); // Log the path
};

const server = http.createServer(serverHandle);

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
