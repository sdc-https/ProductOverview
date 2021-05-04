const faker = require('faker');
const uuid = require('uuid');

const sellerGenerator = () => {
  const num = Math.floor(Math.random() * 20);
  const status = ['Used', 'New'];
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
  let sellers = [];
  for (let i = 0; i < num; i++) {
    let record = {};
    record['seller_id'] = uuid.v1();
    record['discs'] = Math.floor(Math.random() * 50);
    record['status'] = status[Math.floor(Math.random() * status.length)];
    record['price']= faker.commerce.price();
    record['form'] = form[Math.floor(Math.random() * form.length)];
    record['edition'] = faker.commerce.productDescription().slice(0, 7);
    record['release_date'] = faker.date.past();
    sellers.push(record);
  }
  return sellers;
};


const priceGenerator = () => {
  let record = {};
  record['list_price'] = Math.round(faker.commerce.price()  + 10, 2);
  record['price'] = Math.round(record['list_price'] - 10 * Math.random(), 2);
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

const dataGenerator = () => {
  let data = [];
  [...Array(100).keys()].forEach(idx => {
    let record = {};
    record['product_id'] = idx.toString();
    record['product_name'] = faker.commerce.productName();
    record['package_name'] = faker.commerce.productDescription().slice(0, 15);
    record['other_sellers'] = sellerGenerator();
    record['price'] = priceGenerator();
    record['shipping'] = shippingGenerator();
    record['inventory'] = inventoryGenerator();
    data.push(record);
  })
  return data;
}

const sampleData = dataGenerator();

module.exports.sampleData = sampleData;

