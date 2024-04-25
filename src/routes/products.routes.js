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
      const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
      cb(null, newFileName);
    }
  });

const uploadFile = multer({ storage: storage}).fields([{name: "mainImage", maxCount: 1},
 {name: "moreImages", maxCount: 3}, {name: 'bannerImage', maxCount: 1}]);




// **** rutas ****

// VER TODOS LOS PRODUCTOS
router.get('/', productosController.viewAll);

// VER DETALLE DE UN PRPDUCTO
router.get('/detail/:id', productosController.productDetail);

// VER POR CATEGORIA
router.get('/categories/:category', productosController.viewCategory);

// VER PROMOCIONES
router.get('/discounts', productosController.viewDiscounts);

// CREAR NUEVO PRODUCTO
router.get('/create', productosController.newProduct);
router.post('/', uploadFile, productosController.create);

// FORMULARIO DE EDICIÓN DE PRODUCTO
router.get('/:id/edit', productosController.viewEdit);
router.put('/:id/edit', uploadFile, productosController.edit); // ACCIÓN DE EDICIÓN

// BORRADO DE PRODUCTO
router.delete('/:id', productosController.delete);

router.get('/check', productosController.check)

module.exports = router;