const { Client, Pool } = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'overview_db',
  port: 5432,
})

const pool = new Pool({
  host: 'localhost',
  database: 'overview_db',
  max: 25,
  port: 5432,
})

pool.connect()

client.connect()


const getOverview = (product_id) => {
  return client.query(`select product_id, package_name, product_name from overview where product_id = ${product_id};`)
};

const getPrice = (product_id) => {
  return client.query(`select list_price, price from overview where product_id = ${product_id};`)
};

const getOtherSellers = (product_id) => {
  return client.query(`select seller_id, discs, price, newfrom, usedfrom, edition, form, release_date from seller where product_id = ${product_id};`)
};

const getInventory = (product_id) => {
  return client.query(`select in_stock, inventory from overview where product_id = ${product_id};`)
};
const getShipping = (product_id) => {
  return client.query(`select prime, sold_by, ships_from from overview where product_id = ${product_id};`)
};

const getForm = (product_id) => {
  return client.query(`select price, form from form where product_id = ${product_id};`)
};

async function readOverview(id) {
  let result = {};
  overview = await getOverview(id);
  other_sellers = await getOtherSellers(id);
  price = await getPrice(id);
  inventory = await getInventory(id);
  shipping = await getShipping(id);
  form = await getForm(id);

  result = {
    price: price.rows[0],
    shipping: shipping.rows[0],
    inventory: inventory.rows[0],
    product_id: overview.rows[0].product_id,
    form: form.rows,
    other_sellers: other_sellers.rows,
    package_name: overview.rows[0].package_name,
    product_name: overview.rows[0].product_name,
  }

  return result;
}

const createOverview = (overviews) => {
  let query =
    "BEGIN; " +
    `insert into overview (product_id, package_name, product_name,list_price, price,in_stock,inventory,prime, sold_by, ships_from) values (${overviews.product_id}, '${overviews.package_name}', '${overviews.product_name}', ${overviews.price.list_price}, ${overviews.price.price}, '${overviews.inventory.in_stock}', ${overviews.inventory.inventory}, '${overviews.shipping.prime}', '${overviews.shipping.ships_from}', '${overviews.shipping.sold_by}');`;

  overviews.other_sellers.forEach(seller => {
    query += `insert into seller(product_id, seller_id, discs, price, newfrom, usedfrom, edition, form, release_date) values (${overviews.product_id}, '${seller.seller_id}', ${seller.discs}, ${seller.price}, ${seller.newfrom}, ${seller.usedfrom}, '${seller.edition}', '${seller.form}', '${seller.release_date}');`
  })

  overviews.form.forEach(form => {
    query += `insert into form(product_id, price, form) values (${overviews.product_id}, ${form.price}, '${form.form}');`
  })
  query += "COMMIT; ";

  pool.query(query, (err, res) => {
    console.log(err, res)
  })
};


const updateOverview = (overview) => {
  return pool.query(`UPDATE overview SET product_name = '${overview.product_name}', package_name = '${overview.package_name}', list_price = ${overview.list_price}, price = ${overview.price}, prime = ${overview.prime}, sold_by = '${overview.sold_by}', ships_from = '${overview.ships_from}', in_stock = '${overview.in_stock}', inventory = '${overview.inventory}' WHERE product_id = ${overview.product_id}`)

};

const deleteRecord = (id) => {
  return pool.query(`DELETE FROM overview WHERE product_id = ${id}`)
};


module.exports.client = client;
module.exports.pool = pool;
module.exports.readOverview = readOverview;
module.exports.createOverview = createOverview;
module.exports.updateOverview = updateOverview;
module.exports.deleteRecord = deleteRecord;


