/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable strict */

require('dotenv').config()
const knex = require('knex')
const ArticleService = require('./article-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

// ArticleService.getAllArticles(knexInstance)
//   .then(articles => console.log(articles))
//   .then(() =>
//       ArticleService.insertArticle(knexInstance, {
//         title: 'New title',
//         content: 'New content',
//         date_published: new Date(),
//       })
//   )
//   .then(newArticle => {
//     console.log(newArticle)
//     return ArticleService.updateArticle(
//       knexInstance,
//       newArticle.id,
//       { title: 'Updated title' }
//   )
//   .then(() => ArticleService.getById(knexInstance, newArticle.id))
//   })
//   .then(article => {
//     console.log(article)
//     return ArticleService.deleteArticle(knexInstance, article.id)
//   })

console.log(ArticleService.getAllArticles())