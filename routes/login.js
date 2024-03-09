let express = require ('express');
let router = express.Router();
let path = require ('path');

// router para pagina de login
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/login.html'))
});


module.exports = router;