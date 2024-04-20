const {check, body} = require('express-validator');
const validateRegister = [
    check('email').isEmail().withMessage('Introduzca un email válido.'),
    check('username').notEmpty().withMessage('Introduzca un nombre de usuario.'),
    check('password').notEmpty().withMessage('Introduzca una contraseña.'),
    check('repPassword').notEmpty().withMessage('Repita la misma contraseña.'),
    check('realName').notEmpty().withMessage('Introduzca su nombre.'),
    check('surname').notEmpty().withMessage('Introduzca su apellido.'),
    check('birthDate').notEmpty().withMessage('Introduzca su fecha de nacimiento.'),
    // check('UserAvatar').exists().withMessage('Seleccione una imagen de perfil.')
];

module.exports = validateRegister;