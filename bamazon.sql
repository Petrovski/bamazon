USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  product_name VARCHAR(70) NULL,
  department_name VARCHAR(70) NULL,
  price DECIMAL(10,2),
  stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vanilla", "dairy", 2.50, 100);