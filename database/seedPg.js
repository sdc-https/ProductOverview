// const faker = require('faker');
// const uuid = require('uuid');
// const postgresDb = require('./index.js');
// var fs = require('fs');
// var stringify = require('csv-stringify');

// const sellerGenerator = () => {
//   const num = Math.floor(Math.random() * 5);
//   const form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
//   const edition = ['Special Edition', "Collector's Edition", "Limited Collector's Edition", 'Special Extended Version', 'Limited Edition', null];
//   let sellers = [];
//   for (let i = 0; i < num; i++) {
//     let record = {};
//     record['seller_id'] = uuid.v1();
//     record['discs'] = Math.floor(Math.random() * 50);
//     record['price'] = Math.floor(Math.random() * 40) + 5;
//     record['newfrom'] = Math.floor(Math.random() * 35) + 5;
//     record['usedfrom'] = Math.floor(Math.random() * 30) + 3;
//     record['edition'] = edition[Math.floor(Math.random() * edition.length)];
//     record['form'] = form[Math.floor(Math.random() * form.length)];
//     record['release_date'] = faker.date.past();
//     sellers.push(record);
//   }
//   return sellers;
// };

// const priceGenerator = () => {
//   let record = {};
//   record['list_price'] = Math.floor(Math.random() * 40) + 7;
//   record['price'] = record['list_price'] - Math.floor(Math.random() * 10 + 2);
//   if (record['price'] <= 0) {
//     record['price'] = record['list_price'];
//   }
//   return record;
// };

// const shippingGenerator = () => {
//   const prime = [true, false];
//   let record = {};
//   const company = ['Amazon.com', faker.company.companyName()];
//   record['prime'] = prime[Math.floor(Math.random() * prime.length)];
//   record['sold_by'] = company[Math.floor(Math.random() * company.length)];
//   if (record['sold_by'] === 'Amazon.com') {
//     record['ships_from'] = 'Amazon.com';
//   } else {
//     record['ships_from'] = company[Math.floor(Math.random() * company.length)];
//   }
//   return record;
// }

// const inventoryGenerator = () => {
//   const status = [true, false];
//   let record = {};
//   record['in_stock'] = status[Math.floor(Math.random() * status.length)];
//   if (record['in_stock']) {
//     record['inventory'] = Math.floor(Math.random() * 10000 + 1234);
//   } else {
//     record['inventory'] = 0;
//   }
//   return record;
// }

// const formGenerator = () => {
//   const form = ['DVD', 'Blu-ray', '4K', 'Prime Video'];
//   let record = [];
//   for (let i = 0; i < form.length; i++) {
//     let obj = {};
//     obj.price = Math.floor(Math.random() * 40) + 5;;
//     obj.form = form[i];
//     record.push(obj);
//   }
//   return record;
// }

// function dataGenerator() {
//   let data = [];
//   for (let idx = 0; idx < 10000000; idx++) {
//     let query = []
//     let record = {}
//     record['product_id'] = (idx + 1).toString();
//     record['package_name'] = faker.commerce.productMaterial();
//     record['product_name'] = faker.commerce.productName();
//     record['other_sellers'] = sellerGenerator();
//     record['price'] = priceGenerator();
//     record['shipping'] = shippingGenerator();
//     record['inventory'] = inventoryGenerator();
//     record['form'] = formGenerator();
//     data.push(record);
//   }
//   return data;
// };

// const sampleData = dataGenerator()

// function formatDate(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12;
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//   var strTime = hours + ':' + minutes + ' ' + ampm;
//   return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
// }


// const save = (sampleData) => {
//   sampleData.forEach(record => {
//     let query =
//       "BEGIN; " +

//       `insert into overview (product_id, package_name, product_name) values (${record.product_id}, '${record.product_name}', '${record.package_name}')  ;` +

//       `insert into price (list_price, price, product_id) values (${record.price.list_price}, ${record.price.price}, ${record.product_id}); ` +

//       `insert into inventory (in_stock, inventory, product_id) values(${record.inventory.in_stock}, ${record.inventory.inventory}, ${record.product_id}) ;` +

//       `insert into shipping (prime, sold_by, ships_from, product_id) values (${record.shipping.prime}, '${record.shipping.ships_from}', '${record.shipping.sold_by}', ${record.product_id}) ; `;

//     record.form.forEach(form => {
//       query += `insert into form (price, form, product_id) values (${form.price}, '${form.form}', ${record.product_id}) ;`
//     })

