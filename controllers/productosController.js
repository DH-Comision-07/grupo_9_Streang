const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/json-products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productosController = { 
    paginaProductos: (req, res) => {
        // res.sendFile(path.resolve(__dirname, '../views/productDetail.html'));
        res.render("productDetail");
    },
    newProduct: (req, res) => {
        res.render("newProduct");
    },
    create: function(req, res){
        let maxId = 0;
        for (const obj of products) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }

        let newProduct = {
            id: maxId + 1,
            name: req.body.name,
            price: parseFloat(req.body.price),
            video: req.body.video,
            description: req.body.description,
            mainImage: req.file.filename,
            category: req.body.category,
            discount: parseFloat(req.body.discount),
            format: req.body.format,
            stock: parseInt(req.body.stock)
        }
        products.push(newProduct);
        let JSONproducts = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, JSONproducts);

        res.send(products);
    }
};

module.exports = productosController;
