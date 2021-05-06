const express = require('express');
const app = express();
const db = require('../database/index.js');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.send('hello');
});

let urlAPISeller = '/overview-api/otherseller/:productid';
let urlAPIPrice = '/overview-api/price/:productid';
let urlAPIInventory = '/overview-api/inventory/:productid';

app.get(urlAPISeller, (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      let target = id.slice(1, id.length - 1)
      return db.getRecord(target);
    })
    .then(records => {
      res.send(records[0].other_sellers);
      next();
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

app.get(urlAPIPrice, (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      let target = id.slice(1, id.length - 1)
      return db.getRecord(target);
    })
    .then(records => {
      res.send(records[0].price);
      next();
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

app.get(urlAPIInventory, (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      let target = id.slice(1, id.length - 1)
      return db.getRecord(target);
    })
    .then(records => {
      res.send(records[0].inventory);
      next();
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})