//     record.other_sellers.forEach(seller => {
//       query += `insert into seller (seller_id, discs, price, newfrom, usedfrom, edition, form, release_date, product_id) values ('${seller.seller_id}', ${seller.discs}, ${seller.price}, ${seller.newfrom}, ${seller.usedfrom}, '${seller.edition}', '${seller.form}', '${formatDate(seller.release_date)}', ${record.product_id}) ; `
//     })

//     query += "COMMIT; ";

//     postgresDb.pool.query(query, (err, res) => {
//       console.log(err, res)
//       //postgresDb.pool.end()
//     })
//   })
// };

// save(sampleData);
// console.log('done!')


// COPY form(product_id,form,price)
// FROM '/Users/aschu/Documents/HackReactor/SDC/ProductOverview/forms2.csv'
// DELIMITER ','
// CSV HEADER;

const faker = require('faker');
const uuid = require('uuid');
// const db = require('./index.js');
const postgresDb = require('./indexsql.js');
var fs = require('fs');
var stringify = require('csv-stringify');


// const sampleData = require('./overviews.json');

const sellerGenerator = () => {
  const num = Math.floor(Math.random() * 1 + 2);
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
  const edition = ['Special Edition', "Collector's Edition", "Limited Collector's Edition", 'Special Extended Version', 'Limited Edition', null];
  let sellers = [];
  for (let i = 0; i < num; i++) {
    let record = {};
    record['seller_id'] = uuid.v1();
    record['discs'] = Math.floor(Math.random() * 50);
    record['price'] = Math.floor(Math.random() * 40) + 5;
    record['newfrom'] = Math.floor(Math.random() * 35) + 5;
    record['usedfrom'] = Math.floor(Math.random() * 30) + 3;
    record['edition'] = edition[Math.floor(Math.random() * edition.length)];
    record['form'] = form[Math.floor(Math.random() * form.length)];
    record['release_date'] = faker.date.past();
    sellers.push(record);
  }
  return sellers;
};

const priceGenerator = () => {
  let record = {};
  record['list_price'] = Math.floor(Math.random() * 40) + 7;
  record['price'] = record['list_price'] - Math.floor(Math.random() * 10 + 2);
  if (record['price'] <= 0) {
    record['price'] = record['list_price'];
  }
  return record;
};

const shippingGenerator = () => {
  const prime = [true, false];
  let record = {};
  const company = ['Amazon.com', faker.company.companyName()];
  record['prime'] = prime[Math.floor(Math.random() * prime.length)];
  record['sold_by'] = company[Math.floor(Math.random() * company.length)];
  if (record['sold_by'] === 'Amazon.com') {
    record['ships_from'] = 'Amazon.com';
  } else {
    record['ships_from'] = company[Math.floor(Math.random() * company.length)];
  }
  return record;
}

const inventoryGenerator = () => {
  const status = [true, false];
  let record = {};
  record['in_stock'] = status[Math.floor(Math.random() * status.length)];
  if (record['in_stock']) {
    record['inventory'] = Math.floor(Math.random() * 10000 + 1234);
  } else {
    record['inventory'] = 0;
  }
  return record;
}

