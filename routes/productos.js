let express = require ('express');
let router = express.Router();
let path = require ('path');


// route para pagina de producto
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/productDetail.html'))
});


module.exports = router;