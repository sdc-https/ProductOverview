//GET
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 1,
      timeUnit: "1s",
      duration: "120s",
      preAllocatedVUs: 200,
      maxVUs: 500,
    },
  },
};

export default function () {
  let id = Math.floor(Math.random() * (10000000 - 9000000 + 1) + 9000000)
  http.get(`http://localhost:3002/overview/${id}`);
console.log(res.body);

  sleep(1);
}

//POST
import http from 'k6/http';
import { check} from 'k6';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 1000,
      timeUnit: "1s",
      duration: "120s",
      preAllocatedVUs: 200,
      maxVUs: 2000,
    },
  },
};

export default function () {
  const url = 'http://localhost:3002/overview';
  let product_id = Math.floor(Math.random() * (11000000 - 10000000 + 1) + 10000000);
  let data = `{"list_price": 23,"price": 21,"prime": true,"sold_by": "Schmitt, Schowalter and Bahringer",
  "ships_from": "Schmitt, Schowalter and Bahringer","in_stock": true,"inventory": 8413,
  "product_id": ${product_id},
  "form": [{"price": 14, "form": "DVD"}, {"price": 31, "form": "Blu-ray"},
          {"price": 18, "form": "4K"}, {"price": 39, "form": "Prime Video"}],
  "other_sellers": [{"seller_id": "e2633302-db50-11eb-aa9c-4de1348f9469","discs": 21, "price": 22,"newfrom": 25,
       "usedfrom": 12,"edition": "Special Extended Version","form": "Blu-ray", "release_date": "2021-01-03T01:17:00.000Z"},
      {"seller_id": "e2633303-db50-11eb-aa9c-4de1348f9469", "discs": 18, "price": 18, "newfrom": 34,
              "usedfrom": 8, "edition": "Limited Edition","form": "Blu-ray", "release_date": "2021-03-09T13:10:00.000Z" } ],
  "package_name": "Plastic",
  "product_name": "Ergonomic Concrete New"}`;
  let res = http.post(url, data, { headers: { 'Content-Type': 'application/json' } });
  //console.log(JSON.stringify(res));

  sleep(1);
}



