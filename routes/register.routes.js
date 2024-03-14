let express = require ('express');
let router = express.Router();
let path = require ('path');
let registerController = require ('../controllers/registerController.js');

// router para pagina de registro
router.get('/', registerController.paginaRegister);

module.exports = router;