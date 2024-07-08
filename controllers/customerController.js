const db = require('../config/db');

exports.getProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error fetching products', error });
        }
        res.status(200).send(results);
    });
};

exports.purchaseProduct = (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error fetching product', error });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const product = results[0];
        const totalPrice = product.price * quantity;
        let finalPrice = totalPrice;
        let shippingCost = 0;

        if (totalPrice > 50000) {
            finalPrice *= 0.9;
        }

        if (totalPrice > 15000) {
            shippingCost = 0;
        } else {
            shippingCost = 5000; // Misalnya biaya pengiriman tetap
        }

        finalPrice += shippingCost;

        const purchaseSql = 'INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)';
        db.query(purchaseSql, [userId, productId, quantity, finalPrice], (error, results) => {
            if (error) {
                return res.status(500).send({ message: 'Error making purchase', error });
            }
            res.status(201).send({ message: 'Purchase successful', orderId: results.insertId });
        });
    });
};
