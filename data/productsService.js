const path = require('path');
const fs = require('fs');
const { viewCategory } = require('../controllers/productosController');
const { create } = require('domain');

const productsFilePath = path.join(__dirname, '../data/json-products.json');


const productsService = {

    products : JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')),

    getAll: function(){
        return {products : this.products};
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
        console.log(maxId);
        
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
            // console.log(youtubeId);
            // console.log(newProduct);
            this.products.push(newProduct);
            let JSONproducts = JSON.stringify(this.products);
            fs.writeFileSync(productsFilePath, JSONproducts);
                
        } catch (error) {
            return 'error'

            // res.status(500).send(`No se seleccionaron las imágenes correspondientes. Seleccione las imágenes
            // que desea cargar e intente nuevamente.`);
        }
    }
}

module.exports = productsService;