let express = require ('express');
let router = express.Router();
let path = require ('path');
const cartController = require('../controllers/cartController');

// router para pagina de carrito
router.get('/', cartController.paginaCart);



module.exports = router;