const express = require('express');
const app = express();
const db = require('../database/index.js');
const Promise = require('bluebird');

const port = 3000;
app.listen(() => {
  console.log(`Listening to port ${port}`);
})

app.get('/', (req, res) => {
  res.send('hello');
})

app.get('/overview-api/otherseller/:productid', (req, res) => {
  Promise.resolve(req.params.product_id)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      if (!records) {
        throw records;
      }
      res.send(records[0].other_sellers);
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

app.get('/overview-api/price/:productid', (req, res) => {
  Promise.resolve(req.params.product_id)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      if (!records) {
        throw records;
      }
      res.send(records[0].price);
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

app.get('/overview-api/inventory/:productid', (req, res) => {
  Promise.resolve(req.params.product_id)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      if (!records) {
        throw records;
      }
      res.send(records[0].inventory);
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})