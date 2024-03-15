let express = require ('express');
let router = express.Router();
let path = require ('path');
const loginController = require('../controllers/loginController');

// router para pagina de login
router.get('/', loginController.paginaLogin);


module.exports = router;