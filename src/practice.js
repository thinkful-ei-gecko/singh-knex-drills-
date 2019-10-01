/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable strict */
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
  //connection: 'postgresql://dunder_mifflin:password-here@localhost/knex-practice' - if password is set 
});

//building knex queries calling knexInstance

//////////////////////just checking if query works

// const query1 = knexInstance.from('amazong_products')
//   .select('*')
//   .toQuery();

// const query2 = knexInstance('amazong_products')
//   .select('*')
//   .toQuery();

// console.log('query1:', query1);
// console.log('query2:', query2);

/////////////////////knex practice

// const query = knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where({ name: 'Point of view gun'  })
//   .first()
//   .toQuery()
//   //.finally(() => knexInstance.destroy());
// //   .then(res => {
// //     console.log(res);
// //   })
// console.log(query);


/////////////////////knex drills
//1. searching products

// function wordSearchQuery(searchTerm){
//     knexInstance
//         .select('*')//* = all, could use .select('product_id', 'name', 'price', 'category')
//         .from('amazong_products')
//         .where('name', 'ILIKE', `%${searchTerm}%`)
//         .then(res => {
//             console.log(res)
//         })
//         .finally(() => {
//             knexInstance.destroy()
//         });
// }
// (wordSearchQuery('auto'));


//2. paginating products

// function paginateProducts(page){
//     knexInstance
//         .select('product_id', 'name', 'price', 'category')
//         .from('amazong_products')
//         .limit(`${page}`)
//         .offset(30)
//         .then(res => {
//             console.log(res)
//         })
//         .finally(() => {
//             knexInstance.destroy()
//         });
// }
// paginateProducts(10);

// //alt soln to q2
// function paginateProductsAlt(page) {
//     const productsPerPage = 10
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//       .select('product_id', 'name', 'price', 'category')
//       .from('amazong_products')
//       .limit(productsPerPage)
//       .offset(offset)
//       .then(result => {
//         console.log(result)
//       })
//   }
//   paginateProductsAlt(2);


  //3. Filter products that contain images
  
//   function filterProductsWithImg(){
//       knexInstance
//         .select('*')
//         .from('amazong_products')
//         .whereNotNull('image')
//         .then(res => {
//             console.log(res)
//         })
//         .finally(() => {
//             knexInstance.destroy()
//         });
//   }
//   filterProductsWithImg();



//4. find most popular videos

function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
      )
      .from('whopipe_video_views')
      .groupBy('video_name', 'region')
      .orderBy([
        { column: 'region', order: 'ASC' },
        { column: 'views', order: 'DESC' },
      ])
      .then(result => {
        console.log(result)
      })
      .finally(() => {
        knexInstance.destroy()
      });
  }
  mostPopularVideosForDays(30)