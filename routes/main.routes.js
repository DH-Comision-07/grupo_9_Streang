let express = require ('express');
let router = express.Router();
let path = require ('path');
const mainController = require('../controllers/mainController');

// route para pagina raiz
router.get('/', mainController.paginaPrincipal);

//route para buscar un producto
router.get('/search', mainController.search);

module.exports = router;