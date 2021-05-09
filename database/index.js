const seed = require('./seed.js');
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
  seller_id: {
    type: String,
    unique: true
  },
  discs: Number,
  price: Number,
  newfrom: Number,
  usedfrom: Number,
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

const shippingSchema = {
  prime: Boolean,
  ships_from: String,
  sold_by: String
}

const formSchema = {
  form: String,
  price: Number
}

const OverviewSchema = {
  product_id: {
    type: String,
    unique: true
  },
  product_name: String,
  package_name: String,
  price: priceSchema,
  other_sellers: [sellerSchema],
  shipping: shippingSchema,
  inventory: inventorySchema,
  form: [formSchema]
}

const Overview = mongoose.model('Overview', OverviewSchema);

const save = (sampleData) => {
  let recordInsert = sampleData.map(record => ({
    updateOne: {
      filter: {product_id: record.product_id},
      update: {$set: record},
      upsert: true
    }
  }));
  Overview.bulkWrite(recordInsert)
    .then(() => {
      console.log('Data has been successfully saved into MongoDB');
    })
    .catch((error) => {
      console.log(error);
    })
}

// save(seed.sampleData);

const getRecord = (id) => {
  return Overview.find({product_id: id});
};

module.exports.getRecord = getRecord;