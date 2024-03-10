let express = require ('express');
let router = express.Router();
let path = require ('path');
const mainController = require('../controllers/mainController');

// route para pagina raiz
router.get('/', mainController.paginaPrincipal);

module.exports = router;