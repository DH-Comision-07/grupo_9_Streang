const { check } = require('express-validator');

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

module.exports = validateProduct;