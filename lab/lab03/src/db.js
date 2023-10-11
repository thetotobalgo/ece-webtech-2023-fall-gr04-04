const db = {
  articles: [
    {
      id: '0000',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '1234',
      title: 'Car',
      content: 'Super fast red color car',
      date: '04/10/2022',
      author: 'Bakir'
    },
    // ...
  ],
  comments: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '0000',
      author: 'Bob McLaren'
    },

    
      {
        id: '3333',
        timestamp: 1664835049,
        content: 'Super fast red color car.',
        articleId: '1234',
        author: 'Mercedes'
      },
    // ...
  ]
}

module.exports = db
