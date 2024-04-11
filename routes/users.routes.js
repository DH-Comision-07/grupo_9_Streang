const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const mainController = require('../controllers/mainController');

router.get('/profile', userController.viewProfile);

router.get('/register', userController.registerView)
router.post('/register', userController.saveUser)

module.exports = router;