const formGenerator = () => {
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video'];
  let record = [];
  for (let i = 0; i < form.length; i++) {
    let obj = {};
    obj.price = Math.floor(Math.random() * 40) + 5;;
    obj.form = form[i];
    record.push(obj);
  }
  return record;
}
// let record = {};
//let query = '';
// async function dataGenerator() {
function dataGenerator() {
  let data = [];
  // let overivews = [];
  let sellers = [];
  // let prices = [];
  // let shippings = [];
  // let inventories = [];
  // let forms = [];

  for (let idx = 0; idx < 2500000; idx++) {
    let query = []
    // console.log('processing: ', idx + 1);
    let record = {}
    //[...Array(10).keys()].forEach(idx => {
    record['product_id'] = (idx + 1).toString();
    // record['package_name'] = faker.commerce.productMaterial();
    // record['product_name'] = faker.commerce.productName();

    record['other_sellers'] = sellerGenerator();
    // record['price'] = priceGenerator();
    // record['shipping'] = shippingGenerator();
    // record['inventory'] = inventoryGenerator();
    // record['form'] = formGenerator();

    // let overview = {
    //   product_id: record.product_id,
    //   product_name: record.package_name,
    //   package_name: record.product_name
    // }
    // overivews.push(overview);

    // let price = {
    //     product_id: record.product_id,
    //     list_price: record.price.list_price,
    //     price: record.price.price
    //   }
    //   prices.push(price);

    // let inventory = {
    //   product_id: record.product_id,
    //   in_stock: record.inventory.in_stock,
    //   inventory: record.inventory.inventory
    // }
    // inventories.push(inventory);

    // let shipping = {
    //   product_id: record.product_id,
    //   prime: record.shipping.prime,
    //   sold_by: record.shipping.sold_by,
    //   ships_from: record.shipping.ships_from
    // }
    // shippings.push(shipping);

  //   record.form.forEach(form => {
  //   let f = {
  //     product_id: record.product_id,
  //     form: form.form,
  //     price: form.price
  //   }
  //   forms.push(f);
  // })

    record.other_sellers.forEach(seller => {
      let s = {
        product_id: record.product_id,
        seller_id: seller.seller_id,
        discs: seller.discs,
        price: seller.price,
        newfrom: seller.newfrom,
        usedfrom: seller.usedfrom,
        edition: seller.edition,
        form: seller.form,
        release_date: formatDate(seller.release_date)
      }
      sellers.push(s);
    })

    // data.push(record);
  }

  // stringify(forms, {
  //   header: true
  // }, function (err, output) {
  //   fs.writeFile('/Users/aschu/Documents/HackReactor/SDC/ProductOverview/forms2.csv',
  //   output,function(err, result) {
  //     if(err) console.log('error', err);
  //   });
  // })

  // stringify(shippings, {
  //   header: true
  // }, function (err, output) {
  //   fs.writeFile('/Users/aschu/Documents/HackReactor/SDC/ProductOverview/shippings.csv',
  //   output,function(err, result) {
  //     if(err) console.log('error', err);
  //   });
  // })
  // stringify(inventories, {
  //   header: true
  // }, function (err, output) {
  //   fs.writeFile('/Users/aschu/Documents/HackReactor/SDC/ProductOverview/inventories.csv',
  //   output,function(err, result) {
  //     if(err) console.log('error', err);
  //   });
  // })
  // stringify(prices, {
  //   header: true
  // }, function (err, output) {
  //   fs.writeFile('/Users/aschu/Documents/HackReactor/SDC/ProductOverview/prices.csv',
  //   output,function(err, result) {
  //     if(err) console.log('error', err);
  //   });
  // })

  // stringify(overivews, {
  //   header: true
  // }, function (err, output) {
  //   fs.writeFile('/Users/aschu/Documents/HackReactor/SDC/ProductOverview/overviews.csv',
  //   output,function(err, result) {
  //     if(err) console.log('error', err);
  //   });
  // })

  // stringify(overivews, {
  //   header: true
  // }, function (err, output) {
  //   fs.writeFile('/Users/aschu/Documents/HackReactor/SDC/ProductOverview/overviews.csv',
  //   output,function(err, result) {
  //     if(err) console.log('error', err);
  //   });
  // })

  stringify(sellers, {
    header: true
  }, function (err, output) {
    fs.writeFile('/Users/aschu/Documents/HackReactor/SDC/ProductOverview/sellersnew1.csv',
    output,function(err, result) {
      if(err) console.log('error', err);
    });
  })

  // return data;
};


const sampleData = dataGenerator()

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}


const save = (sampleData) => {
  sampleData.forEach(record => {
    let query =
      "BEGIN; " +

      `insert into overview (product_id, package_name, product_name) values (${record.product_id}, '${record.product_name}', '${record.package_name}')  ;` +

      `insert into price (list_price, price, product_id) values (${record.price.list_price}, ${record.price.price}, ${record.product_id}); ` +

      `insert into inventory (in_stock, inventory, product_id) values(${record.inventory.in_stock}, ${record.inventory.inventory}, ${record.product_id}) ;` +

      `insert into shipping (prime, sold_by, ships_from, product_id) values (${record.shipping.prime}, '${record.shipping.ships_from}', '${record.shipping.sold_by}', ${record.product_id}) ; `;

    record.form.forEach(form => {
      query += `insert into form (price, form, product_id) values (${form.price}, '${form.form}', ${record.product_id}) ;`
    })

    record.other_sellers.forEach(seller => {
      query += `insert into seller (seller_id, discs, price, newfrom, usedfrom, edition, form, release_date, product_id) values ('${seller.seller_id}', ${seller.discs}, ${seller.price}, ${seller.newfrom}, ${seller.usedfrom}, '${seller.edition}', '${seller.form}', '${formatDate(seller.release_date)}', ${record.product_id}) ; `
    })

    query += "COMMIT; ";

    postgresDb.pool.query(query, (err, res) => {
      console.log(err, res)
      //postgresDb.pool.end()
    })
  })
};
// postgresDb.pool.query(query){
// postgresDb.client.end();
// } catch (ex) {
// console.log(query.join(""))
//console.log(ex)
// }
// }
//return data;

//  }

// save(sampleData);

// dataGenerator();
//process.exit(1)
console.log('done!')