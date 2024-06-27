const express = require("express")
const router = express.Router()
const apisController = require("../controllers/apisController.js")

router.get('/users', apisController.listUsers)
router.get('/users/:id', apisController.userDetail)
router.post('/users', apisController.createUser)
router.delete('/users/:id', apisController.deleteUser)
router.put('/users/:id', apisController.updateUser)


router.get('/products', apisController.listProducts)
router.get('/products/:id', apisController.productDetail)
router.post('/products', apisController.createProduct)
router.delete('/products/:id', apisController.deleteProduct)
router.put('/products/:id', apisController.updateProduct)

module.exports = router