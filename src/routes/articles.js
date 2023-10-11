const articles = require('express').Router()
const db = require('../db')

articles.route('/')
  .get((req, res) => {
    const articleList = db.articles.map(article => {
      return `${article.title}: ${article.content}\n`; 
    });

  
    const responseText = articleList.join('\n');

    res.setHeader('Content-Type', 'text/plain');
    res.send(responseText);
  })
  .post((req, res) => {
  	db.articles.push(req.body)
  	res.send(req.body)
  })

articles.route('/:articleId')
  .get((req, res) => {
  	const article = db.articles.find( article => article.id == req.params.articleId)
  	if (article) res.send(article)
  	else res.sendStatus(404)
  })

  articles.route('/:articleId/comments')
  .get((req, res) => {
    const articleId = req.params.articleId;
    const article = db.articles.find((article) => article.id == articleId);
    if (!article) {
      return res.sendStatus(404);
    }

    const comments = db.comments.filter((comment) => comment.articleId == articleId);
    res.send(comments);
  })
  .post((req, res) => {
    const articleId = req.params.articleId;
    const article = db.articles.find((article) => article.id == articleId);
    if (!article) {
      return res.sendStatus(404);
    }


    const comment = req.body;

    comment.id = Date.now();

    comment.articleId = articleId;

    db.comments.push(comment);

    res.send(comment);
  });

articles.route('/:articleId/comments/:commentId')
  .get((req, res) => {
    const articleId = req.params.articleId;
    const commentId = req.params.commentId;

    const comment = db.comments.find((c) => c.articleId == articleId && c.id == commentId);

    if (!comment) {
      return res.sendStatus(404);
    }

    res.send(comment);
  });


module.exports = articles;
