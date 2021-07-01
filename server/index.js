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
      return readOverview(id);
    })
    .then(records => {
      console.log(records)
      res.json(records);
      //console.log(records);
    })
    .catch(error => {
      res.send('An error has occured');
    })
});

 async function readOverview(id) {
  let result = {};
    overview =  await db.getOverview(id);
    other_sellers =  await db.getOtherSellers(id);
    price = await db.getPrice(id);
    inventory =  await db.getInventory(id);
    shipping = await db.getShipping(id);
    form = await db.getForm(id);

    result = {
      price: price.rows[0],
      shipping: shipping.rows[0],
      inventory: inventory.rows[0],
      product_id: overview.rows[0].product_id,
      form: form.rows,
      other_sellers : other_sellers.rows,
      package_name: overview.rows[0].package_name,
      product_name : overview.rows[0].product_name,
    }

    return result;
  }

app.post('/overview/', (req, res) => {
  Promise.resolve(req.body)
    .then(overview => {
      return db.saveOverview(overview);
    })
    .then(result => {
      res.send('overview created');
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
    })
    .then(result => {
      res.send('record updated sucessfully');
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
      return getRecord(id);
    })
    .then(records => {
      res.send(records[0].other_sellers);
    })
    .catch(error => {
      res.send('An error has occurred');
    })
});

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