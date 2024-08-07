const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

router.post('/', async (req, res) => {
    const { name, category, price, currency, image } = req.body;
    const product = new Product({ name, category, price, currency, image });
    try {
        await product.save();
        res.status(201).send('Product created');
    } catch (error) {
        res.status(400).send('Error creating product');
    }
});

module.exports = router;
