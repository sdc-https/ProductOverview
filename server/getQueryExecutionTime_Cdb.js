// const axios = require('axios');
// const { performance } = require('perf_hooks');
// const db = require('../database/index.js');

// let time = performance.now();


// // query excution time for Couch DB get request in milliseconds
// function getDataCouch(id) {
//   const url = `http://admin:Addis2010@127.0.0.1:5984/overview_db/${id}`;
//   axios.get(url)
//     .then((result) => (result))
//     .then(data => {
//       console.log(data.data)
//       console.log("get query time: ", `${(performance.now() - time)} milliseconds`);
//     })
//     .catch((err) => console.log(err));
// };

// getDataCouch();



// //query excution time for Couch DB post request in milliseconds
// function postDataCouch() {
//   axios.post('http://admin:Addis2010@127.0.0.1:5984/overview_db', {
//     "_id": "10000002",
//     "product_id": "10000002",
//         "package_name": "Test",
//         "product_name": "This is Test Product",
//         "other_sellers": [{ "seller_id": "Other Seller Id", "discs": 10, "price": 41, "newfrom": 28, "usedfrom": 32, "edition": "Special Extended Version", "form": "4K", "release_date": "2021-01-27T01:56:30.465Z" }],
//         "price": { "list_price": 16, "price": 5 },
//         "shipping": { "prime": true, "sold_by": "Amazon.com", "ships_from": "Amazon.com" },
//         "inventory": { "in_stock": true, "inventory": 4024 },
//         "form": [{ "price": 28, "form": "DVD" }, { "price": 14, "form": "Blu-ray" }, { "price": 22, "form": "4K" },
//         { "price": 5, "form": "Prime Video" }]
//   })
//     .then(response => {
//       console.log(response.data)
//       console.log("post query time: ",`${(performance.now() - time)} milliseconds`);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
// postDataCouch();

// // //query excution time for Couch DB put request in milliseconds
// function updateDataCouch(id) {
//   axios.put(`http://admin:Addis2010@127.0.0.1:5984/overview_db/${id}`, {
//     "_id": "10000002",
//     "_rev": "6-8fd085af3c084c8dc3b75d54e2e19576",
//     "product_id": "10000002",
//         "package_name": "Soft updates",
//         "product_name": "Unbranded Concrete Fish updated product",
//         "other_sellers": [{
//           "seller_id": "45af7f7c-de63-11eb-a521-471830465c18", "discs": 23, "price": 41,
//           "newfrom": 9, "usedfrom": 13, "edition": "Special Edition", "form": "Blu-ray", "release_date": "2021-03-14T18:19:55.087Z"
//         }],
//         "price": { "list_price": 38, "price": 29 },
//         "shipping": { "prime": false, "sold_by": "Koepp and Sons", "ships_from": "Koepp and Sons" },
//         "inventory": { "in_stock": true, "inventory": 1718 },
//         "form": [{ "price": 8, "form": "DVD" }, { "price": 24, "form": "Blu-ray" },
//         { "price": 20, "form": "4K" }, { "price": 6, "form": "Prime Video" }]
//   })
//     .then(response => {
//       console.log(response.data)
//       console.log("update query time: ", `${(performance.now() - time)} milliseconds`);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
// updateDataCouch();

// // //query excution time for Couch DB delete request in milliseconds
// function deleteDataCouch() {
//   axios.delete('http://admin:Addis2010@127.0.0.1:5984/overview_db/10000002?rev=8-c28afb5727b50d63eab8f0708ec4e54f')
//     .then(response => {
//       console.log('Data sucessfuly deleted')
//       console.log("delete query time: ",`${(performance.now() - time)} milliseconds`);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
// deleteDataCouch();

