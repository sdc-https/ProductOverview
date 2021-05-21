const faker = require('faker');
const uuid = require('uuid');

const sellerGenerator = () => {
  const num = Math.floor(Math.random() * 20);
  const form = ['DVD', 'Blu-ray', '4K', 'Prime Video']
  const edition = ['Special Edition', "Collector's Edition", "Limited Collector's Edition", 'Special Extended Version', 'Limited Edition', null];
  let sellers = [];
  for (let i = 0; i < num; i++) {
    let record = {};
    record['seller_id'] = uuid.v1();
    record['discs'] = Math.floor(Math.random() * 50);
    record['price']= faker.commerce.price();
    record['newfrom'] = faker.commerce.price();
    record['usedfrom'] = faker.commerce.price();
    record['edition'] = edition[Math.floor(Math.random() * edition.length)];
    record['form'] = form[Math.floor(Math.random() * form.length)];
    record['release_date'] = faker.date.past();
    sellers.push(record);
  }
  return sellers;
};


const priceGenerator = () => {
  let record = {};
  record['list_price'] = Math.round(faker.commerce.price(), 2);
  record['price'] = Math.round(record['list_price'] - (record['list_price'] % 10) * Math.random(), 2);
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
  let result = [];
  for (let i = 0; i < form.length; i++) {
    let obj = {};
    obj.price = faker.commerce.price();
    obj.form = form[i];
    result.push(obj);
  }
  return result;
}

const dataGenerator = () => {
  let data = [];
  [...Array(100).keys()].forEach(idx => {
    let record = {};
    record['product_id'] = (idx + 1).toString();
    record['product_name'] = faker.commerce.productName();
    record['package_name'] = faker.commerce.productMaterial();
    record['other_sellers'] = sellerGenerator();
    record['price'] = priceGenerator();
    record['shipping'] = shippingGenerator();
    record['inventory'] = inventoryGenerator();
    record['form'] = formGenerator();
    data.push(record);
  })
  return data;
}

const sampleData = dataGenerator();

module.exports.sampleData = sampleData;

