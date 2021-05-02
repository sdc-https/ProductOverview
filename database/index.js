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