DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(250) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ('Tshirt', 'clothing', 9.99, 3),
       ('Basketball', 'sporting goods', 15.00, 10),
       ('Jersey', 'clothing', 20.00, 5),
       ('The Notebook', 'movies and tv', 10.00, 8),
       ('Ramen', 'grocery', 10.00, 30),
       ('The Bible', 'books', 0.25, 50),
       ('Memoirs of a Geisha', 'movies and tv', 10.00, 5),
       ('Puma Slides', 'shoes', 60.00, 10),
       ('Hamburger Helper', 'grocery', 3.99, 15),
       ('Baseball', 'sporting goods', 10.00, 6);

       SELECT * FROM products;