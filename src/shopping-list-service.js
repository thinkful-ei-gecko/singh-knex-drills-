'use strict';

const ShoppingListService = {
  getAllItems(knex) {
    return knex 
      .select('*')
      .from('shopping_list');
  },
  insertItem(knex, newItem){
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getbyId(knex, list_id){
    return knex
      .select('*')
      .from('shopping_list')
      .where('list_id', list_id).first();
  },
  deleteItem(knex, list_id){
    return knex
      .select('*')
      .from('shopping_list')
      .where({ list_id }).delete();
  },
  updateItem(knex, list_id, newItemFields){
    return knex
      .where({ list_id })
      .update(newItemFields);
  }
};

module.exports = ShoppingListService;