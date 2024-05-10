const express = require('express');
const { getProducts } = require('../controller/product.controller');
const router = express.Router();

router.get('/', getProducts);

module.exports = router;

