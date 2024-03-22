let express = require ('express');
let router = express.Router();
let path = require ('path');
let productosController = require ('../controllers/productosController.js');


// route para pagina de producto
router.get('/producto', productosController.paginaProductos);



// route para POST nuevo producto
router.get('/nuevo', productosController.newProduct);
router.post('/nuevo', productosController.create);



module.exports = router;