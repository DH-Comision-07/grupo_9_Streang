const express = require("express")
const router = express.Router()
const apisController = require("../controllers/apisController.js")

router.get('/users', apisController.listUsers)
router.get('/users/:id', apisController.userDetail)
router.post('/users', apisController.createUser)

router.delete('/users/:id', apisController.deleteUser)
router.put('/users/:id', apisController.updateUser)


module.exports = router