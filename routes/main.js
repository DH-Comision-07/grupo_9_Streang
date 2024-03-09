let express = require ('express');
let router = express.Router();
let path = require ('path');

// route para pagina raiz
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/home.html'))
});

module.exports = router;