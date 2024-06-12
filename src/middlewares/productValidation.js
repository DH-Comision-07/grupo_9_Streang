const { check } = require('express-validator');

const validateProduct = [
    check('mainImage').notEmpty()
    .withMessage('Introduzca una Imagen'),

    check('video').notEmpty()
    .withMessage('Introduzca un link'),

    check('name').notEmpty()
    .withMessage('Inserte el nombre del producto'),

    check('name').isLength({min: 3})
    .withMessage('El nombre del producto tiene que tener un minimo de 3 caracteres'),

    check('description').notEmpty()
    .withMessage('Descripcion requerida'),

    check('descripcion').isLength({min: 13})
    .withMessage('La descripcion del producto tiene que tener un minimo de 13 caracteres'),
    
    check('price').notEmpty()
    .withMessage('Inserte precio para el producto'),

    check('format').notEmpty()
    .withMessage("Inserte un formato para el producto"),
];

module.exports = validateProduct;