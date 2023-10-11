const router = require('express').Router()
const articles = require('./articles')

router.use('/articles', articles)

router.get('/', (req, res) => {
  const content = '<!DOCTYPE html>' +
  '<html>' +
  '    <head>' +
  '        <meta charset="utf-8" />' +
  '        <title>Web Technologies project</title>' +
  '    </head>' + 
  '    <body>' +
  '       <h1>Web Technologies project</h1>' +
  '       <h2>Usage instructions</h2>' +
  '       <ul>' +
  '           <li>Go to the <a href="/hello">"Hello page"</a> to greet anonymous person.</li>' +
  '           <li>Use the "<code>name</code>" query parameter to personalize the hello message. For example, <a href="/hello?name=Steve">greet Steve</a>.</li>' +
  '           <li>Use "<code>?name=Peter</code>" to show an info about Mohamed. Go to the <a href="/hello?name=Mohamed">Mohamed\'s page</a>.</li>' +
  '           <li>Content pages: <a href="/about">About</a>, <a href="/contacts">Contacts</a></li>' +
  '           <li>Articles page: <a href="/Articles">Articles</a>, ' +
  '           <li>Specific article: <a href="/Articles/1234">Article 1234</a>, ' +
  '           <li>Specific article comment: <a href="/Articles/1234/comments">Article 1234</a>, ' +



  '           <li>Other pages will respond with 404 error. For example, go to <a href="/random-page">this random page</a>.</li>' +
  '       </ul>' +
  '    </body>' +
  '</html>'
  res.send(content)
})

router.get('/hello', (req, res) => {
  if ('name' in req.query) {
    if (req.query['name'].toLowerCase() === 'thayri') {
      res.send('Hello! I am thayri, I am a Web developer.')
    } else {
      res.send(`Hello ${req.query['name']}!`)
    }
  } else {
    res.send('Hello anonymous!')
  }
})

router.get('*', (req, res) => {
  try {
    // Note, require() is not a correct way of reading content from filesystem.
    // It is used here for simplicity.
    // Learn fsPromises.readFile() to do read from a file correctly -
    // https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
    const data = require(`../../content/${req.url}.json`);
		res.json(data);
  } catch (err) {
    // If no file present, return 404 error
    res.status(404).send("Error 404! The page doesn't exist.")
  }
})

module.exports = router
