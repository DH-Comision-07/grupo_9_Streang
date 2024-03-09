let express = require ('express');
let router = express.Router();
let path = require ('path');

// router para pagina de carrito
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/cart.html'))
});



module.exports = router;