const express = require('express');
const router = express.Router();
const indexRouter = require('./index.routes');
const productsRouter = require('./products.routes');
const usersRouter = require('./users.routes');
const apisRouter = require('./apis.routes');
const contactRouter = require('./contact.routes');

router.use('/', indexRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/apis', apisRouter);
router.use('/contact', contactRouter);



module.exports = router;
