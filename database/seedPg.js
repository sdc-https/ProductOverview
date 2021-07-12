const faker = require('faker');
const uuid = require('uuid');
const db = require('./index.js');

const sellerGenerator = () => {
  const num = Math.floor(Math.random() * 3 + 1);
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


let seedOverview= async () => {

  for (let i = 0; i < 10000000; i++) {
    let product_id = (i + 1).toString();
    let package_name = faker.commerce.productMaterial();
    let product_name = faker.commerce.productName();
    let price = priceGenerator();
    let shipping = shippingGenerator();
    let inventory = inventoryGenerator();

      await db.client.query(
      `insert into overview (product_id, package_name, product_name,list_price, price,in_stock,inventory,prime, sold_by, ships_from) values ('${product_id}', '${package_name}', '${product_name}', ${price.list_price}, ${price.price}, '${inventory.in_stock}', ${inventory.inventory}, '${shipping.prime}', '${shipping.ships_from}', '${shipping.sold_by}');`)

      .catch((error) => {
        console.log('Error adding records to the database', error)
      })
    }
    console.log('sucessfully addedd overview records to Overview database');
}
seedOverview();




let seedForm = async () => {
  let form = formGenerator();
  form.forEach(async form => {
    for (let i = 0; i < 10000000; i++) {
      let product_id = (i + 1).toString();
      await db.client.query(
        `insert into form (product_id, price, form) values (${product_id}, ${form.price}, '${form.form}') ;`)
        .catch((error) => {
          console.log('Error adding records to the database', error)
        })
    }
  })
  console.log('sucessfully addedd form records to Overview database');
}
seedForm();


function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

let seedSeller = async () => {
let other_sellers = sellerGenerator();
  other_sellers.forEach(async seller => {
    for (let i = 0; i < 10000000; i++) {
      let product_id = (i + 1).toString();
      await db.client.query(
        `insert into seller (product_id, seller_id, discs, price, newfrom, usedfrom, edition, form, release_date) values (${product_id}, '${seller.seller_id}', ${seller.discs}, ${seller.price}, ${seller.newfrom}, ${seller.usedfrom}, '${seller.edition}', '${seller.form}', '${formatDate(seller.release_date)}'); `)
        .catch((error) => {
          console.log('Error adding records to the database', error)
        })
    }
})
console.log('sucessfully addedd form records to Overview database');
}
seedSeller();


// module.exports.dataGenerator = dataGenerator;
module.exports.sellerGenerator = sellerGenerator;
module.exports.priceGenerator = priceGenerator;
module.exports.shippingGenerator = shippingGenerator;
module.exports.inventoryGenerator = inventoryGenerator;
module.exports.formGenerator = formGenerator;
