const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const merchantController = require('../controllers/merchantController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Merchant
 *   description: Merchant operations
 */

/**
 * @swagger
 * /merchant/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Merchant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post('/products', [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('description').notEmpty()
], validate, authenticate, merchantController.createProduct);

/**
 * @swagger
 * /merchant/products:
 *   get:
 *     summary: Get list of products
 *     tags: [Merchant]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', merchantController.getProducts);

/**
 * @swagger
 * /merchant/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Merchant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product id
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/products/:id', authenticate, merchantController.deleteProduct);

module.exports = router;
