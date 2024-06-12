const { check } = require('express-validator');

const validateLogin = [
    check('email').notEmpty().withMessage('Introduzca un correo electrónico'),
    check('email').isEmail().withMessage('Introduzca un email válido'),
    check('email').exists().withMessage('Ese email ya está registrado'),

    check('password').notEmpty().withMessage('Introduzca una contraseña'),
];

module.exports = validateLogin;