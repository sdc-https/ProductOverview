const { Client, Pool } = require('pg')
const client = new Client({
  //user: 'dbuser',
  host: 'localhost',
  database: 'overview_db',
  //password: 'password',
  port: 5432,
})

const pool = new Pool({
  //user: 'dbuser',
  host: 'localhost',
  database: 'overview_db',
  max: 25,
  //password: 'password',
  port: 5432,
})

pool.connect()

client.connect()


const getRecord = (product_id) => {
  return client.query(`select distinct o.product_id, o.package_name, o.product_name, p.list_price, p.price, i.in_stock, i.inventory, s.prime, s.sold_by, s.ships_from, f.price, f.form, sl.seller_id, sl.discs, sl.price, sl.newfrom, sl.usedfrom, sl.edition, sl.form, sl.release_date from overview o left outer join price p on o.product_id = p.product_id left outer join inventory i on p.product_id = i.product_id left outer join shipping s on i.product_id = s.product_id left outer join form f on s.product_id = f.product_id left outer join seller sl on f.product_id = sl.product_id where o.product_id = ${product_id};`)
};

const getOverview = (product_id) => {
  return client.query(`select product_id, package_name, product_name from overview where product_id = ${product_id};`)
};

const getPrice = (product_id) => {
  return client.query(`select list_price, price from price where product_id = ${product_id};`)
};

const getOtherSellers = (product_id) => {
  return client.query(`select seller_id, discs, price, newfrom, usedfrom, edition, form, release_date from seller where product_id = ${product_id};`)
};

const getInventory = (product_id) => {
  return client.query(`select in_stock, inventory from inventory where product_id = ${product_id};`)
};
const getShipping = (product_id) => {
  return client.query(`select prime, sold_by, ships_from from shipping where product_id = ${product_id};`)
};

const getForm = (product_id) => {
  return client.query(`select price, form from form where product_id = ${product_id};`)
};


module.exports.client = client;
module.exports.pool = pool;
module.exports.getRecord = getRecord;
module.exports.getOverview = getOverview;
module.exports.getOtherSellers = getOtherSellers;
module.exports.getPrice = getPrice;
module.exports.getInventory = getInventory;
module.exports.getShipping = getShipping;
module.exports.getForm = getForm;

