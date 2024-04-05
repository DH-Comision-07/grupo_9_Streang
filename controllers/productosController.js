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
            res.redirect('/products');
                
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
        let productToEdit = products.find(product => product.id == productID);

        // VERIFICAR SI SE CARGARON NUEVAS IMAGENES
        let mainImage = "";
        let moreImages = [];
        let bannerImage = "";
        if(!req.files['mainImage'] || req.files['mainImage'][0] == undefined){
            mainImage = productToEdit.mainImage;
        } else {
            mainImage = req.files['mainImage'][0];
        }

        if(!req.files['moreImages'] || req.files['moreImages'][0] == undefined && 
        req.files['moreImages'][1] == undefined && req.files['moreImages'][2] == undefined){
            moreImages = productToEdit.moreImages;
        } else {
            moreImages = req.files['moreImages'];
        }

        if(!req.files['bannerImage'] || req.files['bannerImage'][0] == undefined){
            bannerImage = productToEdit.bannerImage;
        } else {
            bannerImage = req.files['bannerImage'][0];
        }

        // OBTENER ID DE VIDEO DE YOUTUBE
        function extractYouTubeId(url) {
            const match = url.match(/[?&]v=([^?&]+)/);
            return match ? match[1] : null;
        }
        const youtubeId = extractYouTubeId(req.body.video);

		let updatedProduct = {
			id: parseInt(productID), // Convert ID to integer
			name: req.body.name,
            price: parseFloat(req.body.price),
            video: youtubeId,
            description: req.body.description,
            mainImage: mainImage,
            moreImages: moreImages,
            bannerImage: bannerImage,
            category: req.body.category,
            discount: parseFloat(req.body.discount),
            finalPrice : parseFloat(req.body.price) - (parseFloat(req.body.price) * (parseFloat(req.body.discount) / 100)),
            format: req.body.format,
            platform: req.body.platform,
            stock: req.body.stock
		};
	
		// Find the index of the product in the products array
		let productIndex = products.findIndex(product => product.id == productID);
	
		if (productIndex !== -1) { // Product found
			// Update the product in the array
			products[productIndex] = updatedProduct;
	
			// Convert the updated products array to JSON
			let jsonProducts = JSON.stringify(products);
	
			// Write the updated JSON back to the file
			fs.writeFileSync('./data/json-products.json', jsonProducts);

            res.redirect('/products');
		} else {
			// Product not found
			res.status(404).send("Product not found");
		}
    },

    delete: function(req, res){
        let productID = parseInt(req.params.id);
        let productToDelete = products.find(product => product.id == productID);
        let productIndex = products.findIndex(product => product.id == productID);
        console.log(productToDelete);
        if (productIndex !== -1){
            products.splice(productIndex, 1);
            let jsonProducts = JSON.stringify(products);
            fs.writeFileSync('./data/json-products.json', jsonProducts);
		    res.redirect('/products');
        } else {
            res.send('producto no encontrado')
        }
    }
};

module.exports = productosController;
