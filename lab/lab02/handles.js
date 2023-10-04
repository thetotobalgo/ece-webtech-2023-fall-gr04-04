
module.exports = {
    serverHandle: function (req, res) {
    const http = require('http');
    const url = require('url');
    const qs = require('querystring');
    
    const serverHandle = function (req, res) {
      const route = url.parse(req.url);
      const path = route.pathname;
      const params = qs.parse(route.query);
    
      res.writeHead(200, { 'Content-Type': 'text/plain' });
    
      if (path === '/hello' && 'name' in params) {
        res.write('Hello ' + params['name']);
      } else {
        res.write('Hello anonymous');
      }
    
      console.log('Request for:', path); // Log the path
    
      res.end();
    };}}
