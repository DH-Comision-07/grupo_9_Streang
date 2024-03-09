let express = require ('express');
let router = express.Router();
let path = require ('path');

// router para pagina de registro
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/register.html'))
});

module.exports = router;