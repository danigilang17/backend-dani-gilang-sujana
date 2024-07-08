const connection = require('../config/db');

const getProducts = (callback) => {
    connection.query('SELECT * FROM products', callback);
};

const purchaseProduct = (customerId, productId, quantity, callback) => {
    connection.query('INSERT INTO purchases (customer_id, product_id, quantity) VALUES (?, ?, ?)', 
        [customerId, productId, quantity], (error, results) => {
            if (error) return callback(error);
            connection.query('SELECT price FROM products WHERE id = ?', [productId], (err, res) => {
                if (err) return callback(err);
                const price = res[0].price;
                const total = price * quantity;
                let discount = 0;
                let shippingFee = 0;
                if (total > 50000) {
                    discount = total * 0.1;
                }
                if (total > 15000) {
                    shippingFee = 0;
                }
                const finalAmount = total - discount + shippingFee;
                connection.query('UPDATE purchases SET total_amount = ? WHERE id = ?', 
                    [finalAmount, results.insertId], callback);
            });
        });
};

module.exports = { getProducts, purchaseProduct };
