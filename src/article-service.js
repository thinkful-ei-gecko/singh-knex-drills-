/* eslint-disable indent */
/* eslint-disable strict */

//job of this method to access the database and retrieve some data
//want connection to db to be side-effect free
const ArticleService = {   
    getAllArticles(knex) {
        return knex.select('*').from('blogful_articles');
    },
    //still in an object but using ES6 syntax, will still need
    //commas if calling other methods
    insertArticle(knex, newArticle) {
        return knex
            .insert(newArticle)
            .into('blogful_articles')
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
    getById(knex, id) {
         return knex.select('*').from('blogful_articles').where('id', id).first();
    },
    deleteArticle(knex, id){
        return knex.select('*').from('blogful_articles').where({ id }).delete();
    },
    updateArticle(knex, id, newArticleFields) {
        return knex('blogful_articles')
            .where({ id })
            .update(newArticleFields);
    }

};

module.exports = ArticleService;