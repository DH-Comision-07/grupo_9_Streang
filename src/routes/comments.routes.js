const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');


router.post('/', commentsController.sendComment);
module.exports = router