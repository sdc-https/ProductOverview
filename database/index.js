const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/overview_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const db = mongoose.connection;

db.on('error', () => {
  console.log('An error has occured in connecting with MongoDB.');
});

db.once('open', () => {
  console.log('Connected with MongoDB successfully.');
});

const sellerSchema = {
  product_id: String,
  seller_id: {
    type: String,
    default: uuid.v1
  },
  discs: Number,
  status: String,
  price: Number,
  edition: String,
  form: String,
  release_date: Date
};

const priceSchema = {
  list_price: Number,
  price: Number
};

const inventorySchema = {
  in_stock: Boolean,
  inventory: Number
};

const productSchema = {
  product_id: {
    type: String,
    unique: true
  },
  product_name: String,
  package_name: String
}

const shippingSchema = {
  prime: Boolean,
  ships_from: String,
  sold_by: String
}

const OverviewSchema = {
  product: productSchema,
  price: priceSchema,
  other_sellers: [sellerSchema],
  shipping: shippingSchema,
  inventory: inventorySchema
}

const Overview = mongoose.model('Overview', OverviewSchema);

// Overview.create({
//   product_id: '1',
//   product_name: 'The Lord of the Rings Collection (Theatrical Version)',
//   package_name: 'Triple Feature Box Set',
//   other_sellers: [{
//     product_id: '1',
//     discs: 30, status: 'Used',
//     price: 29.99,
//     form: 'DVD',
//     release_date: '2019-03-12'
//   }],
//   price: {
//     list_price: 14.97,
//     price: 8.99
//   },
//   shipping: {
//     prime: true,
//     ships_from: 'Amazon.com',
//     sold_by: 'Amazon.com'
//   },
//   inventory: {
//     in_stock: true,
//     inventory: 25
//   }
// });