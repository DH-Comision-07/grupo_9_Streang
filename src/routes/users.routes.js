const path = require('path')
const multer = require('multer');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const mainController = require('../controllers/mainController');
const validateRegister = require('../middlewares/userRegisterValidation');


const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,  '../../public/images/users/avatar'));
    },
    filename: function(req, file, cb) {
        const newFilename = 'avatar-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
        console.log(file);
    }
})

const upload = multer({storage:storage})


// ruta para ver perfil de usuario por id
router.get('/profile', userController.viewProfile);

router.get('/register', userController.registerView)
router.post('/register', upload.single('UserAvatar'), validateRegister, userController.saveUser)

//ruta para editar usuario
router.put('/profile/:id', upload.single('UserAvatar'), userController.editUser)

// ruta para actualizar rol de usuario
router.put('/admin', userController.adminForm)

// ruta para borrar un usuario
router.delete('/:id/delete', userController.deleteUser)

// router para pagina de login
router.post('/login', userController.processLogin)

router.get('/check', userController.check)

// Cerrar sesion
router.get('/exit', userController.exit)

//ver todos los usuarios (solo admin)
router.get('/', userController.allUsers)

// prueba de DB
router.get('/DBtry', userController.DBtry)

router.post('/DBtry',upload.single('UserAvatar'), userController.DBtrycreate)


module.exports = router;