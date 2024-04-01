const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/json-products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productosController = { 
    viewAll: function (req, res) {
        res.render("allProducts", {products: products});
    },

    productDetail: function (req, res) {
        let productId = req.params.id;
            let product = products.find(product => product.id == productId);
            res.render("productDetail", { product: product });
            
    },
    
    viewCategory: function(req, res) {
        let category = req.params.category;
        let result = products.filter(product => product.category == category);
        res.render("search", {result: result});
            
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

        function extractYouTubeId(url) {
            const match = url.match(/[?&]v=([^?&]+)/);
            return match ? match[1] : null;
        }
        const youtubeId = extractYouTubeId(req.body.video);
       
        try{            
            let newProduct = {
                id: maxId + 1,
                name: req.body.name,
                price: parseFloat(req.body.price),
                video: youtubeId,
                description: req.body.description,
                mainImage: req.files['mainImage'][0],
                moreImages: req.files['moreImages'],
                bannerImage: req.files['bannerImage'][0],
                category: req.body.category,
                discount: parseFloat(req.body.discount),
                finalPrice : parseFloat(req.body.price) - (parseFloat(req.body.price) * (parseFloat(req.body.discount) / 100)),
                format: req.body.format,
                platform: req.body.platform,
                stock: parseInt(req.body.stock)
            }
            console.log(youtubeId);
            products.push(newProduct);
            let JSONproducts = JSON.stringify(products);
            fs.writeFileSync(productsFilePath, JSONproducts);
            res.send(products);                
                
        } catch (error) {
            res.status(500).send(`No se seleccionaron las imágenes correspondientes. Seleccione las imágenes
            que desea cargar e intente nuevamente.`);
        }
    },

    viewEdit: function(req, res){
        let productID = req.params.id;
        let productToEdit = products.find(product => product.id == productID);
        res.render("editProduct", {product:productToEdit});
    },

    edit: function(req, res){
        let productID = req.params.id;
		let product = products.find(function(product){
            product.id == productID;
        });
		res.render('productDetail', {productToEdit : product});
    },

    delete: function(req, res){
        let productID = parseInt(req.params.id);
		products.splice(productID - 1, 1);
		console.log(products);
		let jsonProducts = JSON.stringify(products);
		fs.writeFileSync('./data/json-products.json', jsonProducts);
		res.send(products);
    }
};

module.exports = productosController;
