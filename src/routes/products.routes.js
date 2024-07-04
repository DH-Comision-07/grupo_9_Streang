let express = require ('express');
let router = express.Router();
let path = require ('path');
let productosController = require ('../controllers/productosController.js');
const multer = require('multer');
//const validations = require('../middlewares/productValidation.js')
//const editValidations = require('../middlewares/productEditValidation.js')
const {check} = require('express-validator')


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

 const validations = [
  check('mainImage').custom((value, { req }) => {
    let file = req.files['mainImage'] ? req.files['mainImage'][0] : null;
    let acceptedExtensions = ['.jpg', '.jpeg', '.png'];

    if (!file) {
      throw new Error('Introduzca la imagen');
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error('Sube una imagen con formato .jpg, .jpeg, .png');
      }
    }
    return true;
  }),


  check('video').notEmpty()
  .withMessage('Introduzca un link'),

  check('name').notEmpty().withMessage('Inserte el nombre del producto').bail()
  .isLength({min: 5}).withMessage('El nombre del producto tiene que tener un minimo de 5 caracteres'),

  check('description')
  .notEmpty().withMessage('Descripcion requerida').bail()
  .isLength({min: 20}).withMessage('La descripcion del producto tiene que tener un minimo de 20 caracteres'),
  
  check('price').notEmpty()
  .withMessage('Inserte precio para el producto'),

  check('format').notEmpty()
  .withMessage("Inserte un formato para el producto"),

  check('stock')
  .isInt({min:1}).withMessage('El numero tiene que ser mayor a 1').bail()
  .notEmpty().withMessage('Por favor, incluye un numero de stock'),

  check('category')
    .notEmpty().withMessage('Selecciona una Categoria')
    .isIn(['Videojuegos', 'Consolas', 'Accesorios', 'Audio y sonido', 'Computacion', 'Otros']).withMessage('Categoría no válida'),

  
  
];



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
router.post('/', uploadFile, validations, productosController.create);

// FORMULARIO DE EDICIÓN DE PRODUCTO
router.get('/:id/edit', productosController.viewEdit);
// router.put('/:id', productosController.productDetail); // ACCIÓN DE EDICIÓN
router.put('/:id/edit', uploadFile, productosController.edit);

// BORRADO DE PRODUCTO
router.delete('/:id', productosController.delete);

// Buscar producto
router.get('/search', productosController.search);

router.get('/check', productosController.check)

module.exports = router;