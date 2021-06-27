const express = require('express');
const app = express();
const shrinkRay = require('shrink-ray-current');
const db = require('../database/index.js');
const path = require('path');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();



app.use(shrinkRay());
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/../client/dist'), { maxAge: '30d' }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  next();
});

app.get('*/dp/:productid', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.get('/overview/:productid', (req, res) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      res.json(records[0]);
      // console.log(records);
    })
    .catch(error => {
      res.send('An error has occured');
    })
});

app.post('/overview/', (req, res) => {
  Promise.resolve(req.body)
    .then(overview => {
      return db.saveOverview(overview);
    })
    .then(result => {
      res.send('overview created');
      return;
    })
    .catch(error => {
      console.log(error)
      res.send('An error has occured');
    })
});

app.put('/overview/:productid', (req, res, next) => {
  Promise.resolve(req.body)
    .then(overview => {
      return db.updateOverview(overview);
      return;
    })
    .then(result => {
      res.send('record updated sucessfully');
      return
    })
    .catch(error => {
      console.log(error)
      res.send('An error has occured');
    })
});

app.delete('/overview/:productid', (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      return db.deleteRecord(id);
    })
    .then(result => {
      res.send('record deleted');
      return
    })
    .catch(error => {
      res.send('An error has occured');
    })
});



const urlAPISeller = '/overview-api/otherseller/:productid';
const urlAPIPrice = '/overview-api/price/:productid';
const urlAPIInventory = '/overview-api/inventory/:productid';

app.get(urlAPISeller, (req, res, next) => {
  Promise.resolve(req.params.productid)
    .then(id => {
      if (!id) {
        throw id;
      }
      return db.getRecord(id);
    })
    .then(records => {
      res.send(records[0].other_sellers);
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
      return db.getRecord(id);
    })
    .then(records => {
      res.send(records[0].price);
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
      return db.getRecord(id);
    })
    .then(records => {
      res.send(records[0].inventory);
      next();
    })
    .catch(error => {
      res.send('An error has occurred');
    })
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})