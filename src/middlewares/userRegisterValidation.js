const {check, body} = require('express-validator');
const validateRegister = [
    check('email').notEmpty().withMessage('Introduzca un correo electrónico'),
    check('email').isEmail().withMessage('Introduzca un email válido'),

    check('username').notEmpty().withMessage('Introduzca un nombre de usuario'),

    check('password').notEmpty().withMessage('Introduzca una contraseña'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),

    check('repPassword').notEmpty().withMessage('Repita la misma contraseña'),
    check('repPassword').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),

    check('realName').notEmpty().withMessage('Introduzca su nombre'),
    check('realName').isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),

    check('surname').notEmpty().withMessage('Introduzca su apellido'),
    check('surname').isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),

    check('birthDate').notEmpty().withMessage('Introduzca su fecha de nacimiento')
    // check('UserAvatar').exists().withMessage('Seleccione una imagen de perfil.')
];

module.exports = validateRegister;