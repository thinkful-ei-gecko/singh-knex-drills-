/* eslint-disable semi */
/* eslint-disable strict */
const ArticleService = require('../src/article-service');
const knex = require('knex');

describe(`Articles service object`, function() {
  let db;
  let testArticles = [
    {
      id: 1,
      title: 'First test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      date_published: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      title: 'Second test post!',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
      date_published: new Date('2100-05-22T16:28:32.615Z')
    },
    {
      id: 3,
      title: 'Third test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.',
      date_published: new Date('2029-01-22T16:28:32.615Z')
    },
  ];
    //need to connect to the test db to run the tests
    //before is a mocha hook
    //each of these lifecycle methods takes a callback function - like REACT lifecycle funcs

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });
    
  before(() => db('blogful_articles').truncate());
  
  //clear the db each time a test is run
  afterEach(() => db('blogful_articles').truncate())

  //terminate the connection for the tests - using after hook
  after(() => db.destroy());
    

  //context is just a way of organizing tests
  context(`Given 'blogful_articles' has data`, () => {
    beforeEach(() => {
      return db 
        .into('blogful_articles')
        .insert(testArticles);
    });
    
    it(`getAllArticles() resolves all articles from 'blogful_articles' table`, () => {
    // test that ArticlesService.getAllArticles gets data from table
      return ArticleService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql(testArticles);
        });
    });

    it(`getById() returns an article by id from 'blogful_articles'`, () => {
      const thirdId = 3;
      const thirdTestArticle = testArticles[thirdId - 1];
      return ArticleService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            title: thirdTestArticle.title,
            content: thirdTestArticle.content,
            date_published: thirdTestArticle.date_published
          })
        })
    });

    it(`deleteArticle() deletes an article  by id from 'blogful_articles' table`, () => {
      const articleId = 3;
      return ArticleService.deleteArticle(db, articleId)
        .then(() => {
          ArticleService.getAllArticles(db)
        })
        .then(allArticles => {
          const expected = testArticles.filter(article => article.id !== articleId)
          expect(allArticles).to.eql(expected)
        })
    })

    it(`updateArticle() updates an article from the 'blogful_articles' table`, () => {
        const idOfArticleToUpdate = 3
        const newArticleData = {
            title: 'updated title',
            content: 'updated content',
            date_published: new Date(),
        }
        return ArticleService.updateArticle(db, idOfArticleToUpdate, newArticleData)
            .then(() => ArticleService.getById(db, idOfArticleToUpdate))
            .then(article => {
                expect(article).to.eql({
                id: idOfArticleToUpdate,
                ...newArticleData,
            })
        })
    })
  });

  context(`Given 'blogful_articles' has no data`, () => {
    it(`getAllArticles() resolves an empty array`, () => {
      return ArticleService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });

    it(`insertArticle() inserts a new article and resolves the new article with an 'id'`, () => {
      const newArticle = {
        title: 'Test new tile for article',
        content: 'Test content for new article',
        date_published: new Date('2020-01-01T00:00:00.000Z')
      };
      return ArticleService.insertArticle(db, newArticle)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            title: newArticle.title,
            content: newArticle.content,
            date_published: newArticle.date_published
          })
        })
    });
  });
});



