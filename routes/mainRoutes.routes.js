const express = require('express');
const router = express.Router();
const indexRouter = require('./index.routes');
const productsRouter = require('./products.routes');

router.use('/', indexRouter);
router.use('/products', productsRouter)

module.exports = router;
