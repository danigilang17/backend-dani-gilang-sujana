const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const customerController = require('../controllers/customerController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer operations
 */

/**
 * @swagger
 * /customer/products:
 *   get:
 *     summary: Get list of products
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', customerController.getProducts);

/**
 * @swagger
 * /customer/purchase:
 *   post:
 *     summary: Purchase a product
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Purchase successful
 */
router.post('/purchase', [
    body('productId').isInt(),
    body('quantity').isInt({ min: 1 })
], validate, authenticate, customerController.purchaseProduct);

module.exports = router;
