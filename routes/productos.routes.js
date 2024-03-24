let express = require ('express');
let router = express.Router();
let path = require ('path');
let productosController = require ('../controllers/productosController.js');
const multer = require('multer');


// *** configuracion de multer ***
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
      //  cb(null, path.join(__dirname, '/CRUD/public/images/products')); 
      cb(null, path.join('./public/images/products'));
    }, 
    filename: function (req, file, cb) {
      console.log(file);
      const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
      cb(null, newFileName);
    }
  });

const uploadFile = multer({ storage: storage}).fields([{name: "mainImage", maxCount: 1},
 {name: "moreImages", maxCount: 3},
 {name: "bannerImage", maxCount: 1}]);


// **** rutas ****

// route para pagina de producto
router.get('/producto', productosController.paginaProductos);

// route para POST nuevo producto
router.get('/create',  productosController.newProduct);
router.post('/', uploadFile, productosController.create);



module.exports = router;