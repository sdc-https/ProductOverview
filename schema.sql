CREATE DATABASE overview_DB;
USE overview_DB;

CREATE TABLE Overview (
  product_id serial,
  package_name VARCHAR(50) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (product_id),
  UNIQUE (product_id)
);

CREATE TABLE Price (
  id serial,
  product_id int NOT NULL,
  list_price int NOT NULL,
  price int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES overview(product_id) ON DELETE CASCADE
);

CREATE TABLE Inventory (
  id serial,
  product_id int NOT NULL,
  in_stock boolean NOT NULL,
  inventory int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES overview(product_id) ON DELETE CASCADE
);

CREATE TABLE Shipping (
  id serial,
  product_id int NOT NULL,
  prime boolean NOT NULL,
  sold_by VARCHAR(50) NOT NULL,
  ships_from VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES overview(product_id) ON DELETE CASCADE
);

CREATE TABLE  Form (
  id serial,
  product_id int NOT NULL,
  price int NOT NULL,
  form VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES overview(product_id) ON DELETE CASCADE
);

CREATE TABLE  Seller (
  product_id int NOT NULL,
  seller_id VARCHAR(100) NOT NULL,
  discs int NOT NULL,
  price int NOT NULL,
  newfrom int NOT NULL,
  usedfrom int NOT NULL,
  edition VARCHAR(50) NOT NULL,
  form VARCHAR(50) NOT NULL,
  release_date timestamp NOT NULL,
  PRIMARY KEY (seller_id),
  FOREIGN KEY (product_id) REFERENCES overview(product_id) ON DELETE CASCADE,
  unique(seller_id, product_id)
);

/*  Execute this file from the command line by typing:
 *    pgsql -u root < schema.sql
 *  to create the database and the tables.*/