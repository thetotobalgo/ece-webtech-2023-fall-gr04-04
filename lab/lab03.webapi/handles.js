const express = require('express');
const app = express();

const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
  res.status(200).send(`
    <p><a href="/hello?name=Saad">Saad</a> - Replies with "Saad!"</p>
    <p><a href="/hello?name=Tom">Tom</a> - Replies with "Tom!"</p>
    <p><a href="/test">test</a> - 404 message</p>
  `);
});

// Define a route for the /hello path
app.get('/hello', (req, res) => {
  const name = req.query.name;

  if (name === 'Saad') {
    res.status(200).send('Saad!');
  } else if (name === 'Tom') {
    res.status(200).send('Tom!');
  } else {
    res.status(200).send(`${name}!`);
  }
});

// Define a route for the /about path
app.get('/about', (req, res) => {
  // Construct the path to the about.json file
  const aboutPath = 'content/about.json';

  // Check if the about.json file exists
  fs.access(aboutPath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist
      res.status(404).send('Not Found');
    } else {
      // If the file exists, read and send its content as JSON
      fs.readFile(aboutPath, 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).json(JSON.parse(data));
        }
      });
    }
  });
});

// Handle all other routes with a 404 response
app.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = {
  serverHandle: app,
};