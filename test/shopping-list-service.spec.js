'use strict';

const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`Shopping list service object`, function(){
  let db;
  let testItems = [
    {
      id: 1,
      name:'Fish tricks', 
      price: 13.10, 
      category: 'Main',
      checked: false,  
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      name:'Not Dogs', 
      price: 4.99, 
      category: 'Snack',
      checked: true,  
      date_added: new Date('2100-05-22T16:28:32.615Z')
    },
    {
      id: 3,
      name:'Pepperphony', 
      price: 1.40, 
      category: 'Breakfast',
      checked: false,  
      date_added: new Date('2029-01-22T16:28:32.615Z')
    }
  ];  
  //add test data here:
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });
  //add mocha hooks here:
  before(() => db('shopping_list').truncate());
  afterEach(() => db('shopping_list').truncate());
  after(() => db.destroy());
  //organize tests (using context) here:
  context('Given shopping_list has data', () => {
    beforeEach(() => {
      return db 
        .into('shopping_list')
        .insert(testItems);
    });
    it('getAllItems() resolves all items from shopping_list table', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        });
    });
    it('getById() resolves an item by id from shopping_list table', () => {
      const thirdId = 3;
      const thirdTestItem = testItems[thirdId - 1];
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
            category: thirdTestItem.category,
            checked: thirdTestItem.checked,
            date_added: thirdTestItem.date_added,
          });
        });
    });
    it('deleteItem() removes an item by id from shopping_list table', () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          // copy the test items array without the "deleted" item
          const expected = testItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });
    it(`updateItem() updates an item from the shopping_list table`, () => {
        const idOfItemToUpdate = 3
        const newItemData = {
          name: 'updated item',
          price: '3.01',
          category: 'Main',
          checked: true,
          date_added: new Date()
        }
        return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
          .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
          .then(item => {
            expect(item).to.eql({
              id: idOfItemToUpdate,
              ...newItemData,
            })
          })
      })
  });

  context('Given shopping_list has no data', () => {
    it('getAllItems() resolves an empty array', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });
    it('insertItem() inserts a new item and resolves the new item with an id', () => {
      const newItem = {
        name: 'New item',
        price: '12.80',
        category: 'Main',
        checked: true,
        date_added: new Date()
      };
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            category: newItem.category,
            checked: newItem.checked,
            date_added: newItem.date_added,
          });
        });
    });
  });

});