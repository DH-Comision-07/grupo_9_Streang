const path = require('path');
const fs = require('fs');
const { viewCategory, viewDiscounts } = require('../controllers/productosController');
const { create } = require('domain');
const session = require('express-session');
const userController = require("../controllers/userController")

const productsFilePath = path.join(__dirname, '../data/json-products.json');


const productsService = {

    products : JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')),

    setUser: function(req){
        let user = req.session.userLogged;
        return user;
    },

    check: function(req){
        let user = req.session.userLogged;
        return user;
    },

    // setUser: function(req){
    //     if(req.session.userLogged){
    //         const user = req.session.userLogged;
    //         console.log(user);
    //         return user;
    //     }        
    // },

    getAll: function(req){
        let user = req.session.userLogged;
        return {
            products : this.products,
            user: user
            };
    },

    getOne: function(id){
        let product = this.products.find(product => product.id == id);
        return {product : product};
    },

    viewCategory: function(category){
        let result = this.products.filter(product => product.category == category);
        return {result : result};
    },

    create: function(req){
        let maxId = 0;
        for (const obj of this.products) {
            if (obj.id && obj.id > maxId) {
                maxId = obj.id;
            }
        }

        // Verificacion de imagenes. Si no se cargo una imagen, se define por defecto la imagen "default.avif"
        let mainImage = {"filename": ""};
        let moreImages = [{"filename": ""}, {"filename": ""}, {"filename": ""}];
        let bannerImage = {"filename": ""};

        if(!req.files['mainImage'] || req.files['mainImage'][0] == undefined || !req.files['mainImage'][0]){
            mainImage.filename = 'default.avif'
        } else {
            mainImage = req.files['mainImage'][0];
        }

        if(!req.files['moreImages'] || req.files['moreImages'][0] == undefined){
            moreImages[0].filename = "default.avif"
            moreImages[1].filename = "default.avif"
            moreImages[2].filename = "default.avif";
        } else if (req.files['moreImages'][1] == undefined){
            moreImages[0] = req.files['moreImages'][0];
            moreImages[1].filename = "default.avif"
            moreImages[2].filename = "default.avif";
        } else if( req.files['moreImages'][2] == undefined){
            moreImages[0] = req.files['moreImages'][0];
            moreImages[1] = req.files['moreImages'][1]
            moreImages[2].filename = "default.avif";
        } else {
            moreImages = req.files['moreImages'];
        }

        if(!req.files['bannerImage'] || req.files['bannerImage'][0] == undefined){
            bannerImage.filename = 'default.avif';
        } else {
            bannerImage = req.files['bannerImage'][0];
        }

        console.log(mainImage);
        
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
                mainImage: mainImage,
                moreImages: moreImages,
                bannerImage: bannerImage,
                category: req.body.category,
                discount: parseFloat(req.body.discount),
                finalPrice : parseFloat(req.body.price) - (parseFloat(req.body.price) * (parseFloat(req.body.discount) / 100)),
                format: req.body.format,
                platform: req.body.platform,
                stock: parseInt(req.body.stock)
            }

            this.products.push(newProduct);
            let JSONproducts = JSON.stringify(this.products);
            fs.writeFileSync(productsFilePath, JSONproducts);
                
        } catch (error) {
            return error;
        }
    },

    viewEdit: function(id){
        let productToEdit = this.products.find(product => product.id == id);
        return {product : productToEdit};
    },

    viewDiscounts: function(){
        let discounts = this.products.filter(product => product.discount > 0);
        return {products: discounts};
    },

    edit: function(req){
        let productID = req.params.id;
        let productToEdit = this.products.find(product => product.id == productID);

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
		let productIndex = this.products.findIndex(product => product.id == productID);
	
		if (productIndex !== -1) { // Product found
			// Update the product in the array
			this.products[productIndex] = updatedProduct;
	
			// Convert the updated products array to JSON
			let jsonProducts = JSON.stringify(this.products);
	
			// Write the updated JSON back to the file
			fs.writeFileSync('./data/json-products.json', jsonProducts);
		} else {
			// Product not found
			return "Product not found";
		}
    },

    delete: function(id){
        let productID = parseInt(id);
        // let productToDelete = this.products.find(product => product.id == productID);
        let productIndex = this.products.findIndex(product => product.id == productID);
        // console.log(productToDelete);
        if (productIndex !== -1){
            this.products.splice(productIndex, 1);
            let jsonProducts = JSON.stringify(this.products);
            fs.writeFileSync('./data/json-products.json', jsonProducts);
        } else {
            return 'producto no encontrado';
        }
    }
}

module.exports = productsService;