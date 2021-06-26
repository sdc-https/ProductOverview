# Project Name
## Table of Contents

- [Project Name](#project-name)
  - [Table of Contents](#table-of-contents)
- [Overview: Amazon Item Page](#overview-amazon-item-page)
  - [Related Projects](#related-projects)
  - [Usage](#usage)
  - [Requirements](#requirements)
  - [Development](#development)
    - [Installing Dependencies](#installing-dependencies)

# Overview: Amazon Item Page
This is an mock-up amazon item page built during the Hack Reactor immersive's System Design Capstone project. This project is designed to maintain all original functionality and mimic the style of amazonitem page. This component of the project - product Overview Service - displayes the product overview information for a given item.

## Related Projects

  - https://github.com/sdc-https/ProductGallery
  - https://github.com/sdc-https/ProductInformation
  - https://github.com/sdc-https/CustomerReviews


## Usage

The server with four endpoints are located in server/index.js.

GET/overview/:productid

The first endpoint `/overview/:productid` takes an id and reads the data stored in the database by id which is automatically assigned to entries in the database and returns an object with the following data {
    "price",
    "shipping",
    "inventory",
    "other_sellers”,
    "package_name",
    "product_name"
}.

POST/overview

The second endpont`/overview/`  - using a POST request creates a new record into the  database and populates the database collection with the following data {
    "price",
    "shipping",
    "inventory",
    "other_sellers”,
    "package_name",
    "product_name"
}..

PUT/overview/:productid

The third endpont`/overview/:productid` by using product_id as a query selector updates an existing record in the database using a PUT request.

DELETE/overview/:productid

The fourth endpont`/overview/:productid` delete a given record in the database by id using the DELETE requests for an existing record.


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

