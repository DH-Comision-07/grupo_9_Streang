const express = require('express');
const router = express.Router();

const loginRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');
const cartRoutes = require('./cart.routes');
const homeRoutes = require('./main.routes');
const productosRoutes = require('./productos.routes');

router.use('/', homeRoutes);
router.use('/cart', cartRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/', productosRoutes)

module.exports = router;
