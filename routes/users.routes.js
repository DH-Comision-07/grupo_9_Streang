const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const mainController = require('../controllers/mainController');

router.get('/profile/:id', userController.viewProfile);

router.get('/register', userController.registerView)
router.post('/register', userController.saveUser)

// ruta para borrar un usuario
router.delete('/:id/delete', userController.deleteUser)

module.exports = router;