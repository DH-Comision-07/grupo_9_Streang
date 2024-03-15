let express = require ('express');
let router = express.Router();
let path = require ('path');
let productosController = require ('../controllers/productosController.js');


// route para pagina de producto
router.get('/producto', productosController.paginaProductos);
router.get('/producto/nuevo', productosController.newProduct);


module.exports = router;