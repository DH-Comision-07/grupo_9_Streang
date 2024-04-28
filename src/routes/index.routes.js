let express = require ('express');
let router = express.Router();
// const mainController = require('./controllers/mainController.js');
const mainController = require('../controllers/mainController.js')

// route para pagina raiz
router.get('/', mainController.paginaPrincipal);

//route para buscar un producto
router.get('/search', mainController.search);

router.get('/login', mainController.paginaLogin);

// router para pagina de carrito
router.get('/cart', mainController.paginaCart);



// router para pagina de contacto
router.get('/contact', mainController.contact);
//router post mensaje de contacto
router.post('/contact', mainController.sendMessage);

module.exports = router;