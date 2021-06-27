const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// mongoose.connect('mongodb://db:27017/overview_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

mongoose.connect('mongodb://localhost:27017/overview_db', {
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

const getRecord = (id) => {
  return Overview.find({ product_id: id });
};

const saveOverview = (overview) => {
  return Overview.create(overview, function (error, docs) {
    if(error) {
      console.log(error)
      return error;
    }
  });
}

const updateOverview = (overview) => {
  return Overview.updateOne(
    {
      product_id: overview.product_id
    },
    {
      product_name: overview.product_name,
      package_name: overview.package_name,
      price: overview.price,
      shipping: overview.shipping,
      inventory: overview.inventory
    },
    {
      upsert: true
    }
  ,(err, result) => {
    if(err) {
      return err;
    }
  });
};

const deleteRecord = (id) => {
  return Overview.deleteOne({ product_id: id });
};

module.exports.getRecord = getRecord;
module.exports.saveOverview = saveOverview;
module.exports.updateOverview = updateOverview;
module.exports.deleteRecord = deleteRecord;
exports.Overview = Overview;