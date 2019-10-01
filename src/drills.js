/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable strict */

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

//DRILL 1
function getAllTextItems(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%` )
        .then(res => {
            console.log(res)
        })
        .finally(() => {
            knexInstance.destroy()
        });
}
//getAllTextItems('tofu');

//DRILL 2
function paginateItems(pageNumber){
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(`${pageNumber}`)
        .offset(0)
        .then(res => {
            console.log(res)
        })
        .finally(() => {
            knexInstance.destroy()
        });
}
//paginateItems(6);

//DRILL 3
function getItemsAfterDate(daysAgo){
    knexInstance
        .select('list_id','name')
        .where(
            'date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo) 
        )
        .from('shopping_list')
        .then(res => {
            console.log(res)
        })
        .finally(() => {
            knexInstance.destroy()
        });
}
//getItemsAfterDate(5);

//DRILL 4
function totalCostofItems(){
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(res => {
            console.log(res)
        })
        .finally(() => {
            knexInstance.destroy()
        });
}
totalCostofItems();

//everything working