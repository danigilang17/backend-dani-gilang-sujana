const db = require('../config/db');

exports.createProduct = (req, res) => {
    const { name, price, description } = req.body;
    const sql = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
    db.query(sql, [name, price, description], (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error creating product', error });
        }
        res.status(201).send({ message: 'Product created successfully' });
    });
};

exports.getProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error fetching products', error });
        }
        res.status(200).send(results);
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Error deleting product', error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product deleted successfully' });
    });
};
