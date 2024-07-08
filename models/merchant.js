const connection = require('../config/db');

const createProduct = (merchantId, product, callback) => {
    const { name, price, description } = product;
    connection.query('INSERT INTO products (merchant_id, name, price, description) VALUES (?, ?, ?, ?)', 
        [merchantId, name, price, description], callback);
};

const getProducts = (merchantId, callback) => {
    connection.query('SELECT * FROM products WHERE merchant_id = ?', [merchantId], callback);
};

const deleteProduct = (productId, callback) => {
    connection.query('DELETE FROM products WHERE id = ?', [productId], callback);
};

module.exports = { createProduct, getProducts, deleteProduct };
