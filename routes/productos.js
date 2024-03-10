let express = require ('express');
let router = express.Router();
let path = require ('path');
let productosController = require ('../controllers/productosController.js');


// route para pagina de producto
router.get('/', productosController.paginaProductos);


module.exports = router;