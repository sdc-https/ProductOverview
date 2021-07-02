const axios = require('axios');
const config = require('../config.js');
const faker = require('faker');
const uuid = require('uuid');

const sellerGenerator = () => {
  const num = Math.floor(Math.random() * 1 + 2);
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
  const edition = ['Special Edition', "Collectors Edition", "Limited Collectors Edition", 'Special Extended Version', 'Limited Edition'];
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
  record['in_stock'] = status[Math.floor(Math.random() * 1)];
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

function dataGenerator() {
  let data = [];
    let record = {}
      record['package_name'] = faker.commerce.productMaterial();
      record['product_name'] = faker.commerce.productName();
      record['other_sellers'] = sellerGenerator();
      record['price'] = priceGenerator();
      record['shipping'] = shippingGenerator();
      record['inventory'] = inventoryGenerator();
      record['form'] = formGenerator();
      data.push(record);
  return data;
};


const sampleData = dataGenerator()

let url = `http://admin:${config.password}@localhost:5984/overviewdb/_bulk_docs`;

let seedingScript = (idx = 1) => {
  let counter = idx;
  let bulk = {
    docs: []
  };
  for (var i = 0; i < 10000; i++) {
    bulk.docs.push({product_id: (counter.toString()), sampleData: dataGenerator()});
    counter++;
  }

axios.post(url, bulk)
  .then((res) => {
    if (counter <= 10000000) {
      bulk.docs = [];
      seedingScript(counter);
    }
  })
  .catch((err) => {
    console.log('couchDB encountered ERROR:', err);
  });
};

seedingScript();





